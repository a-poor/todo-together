import os
import json
import string
import random
import datetime as dt
from typing import Tuple

import jwt
import bcrypt
import boto3
from boto3.dynamodb.conditions import Key

from todo_models import (
    BaseModel, 
    User, 
    TodoList, 
    ListItem, 
    TokenIs
)


API_VERSION = os.environ["API_VERSION"]
USER_TABLE_NAME = os.environ["USER_TABLE"]
LIST_TABLE_NAME = os.environ["LIST_TABLE"]
JWT_ALGORITHM = os.environ["JWT_ALGORITHM"]
TOKEN_EXPIRY_MINS = int(os.environ["TOKEN_EXPIRY_MINS"])
JWT_SECRET_NAME = os.environ["JWT_SECRET_NAME"]

########## Lower Level Operations ##############

def rstring(n: int = 6) -> str:
    chars = string.ascii_lowercase + string.digits
    return "".join(random.choices(chars, k=n))

def new_user_id(n: int = 6) -> str:
    return "u" + rstring(n)

def new_list_id(n: int = 6) -> str:
    return "l" + rstring(n)

def hash_password(password: str) -> str:
    min_rounds =  6
    max_rounds = 10
    rounds = random.randrange(min_rounds, max_rounds)
    salt = bcrypt.gensalt(rounds)
    return bcrypt.hashpw(password.encode(), salt)

def compare_passwords(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(),hashed)

def get_jwt_secret() -> str:
    session = boto3.session.Session()
    client = session.client("secretsmanager")
    res = client.get_secret_value(
        SecretId=JWT_SECRET_NAME
    )
    return res["SecretString"]

def create_token(payload) -> str:
    secret = get_jwt_secret()
    exp = dt.datetime.utcnow() + dt.timedelta(minutes=TOKEN_EXPIRY_MINS)
    token = jwt.encode(
        {**payload, "exp": exp}, 
        secret, 
        algorithm=JWT_ALGORITHM
    )
    return token.decode() if isinstance(token,bytes) else token

def check_token(token: str, verify=True):
    secret = get_jwt_secret()
    try:
        data = jwt.decode(
            token,
            secret,
            algorithms=JWT_ALGORITHM,
            verify=verify
        )
    except jwt.exceptions.ExpiredSignatureError:
        # Still try to get the user's token info
        return check_token(token,False)[0], TokenIs.EXPIRED
    except jwt.exceptions.ImmatureSignatureError:
        # Still try to get the user's token info
        return check_token(token,False)[0], TokenIs.TOO_EARLY
    except jwt.exceptions.DecodeError as e:
        return None, TokenIs.MALFORMED
    except jwt.exceptions.PyJWTError:
        return None, TokenIs.UNKNOWN_ERR
    except Exception as e:
        print(f"Unknown error checking JWT: {e}")
        raise e
        #return None, TokenIs.UNKNOWN_ERR
    return data, TokenIs.GOOD

def get_user_table() -> 'DynamoDB.Table':
    return boto3.resource("dynamodb").Table(USER_TABLE_NAME)

def get_list_table() -> 'DynamoDB.Table':
    return boto3.resource("dynamodb").Table(LIST_TABLE_NAME)

def get_all_users():
    table = get_user_table()
    data = []
    last_key = None
    while True:
        kwargs = {} if last_key is None else \
            dict(ExclusiveStartKey=last_key)
        res = table.scan(**kwargs)
        data.extend(res["Items"])
        last_key = res.get("LastEvaluatedKey")
        if last_key is None: break
    return [User(**d) for d in data]

def get_user_by_username(username: str):
    all_users = get_all_users()
    just_user = [u for u in all_users if u.username == username]
    return just_user[0] if len(just_user) > 0 else None

def get_user(user_id: str) -> User:
    table = get_user_table()
    res = table.get_item(Key={"user_id": user_id})
    user = res["Item"]
    return User(**user) if user is not None else None

def get_list(list_id: str) -> TodoList:
    table = get_list_table()
    res = table.get_item(Key={"list_id": list_id})
    list_ = res["Item"]
    return User(**list_) if list_ is not None else None 

def user_exists(user_id: str) -> bool:
    return get_user(user_id) is not None

