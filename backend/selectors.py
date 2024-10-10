import json

from .records import Supplier


def get_suppliers() -> list[Supplier]:
    # NOTE: file relative to where you start uvicorn
    with open("backend/data.json") as file:
        data = json.load(file)
        colums = data["columns"]

    return [Supplier(name=c["key"], id=c["meta"]["supplier_id"], totals=c["totals"]) for c in colums]


