import pydantic


class Supplier(pydantic.BaseModel):
    name: str
    id: int
    totals: tuple[float | None, float | None, float | None]
