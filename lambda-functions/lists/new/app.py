import os
import json
from uuid import uuid4

import jwt
import boto3


JWT_ALGORITHM = "HS256"

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

def validate_list_items(items):
    required_keys = {
        "list-index",
        "text",
        "completed"
    }
    for item in items:
        if (
            len(required_keys) != len(item) or
            not all(k in item for k in required_keys)
        ): 
            return False
    return True

def validate_permissions(users):
    required_keys = {
        "user-id",
        "text",
        "completed"
    }
    for user in users:
        if (
            len(required_keys) != len(user) or
            not all(k in user for k in required_keys) or
            not user_exists(user["user-id"])
        ): 
            return False
    return True


def user_exists(table, user_id):
    return len(table.get_item(
        Key={"UserId": user_id}
    )) > 0

def lambda_handler(event, context):
    print("Creating a list")
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

    dynamodb = boto3.client("dynamodb")
    user_table_name = os.environ["USER_TABLE"]
    list_table_name = os.environ["LIST_TABLE"]
    user_table = dynamodb.Table(user_table_name)
    list_table = dynamodb.Table(list_table_name)

    try:
        req_data = json.loads(event["body"])

        assert validate_list_items(req_data["list-items"])
        assert validate_permissions(req_data["authorized-users"], user_table)

        new_list_id = uuid4().hex
        list_data = {
            "ListId": new_list_id,
            "ListName": req_data["list-name"],
            "ListOwner": auth_user["UserId"],
            "ListItems": req_data.get("list-items",[]),
            "AuthorizedUsers": req_data.get("authorized-users",[])
        }
    except Exception as e:
        print(f"Error creating list: {e}")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "users": "Unable to create list.",
            })
        }

    list_table.put_item(list_data)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "list-id": new_list_id,
        })
    }

