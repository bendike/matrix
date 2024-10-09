import IgnitePlot from "./canvas";
import data from "./data.json";

function App() {
    return (
        <div className="App">
            <div
                className="CenteredContainer"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <IgnitePlot data={data.columns.map((c) => c.totals)} />
            </div>
        </div>
    );
}

export default App;
