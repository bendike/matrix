from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .selectors import get_suppliers, get_suppliers_from_transactions

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/suppliers")
def suppliers():
    suppliers = get_suppliers()
    return {"suppliers": suppliers}

@app.get("/supplier_transactions")
def suppliers_from_transactions(year: int | None = None):
    suppliers = get_suppliers_from_transactions(year)
    return {"suppliers": suppliers}
