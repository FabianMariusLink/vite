import {Run} from "./Types.ts";
import {Route, Routes} from "react-router-dom";
import PageListRuns from "./pages/PageListRuns.tsx";
import PageAddRun from "./pages/PageAddRun.tsx";
import PageDetailsRun from "./pages/PageDetailsRun.tsx";
import PageUpdateRun from "./pages/PageUpdateRun.tsx";
import Navigation from "./components/Navigation.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [runs, setRuns] = useState<Run[]>([])

    function fetchListRuns() {
        axios
            .get("/api/routes")
            .then((response) => {
                setRuns(response.data as Run[]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(fetchListRuns, [])

    if (!runs) {
        return "List is loading ..."
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<PageListRuns runs={runs}/>}/>
                <Route path="/add-run" element={<PageAddRun onListRunsChange={fetchListRuns}/>}/>
                <Route path="/details-run/:id" element={<PageDetailsRun onListRunsChange={fetchListRuns}/>}/>
                <Route path="/edit-run/:id" element={<PageUpdateRun onListRunsChange={fetchListRuns}/>}/>
            </Routes>
            <Navigation/>
        </>
    )
}

export default App
