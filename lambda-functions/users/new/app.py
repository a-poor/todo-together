import os
import json
import random
from uuid import uuid4

import boto3
import bcrypt


def hash_password(raw_password):
    salt = bcrypt.gensalt(random.randint(4,10))
    return bcrypt.hashpw(raw_password.encode(), salt)


def lambda_handler(event, context):
    print("Request to add new user.")
    try:
        req_data = json.loads(event["body"])

        new_user_id = uuid4().hex
        user_data = {
            "UserId": new_user_id,
            "Username": req_data["username"],
            "Password": hash_password(req_data["password"]),
            "FirstName": req_data["first-name"],
            "LastName": req_data["last-name"],
            "Lists": []
        }

    except Exception as e:
        print(f"Error creating new user: {e}")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,
                "message": "Unable to parse request body. Body must be valid "+
                    "JSON with the following values: "+
                    "{username,first-name,last-name,password}."
            })  
        }

    print(f"Adding new user: {new_user_id}")
    user_table_name = os.environ["USER_TABLE"]
    dynamodb = boto3.client("dynamodb")
    table = dynamodb.Table(user_table_name)
    table.put_item(Item=user_data)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "user-id": new_user_id
        })
    }

