import os
import json

import boto3


def get_all_items(table):
    data = []
    ExclusiveStartKey = None
    while True:
        resp = table.scan(
            ExclusiveStartKey=ExclusiveStartKey
        )
        data.extend(resp['Items'])
        if "LastEvaluatedKey" not in resp: break
        else: ExclusiveStartKey = resp["ExclusiveStartKey"]
    return data


def lambda_handler(event, context):
    list_table_name = os.environ["LIST_TABLE"]
    dynamodb = boto3.client("dynamodb")
    table = dynamodb.Table(list_table_name)

    list_info = get_all_items()

    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "users": list_info,
        })
    }

