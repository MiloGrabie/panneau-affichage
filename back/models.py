from pydantic import BaseModel
from typing import List, Set, Dict
from datetime import datetime

class Message(BaseModel):
    text: str
    timestamp: int

class CodeValidation(BaseModel):
    code: str
    is_valid: bool

class MessageList(BaseModel):
    messages: List[Message]

class CodeRequest(BaseModel):
    code: str

class Code(BaseModel):
    code: str
    expires_at: int  # Unix timestamp 