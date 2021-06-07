import json
import datetime as dt

import sys
sys.path.append("/opt")

import todo_together as todo

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        user_data = {
            "username": data["username"],
            "password": data["password"], 
            "name": data["name"], 
            "created_at": dt.datetime.utcnow(),
        }
    except Exception as e:
        print("Error reading body JSON", e)
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,
                "message": "Can't read user/password JSON from body."
            }),
        }

    user = todo.create_user(user_data)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "user_id": user.user_id
        })
    }

