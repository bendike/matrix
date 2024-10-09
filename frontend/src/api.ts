import axios from "axios";

interface Supplier {
    id: number;
    name: string;
    totals: (number | null)[];
}

interface GetSuppliersResponse {
    suppliers: Supplier[];
}

export const fetchSuppliers = async () => {
    const response = await axios.get<GetSuppliersResponse>(
        "http://localhost:8000/suppliers",
    );
    return response.data;
};
