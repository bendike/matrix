import json

from .records import Supplier


def get_suppliers() -> list[Supplier]:
    with open("/home/bendike/ignite_matrix/backend/data.json", "r") as file:
        data = json.load(file)
        colums = data["columns"]

    return [Supplier(name=c["key"], id=c["meta"]["supplier_id"], totals=c["totals"]) for c in colums]


