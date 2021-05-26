import sys
sys.path.append("/opt")

import json
import itertools as it
import todo_together as todo


def lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

    # Get User's friends
    friends = [todo.get_user(uid)
        for uid in req_user.friends]

    # Get User's friends' lists (if user has access)
    friend_lists = it.chain(*[f.todo_lists for f in friends])
    friend_lists = [l for l in friend_lists if 
        req_user.user_id in l.access and not l.archived]

    # Merge users lists with friends' lists
    all_lists = [
        *req_user.todo_lists,
        *friend_lists
    ]

    return_data = [
        todo.get_list_data(l)
        for l in all_lists
    ]

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "lists": return_data,
        })
    }

