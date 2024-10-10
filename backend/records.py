import pydantic


class Supplier(pydantic.BaseModel):
    name: str
    ebit_margin: float | None
    revenue: float | None
    spend: float = 0

    def add_spend(self, spend: float | None) -> None:
        if spend:
            self.spend += spend

    @pydantic.computed_field
    @property
    def share_of_wallet(self) -> float | None:
        if not self.revenue:
            return None
        return self.spend / self.revenue
