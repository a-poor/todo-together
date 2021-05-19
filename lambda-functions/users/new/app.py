import os
import json
import boto3
from uuid import uuid4


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "version": os.environ.get("API_VERSION"),
        })
    }

