import json
import os
import time
from typing import List, Set, Dict
from models import Message, Code

class Storage:
    def __init__(self):
        self.messages_file = "messages.json"
        self.codes_file = "codes.json"
        self.messages: List[Message] = []
        self.available_codes: Dict[str, Code] = {}
        self.load_data()

    def load_data(self):
        # Load messages
        if os.path.exists(self.messages_file):
            with open(self.messages_file, 'r') as f:
                data = json.load(f)
                self.messages = [Message(**msg) for msg in data]
        
        # Load codes
        if os.path.exists(self.codes_file):
            with open(self.codes_file, 'r') as f:
                codes_data = json.load(f)
                # Handle both old list format and new dict format
                if isinstance(codes_data, list):
                    # Convert old list format to new dict format
                    current_time = int(time.time())
                    self.available_codes = {
                        code: Code(code=code, expires_at=current_time + 60)
                        for code in codes_data
                    }
                else:
                    # New dict format
                    self.available_codes = {
                        code: Code(**code_data) 
                        for code, code_data in codes_data.items()
                    }
                # Save in new format
                self.save_data()

    def save_data(self):
        # Save messages
        with open(self.messages_file, 'w') as f:
            json.dump([msg.dict() for msg in self.messages], f)
        
        # Save codes
        with open(self.codes_file, 'w') as f:
            json.dump(
                {code: code_data.dict() for code, code_data in self.available_codes.items()},
                f
            )

    def add_message(self, message: Message):
        self.messages.append(message)
        # Keep only the last 5 messages
        self.messages = self.messages[-5:]
        self.save_data()

    def get_messages(self) -> List[Message]:
        return self.messages[-1:] if self.messages else []

    def add_code(self, code: str):
        # Code expires in 1 minute
        expires_at = int(time.time()) + 60
        self.available_codes[code] = Code(code=code, expires_at=expires_at)
        self.save_data()

    def is_code_used(self, code: str) -> bool:
        # Clean expired codes
        current_time = int(time.time())
        expired_codes = [
            c for c, code_data in self.available_codes.items()
            if code_data.expires_at < current_time
        ]
        for expired_code in expired_codes:
            del self.available_codes[expired_code]
        
        if expired_codes:
            self.save_data()
        
        return code in self.available_codes

    def remove_code(self, code: str):
        if code in self.available_codes:
            del self.available_codes[code]
            self.save_data()

    def clear_messages(self):
        self.messages = []
        self.save_data()

# Create a global storage instance
storage = Storage() 