
from enum import Enum
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class TokenIs(Enum):
    GOOD = 0
    MALFORMED = 1
    EXPIRED = 2
    TOO_EARLY = 3
    SIGNATURE_MISMATCH = 4
    UNKNOWN_ERR = 5



class User(BaseModel):
    user_id: str
    username: str
    name: str
    password: str # hashed
    created_at: datetime
    friends: List[str] = []
    todo_lists: List[str] = []
    requests_out: List[str] = []
    requests_in: List[str] = []


class ListItem(BaseModel):
    text: str
    created_by: str # user-id
    created_at: datetime
    completed: bool = False
    completed_by: Optional[str] = None # user-id
    completed_at: Optional[datetime] = None


class TodoList(BaseModel):
    list_id: str
    name: str
    items: List[ListItem] = [] # list-ids
    created_by: str # user-id
    created_at: datetime
    access: List[str] = [] # user-ids
    archived: bool = False


