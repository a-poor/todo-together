import os
import json
import uuid as _uuid
import random
import datetime as dt

import jwt
import boto3
import bcrypt

import pydantic
from data_models import User, TodoList, ListItem



API_VERSION = os.environ["API_VERSION"]
JWT_ALGORITHM = os.environ["JWT_ALGORITHM"]
TOKEN_EXPIRY_MINS = int(os.environ["TOKEN_EXPIRY_MINS"])
USER_TABLE_NAME = os.environ["USER_TABLE_NAME"]
LIST_TABLE_NAME = os.environ["LIST_TABLE_NAME"]
JWT_SECRET_NAME = os.environ["JWT_SECRET_NAME"]
TOKEN_EXPIRY_MINS = os.environ["TOKEN_EXPIRY_MINS"]



def uuid() -> str: 
    return str(_uuid.uuid4())

def hash_password(password: str) -> str:
    min_rounds =  6
    max_rounds = 10
    rounds = random.randrange(min_rounds, max_rounds)
    salt = bcrypt.gensalt(rounds)
    return bcrypt.hashpw(password.encode(), salt).decode()

def compare_passwords(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(),
        hashed.encode())

def get_jwt_secret() -> str:
    session = boto3.session.Session()
    client = session.client("secretsmanager")
    res = client.get_secret_value(SecretId=JWT_SECRET_NAME)
    return res["SecretString"]

def create_token(user_info) -> str:
    secret = get_jwt_secret()
    exp = dt.datetime.utcnow() + dt.timedelta(minutes=TOKEN_EXPIRY_MINS)
    return jwt.encode(
        {**user_info, "exp": exp}, 
        secret, 
        algorithm=JWT_ALGORITHM
    ).decode()

def get_user_table() -> 'DynamoDB.Table':
    return boto3.client("dynamodb").Table(USER_TABLE_NAME)

def get_list_table() -> 'DynamoDB.Table':
    return boto3.client("dynamodb").Table(LIST_TABLE_NAME)

def get_user(user_id: str) -> User:
    table = get_user_table()
    user = table.get_item(Key={"user_id": user_id})
    return User(**user) if user is not None else None

def get_list(list_id: str) -> TodoList:
    table = get_list_table()
    list_ = table.get_item(Key={"list_id": list_id})
    return User(**list_) if list_ is not None else None 

def user_exists(user_id: str) -> bool:
    return get_user(user_id) is not None

def list_exists(list_id: str) -> bool:
    return get_list(list_id) is not None

def clean_model(m: pydantic.BaseModel) -> dict:
    return json.loads(m.json())

def write_user(user: User):
    table = get_user_table()
    clean_user = clean_model(user)
    res = table.put_item(Item=clean_user)
    return res["ResponseMetadata"]["HTTPStatusCode"] == 200

def write_list(todo_list: TodoList):
    table = get_list_table()
    clean_list = clean_model(todo_list)
    res = table.put_item(Item=clean_list)
    return res["ResponseMetadata"]["HTTPStatusCode"] == 200

def delete_user(user: User):
    table = get_user_table()
    res = table.delete_item(Key={"user_id": user.user_id})
    return res["ResponseMetadata"]["HTTPStatusCode"] == 200

def delete_list(todo_list: TodoList):
    table = get_list_table()
    res = table.delete_item(Key={"list_id": todo_list.list_id})
    return res["ResponseMetadata"]["HTTPStatusCode"] == 200

