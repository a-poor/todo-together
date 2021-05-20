import os
import json
import datetime as dt

import jwt
import bcrypt
import boto3
from boto3.dynamodb.conditions import Key


JWT_ALGORITHM = "HS256"


def get_user(table, username):
    resp = table.query(
        Select="SPECIFIC_ATTRIBUTES",
        AttributesToGet=[
            "UserId",
            "Username",
            "FirstName",
            "LastName"
        ],
        KeyConditionExpression=Key("Username").eq(username)
    )
    items = resp["Items"]
    return items[0] if items else None


def check_password(password, pass_hash) -> bool:
    return bcrypt.checkpw(password.encode(), pass_hash)


def create_token(user, secret_name):
    session = boto3.session.Session()
    client = session.client("secretsmanager")
    jwt_secret = client.get_secret_value(
        SecretId=secret_name
    )["SecretString"]
    return "Bearer " + jwt.encode(
        user,
        jwt_secret,
        algorithm=JWT_ALGORITHM
    ).decode()


def lambda_handler(event, context):
    print("Authentication request")
    try:
        req_data = json.loads(event["body"])
        username = req_data["username"]
        password = req_data["password"]

    except Exception as e:
        print(f"Error authenticating user: {e}")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,
                "message": "Unable to parse request body. Body must be valid "+
                    "JSON with the following values: "+
                    "{username,password}."
            })  
        }

    user_table_name = os.environ["USER_TABLE"]
    dynamodb = boto3.client("dynamodb")
    table = dynamodb.Table(user_table_name)

    user = get_user(table, username)
    if user is None or not check_password(password, user["Password"]): 
        return {
            "statusCode": 401,
            "body": json.dumps({
                "success": False,
                "message": "No user with that username/password combo."
            })
        }

    jwt_secret_name = os.environ["JWT_SECRET_NAME"]
    jwt_expiry_mins = int(os.environ["TOKEN_EXPIRY_MINUTES"])
    token = create_token({
        **user,
        "exp": dt.datetime.utcnow() + dt.timedelta(minutes=jwt_expiry_mins)
    }, jwt_secret_name)
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "success": True,
                "token": token
            }
        ),
    }
