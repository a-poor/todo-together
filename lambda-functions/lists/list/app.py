import sys
sys.path.append("/opt")

import json
import datetime as dt
import todo_together as todo


def lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

    try:
        list_id = event["pathParameters"]["list_id"]
    except Exception as e:
        print("Error getting `user_id` from path parameters.")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": "Unable to read `list_id` from path parameter.",
            })
        }

    list_ = todo.get_list(list_id)
    if list_ is None: return {
        "statusCode": 404,
        "body": json.dumps({
            "success": False,    
            "message": "List does not exist.",
        })
    }

    if req_user.user_id != list_.created_by or \
        req_user.user_id not in list_.access:
        return {
            "statusCode": 403,
            "body": json.dumps({
                "success": False,    
                "message": "Not authorized to access list.",
            })
        }

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "list": todo.clean_model(list_),
        })
    }

def post_lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

    try:
        list_id = event["pathParameters"]["list_id"]
    except Exception as e:
        print("Error getting `user_id` from path parameters.")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": "Unable to read `list_id` from path parameter.",
            })
        }

    list_ = todo.get_list(list_id)
    if list_ is None: return {
        "statusCode": 404,
        "body": json.dumps({
            "success": False,    
            "message": "List does not exist.",
        })
    }

    if req_user.user_id != list_.created_by or \
        req_user.user_id not in list_.access:
        return {
            "statusCode": 403,
            "body": json.dumps({
                "success": False,    
                "message": "Not authorized to access list.",
            })
        }

    try:
        data = json.loads(event.body)
    except Exception as e:
        print("Error reading new-list data as JSON:", e)
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": "Error reading data as JSON.",
                "schema": todo.TodoList.schema()
            })
        }

    try:
        now = dt.datetime.utcnow()
        list_items = [
            todo.ListItem(
                text=l["text"],
                created_by=req_user.user_id,
                created_at=l.get("created_at",now)
            )
            for l in data.get("items",[])
        ]

        access = [
            u for u in
            data.get("access",list_.access)
        ]
        for u in access:
            if not todo.user_exists(u):
                return {
                    "statusCode": 400,
                    "body": json.dumps({
                        "success": False,    
                        "message": f"User \"{u}\" doesn't exist."
                    })
                }
            if u not in req_user.friends:
                return {
                    "statusCode": 400,
                    "body": json.dumps({
                        "success": False,    
                        "message": f"User \"{u}\" isn't a friend."
                    })
                }

        new_list = todo.TodoList(
            list_id=list_.list_id,
            name=data["name"],
            items=list_items,
            access=access,
            created_by=req_user.user_id,
            created_at=list_.created_at,
            archived=data.get("archived",list_.archived)
        )
    except KeyError as e:
        print("Error reading new-list data as JSON:", e)
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": f"Missing data in request: \"{e}\".",
                "schema": todo.TodoList.schema()
            })
        }
    except Exception as e:
        print("Unknown error creating new list:", e)
        return {
            "statusCode": 500,
            "body": json.dumps({
                "success": False,    
                "message": "Error creating list.",
                "schema": todo.TodoList.schema()
            })
        }

    print("Writing list update...")
    todo.write_list(new_list)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,
            "list": todo.clean_model(new_list)
        })
    }

def delete_lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

    try:
        list_id = event["pathParameters"]["list_id"]
    except Exception as e:
        print("Error getting `user_id` from path parameters.")
        return {
            "statusCode": 400,
            "body": json.dumps({
                "success": False,    
                "message": "Unable to read `list_id` from path parameter.",
            })
        }

    list_ = todo.get_list(list_id)
    if list_ is None: return {
        "statusCode": 404,
        "body": json.dumps({
            "success": False,    
            "message": "List does not exist.",
        })
    }

    if req_user.user_id != list_.created_by:
        return {
            "statusCode": 403,
            "body": json.dumps({
                "success": False,    
                "message": "Not authorized to access list.",
            })
        }

    print("Deleting list...")
    todo.delete_list(list_)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "message": f"List \"{list_.list_id}\" successfully deleted.",
        })
    }

