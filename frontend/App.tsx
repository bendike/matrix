import React from "react";
import { useQuery } from "react-query";
import { fetchSuppliers } from "./api";
import IgnitePlot from "./Canvas";

function App() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["fetchData"],
        queryFn: fetchSuppliers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (data === undefined) return;

    return (
        <div className="App">
            <div
                className="CenteredContainer"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <IgnitePlot data={data.suppliers.map((s) => s.totals)} />
            </div>
        </div>
    );
}

export default App;
