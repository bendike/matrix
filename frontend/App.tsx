import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchSuppliers } from "./api";
import IgnitePlot from "./IgnitePlot";

function App() {
    const year = useMemo(() => {
        // Access the query string
        const queryString = window.location.search;

        // Parse the query string
        const urlParams = new URLSearchParams(queryString);

        // Get specific query parameters
        return urlParams.get("year");
    }, []);

    const { data, error, isLoading } = useQuery({
        queryKey: ["fetchData", year],
        queryFn: () => fetchSuppliers({ year }),
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
                <IgnitePlot suppliers={data.suppliers} />
            </div>
        </div>
    );
}

export default App;
