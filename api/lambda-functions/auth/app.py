import sys
sys.path.append("/opt")

import json
import todo_together as todo

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        username = data["username"]
        password = data["password"]
    except Exception as e:
        print("Error reading body JSON", e)
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,
                "message": "Can't read user/password JSON from body."
            }),
        }
    user = todo.signin_user(username, password)
    if user is None:
        return {
            "statusCode": 401,
            "body": json.dumps({
                "success": False,
                "message": "Can't read user/password JSON from body."
            }),
        }
    token = todo.get_user_jwt(user)
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,
            "token": token,
            "user_id": user.user_id,
        }),
    }
