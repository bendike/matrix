This is currently split into separate folders for frontend and backend.

### Backend

This requires poetry: https://python-poetry.org/docs/#installation.
To run the backend:

```sh
cd backend
poetry install
poetry run uvicorn src.main:app
```

### Frontend

To run the frontend:

```sh
cd frontend
npm i
npm start
```
