import sys
sys.path.append("/opt")

import json
import todo_together as todo


def lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err
    
    all_users = todo.get_all_users()
    clean_users = [
        todo.get_user_data_part(u)
        for u in all_users
    ]
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "users": clean_users,
        })
    }

