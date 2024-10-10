import axios from "axios";

export interface Supplier {
    name: string;
    ebit_margin: number | null;
    share_of_wallet: number | null;
    spend: number | null;
}

interface GetSuppliersResponse {
    suppliers: Supplier[];
}

export const fetchSuppliers = async ({ year }: { year: string | null }) => {
    const searchParams = new URLSearchParams();
    if (year !== null) {
        searchParams.set("year", year);
    }
    const response = await axios.get<GetSuppliersResponse>(
        "http://localhost:8000/supplier_transactions?" +
            searchParams.toString(),
    );
    return response.data;
};