def list_exists(list_id: str) -> bool:
    return get_list(list_id) is not None

def clean_model(m: BaseModel) -> dict:
    return json.loads(m.json())

def copy_model(m: BaseModel) -> dict:
    return m.__class__(**clean_model(m))

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


########## Higher Level Operations ##############

def signin_user(username: str, password: str) -> User:
    user = get_user_by_username(username)
    if user is None: return None
    pass_match = compare_passwords(password, user.password)
    if not pass_match: return None
    return user

def get_user_jwt(user: User) -> str:
    return create_token({ "user_id": user.user_id })

def create_user(user_info: dict):
    uid = new_user_id()
    password = hash_password(user_info["password"])
    user = User(
        user_id=uid,
        **{
            **user_info,
            "password": password
        }
    )
    write_user(user)
    return user

def update_user(user: User):
    return write_user(user)

def create_list(list_info: dict):
    uid = new_list_id()
    list_ = TodoList(list_id=uid,**list_info)
    write_list(list_)
    return list_

def update_list(list_: TodoList):
    return write_user(list_)

def get_user_data_full(user: User):
    """User's own view of data"""
    data = clean_model(user)
    fields = (
        "user_id",
        "username",
        "name",
        "created_at",
        "friends",
        "todo_lists",
        "requests_out",
        "requests_in",
    )
    return {f: data[f] for f in fields}

def get_user_data_part(user: User):
    """User's view of other User's data"""
    data = clean_model(user)
    fields = (
        "user_id",
        "username",
        "name"
    )
    return {f: data[f] for f in fields}

def get_list_data(list_: TodoList):
    """User's view of other User's data"""
    data = clean_model(list_)
    fields = (
        "list_id",
        "name",
        "items",
        "created_by",
        "created_at",
        "access",
        "archived"
    )
    return {f: data[f] for f in fields}

def add_friend_request(ufrom: User, uto: User):
    from_id = ufrom.user_id
    to_id = uto.user_id
    # Update users
    ufrom.requests_out.append(to_id)
    uto.requests_in.append(from_id)
    # Send update to DB
    update_user(ufrom)
    update_user(uto)

def accept_friend_request(ufrom: User, uto: User) -> bool:
    from_id = ufrom.user_id
    to_id = uto.user_id
    # Update users
    # 1. Make them friends
    ufrom.friends.append(to_id)
    uto.friends.append(from_id)
    # 2. Remove the requests & update DB
    remove_friend_request(ufrom, uto)

def remove_friend_request(ufrom: User, uto: User) -> bool:
    from_id = ufrom.user_id
    to_id = uto.user_id
    # Update users
    ufrom.requests_out = [r for r in ufrom.requests_out if r != to_id]
    uto.requests_in = [r for r in uto.requests_in if r != from_id]
    # Send update to DB
    update_user(ufrom)
    update_user(uto)

def remove_friend(ufrom: User, uto: User) -> bool:
    from_id = ufrom.user_id
    to_id = uto.user_id
    # Update users
    ufrom.friends = [r for r in ufrom.friends if r != to_id]
    uto.friends = [r for r in uto.friends if r != from_id]
    # Send update to DB
    update_user(ufrom)
    update_user(uto)

def user_create_list(user: User, list_info: dict):
    new_list = create_list({
        **list_info,
        "created_by": user.user_id
    })
    user.todo_lists.append(new_list.list_id)
    update_user(user)
    return new_list


def auth_user(event: dict) -> Tuple[User,dict]:
    try:
        auth_token = event["headers"]["Authorization"]
        assert auth_token.startswith("Bearer ")
        auth_token = auth_token.split(" ")[1]
    except Exception as e:
        print("Error getting `token` from `Authorization` header.")
        return None, {
            "statusCode": 401,
            "body": json.dumps({
                "success": False,    
                "message": "Error getting `token` from `Authorization` header.",
            })
        }
    try:
        token_status = None
        data, token_status = check_token(auth_token)
        assert token_status == TokenIs.GOOD
        req_user = get_user(data["user_id"])
    except Exception as e:
        print("Error getting `token` from `Authorization` header.")
        return None, {
            "statusCode": 401,
            "body": json.dumps({
                "success": False,    
                "message": "Unable to authenticate.",
            })
        }
    return req_user, None    

