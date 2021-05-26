import os
import json
import sys
sys.path.append("/opt")
import todo_together


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "success": True,    
            "version": os.environ.get("API_VERSION"),
        })
    }

