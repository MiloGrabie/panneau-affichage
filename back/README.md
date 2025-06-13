# FastAPI Backend

This is the backend server for the panneau-affichage application.

## Setup

1. Make sure you have Python 3.8+ installed
2. Activate the virtual environment:
   ```bash
   # On Windows
   .\venv\Scripts\activate
   
   # On Unix/MacOS
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

To run the development server:

```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Interactive API docs (Swagger UI): `http://localhost:8000/docs`
- Alternative API docs (ReDoc): `http://localhost:8000/redoc` 