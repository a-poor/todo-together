import sys
sys.path.append("/opt")

import json
import todo_together as todo


def lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

    try:
        user_id = event["pathParameters"]["user_id"]
    except Exception as e:
        print("Error getting `user_id` from path parameters.")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": "Unable to read `user_id` from path parameter.",
            })
        }

    try:
        user = todo.get_user(user_id)
    except Exception as e:
        print(f"Error getting User from `user_id` {user_id}.")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,
                "user": None,
                "message": "Couldn't find user with that `user_id`.",
            })
        }

    if req_user.user_id == user.user_id:
        user_data = todo.get_user_data_full(user)
    else:
        user_data = todo.get_user_data_part(user)

    print("Returning user info.")
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "user": user_data,
        })
    }

