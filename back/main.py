from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Message, CodeValidation, MessageList, CodeRequest
from storage import storage

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI backend!"}

@app.post("/messages", response_model=Message)
async def create_message(message: Message):
    storage.add_message(message)
    return message

@app.get("/messages", response_model=MessageList)
async def get_messages():
    return MessageList(messages=storage.get_messages())

@app.post("/validate-code", response_model=CodeValidation)
async def validate_code(code_request: CodeRequest):
    if not storage.is_code_used(code_request.code):
        return CodeValidation(code=code_request.code, is_valid=False)
    
    # Code exists and is valid, remove it after validation
    #storage.remove_code(code_request.code)
    return CodeValidation(code=code_request.code, is_valid=True)

@app.post("/add-code")
async def add_code(code_request: CodeRequest):
    storage.add_code(code_request.code)
    print(f"Code added: {code_request.code}")
    print(f"Available codes: {storage.available_codes}")
    return {"code": code_request.code}

@app.delete("/messages")
async def clear_messages():
    storage.clear_messages()
    return {"message": "All messages have been cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 