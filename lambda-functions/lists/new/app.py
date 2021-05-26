import sys
sys.path.append("/opt")

import json
import datetime as dt
import todo_together as todo


def lambda_handler(event, context):
    req_user, err = todo.auth_user(event)
    if err: return err

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
        lid = todo.new_uuid()
        list_items = [
            todo.ListItem(
                text=l["text"],
                created_by=req_user.user_id,
                created_at=now
            )
            for l in data.get("items",[])
        ]
        new_list = todo.TodoList(
            list_id=lid,
            name=data["name"],
            items=list_items,
            created_by=req_user.user_id,
            created_at=now
        )
    except KeyError as e:
        print("Key error accessing new list data:", e)
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

    todo.write_list(new_list)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,
            "list": todo.clean_model(new_list)
        })
    }

