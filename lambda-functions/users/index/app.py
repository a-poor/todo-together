import os
import json

import boto3


def get_all_items(table):
    data = []
    ExclusiveStartKey = None
    while True:
        resp = table.scan(
            AttributesToGet=[
                "UserId",
                "Username",
                "FirstName",
                "LastName"
            ],
            Select="SPECIFIC_ATTRIBUTES",
            ExclusiveStartKey=ExclusiveStartKey
        )
        data.extend(resp['Items'])
        if "LastEvaluatedKey" not in resp: break
        else: ExclusiveStartKey = resp["ExclusiveStartKey"]
    return data


def lambda_handler(event, context):

    user_table_name = os.environ["USER_TABLE"]
    dynamodb = boto3.client("dynamodb")
    table = dynamodb.Table(user_table_name)

    user_info = get_all_items()

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "users": user_info,
        })
    }

