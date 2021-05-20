import os
import json

import jwt
import boto3


JWT_ALGORITHM = "HS256"


def get_user(table, user_id):
    return table.get_item(
        Key={
            "UserId": user_id
        },
        AttributesToGet=[
            "UserId",
            "Username",
            "FirstName",
            "LastName",
            "Lists"
        ],
        Select="SPECIFIC_ATTRIBUTES"
    )["Item"]

def decode_token(token, secret_name):
    session = boto3.session.Session()
    client = session.client("secretsmanager")
    jwt_secret = client.get_secret_value(
        SecretId=secret_name
    )["SecretString"]
    return jwt.decode(
        token,
        jwt_secret,
        algorithms=JWT_ALGORITHM
    )

def lambda_handler(event, context):
    print("Getting specific user info")
    jwt_secret_name = os.environ["JWT_SECRET_NAME"]
    try:
        # Get the bearer token
        bearer = event["headers"]["Authentication"]
        assert "Bearer " in bearer
        token = bearer.replace("Bearer ","")

        auth_user = decode_token(token, jwt_secret_name)

    except Exception as e:
        print(f"Error authenticating token: {e}")
        return {
            "statusCode": 401,
            "body": json.dumps({
                "success": False,    
                "users": "Unable to authenticate.",
            })
        }

    try:
        user_id = event["queryStringParameters"]["UserId"]
    except Exception as e:
        print(f"Error getting query string parameter: {e}")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "users": "Unable to get path parameter",
            })
        }

    user_table_name = os.environ["USER_TABLE"]
    dynamodb = boto3.client("dynamodb")
    table = dynamodb.Table(user_table_name)

    user_info = get_user(table, user_id)

    print("Returning user info.")
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "users": user_info,
        })
    }

