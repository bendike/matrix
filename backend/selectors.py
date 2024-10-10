import csv
import datetime as dt
import json

from .records import Supplier


def get_suppliers() -> list[Supplier]:
    file_path = "backend/data.json"
    with open(file_path) as file:
        data = json.load(file)
        colums = data["columns"]

    suppliers: list[Supplier] = []

    for col in colums:
        name = col["key"]
        spend = col["totals"][2]
        share_of_wallet = col["totals"][1]
        ebit_margin = col["totals"][0]

        if share_of_wallet and spend:
            revenue = spend / share_of_wallet
        else:
            revenue = None

        suppliers.append(
            Supplier(
                name=name,
                spend=spend,
                ebit_margin=ebit_margin,
                revenue=revenue,
            )
        )

    return suppliers


def get_suppliers_from_transactions(year: int | None) -> list[Supplier]:
    suppliers_by_name: dict[str, Supplier] = {}

    file_path = "backend/transactions.csv"
    with open(file_path, mode="r") as file:
        csv_reader = csv.reader(file, delimiter=";")
        for idx, row in enumerate(csv_reader):
            if idx == 0:
                continue

            company_name = row[0]
            raw_spend = row[1]
            raw_transaction_date = row[2]
            raw_ebit_margin = row[7]
            raw_revenue = row[5]

            spend = float(raw_spend.replace(",", ".")) if raw_spend else None
            ebit_margin = (
                float(raw_ebit_margin.replace(",", ".")) if raw_ebit_margin else None
            )
            revenue = float(raw_revenue.replace(",", ".")) if raw_revenue else None

            transaction_date = dt.datetime.strptime(raw_transaction_date, "%Y-%m-%d")

            if year is not None and transaction_date.year != year:
                continue

            if company_name not in suppliers_by_name:
                suppliers_by_name[company_name] = Supplier(
                    name=company_name, ebit_margin=ebit_margin, revenue=revenue
                )

            suppliers_by_name[company_name].add_spend(spend)

    return list(suppliers_by_name.values())
