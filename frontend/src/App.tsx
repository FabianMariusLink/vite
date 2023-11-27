import {Route, Routes} from "react-router-dom";
import PageAddRoute from "./pages/PageAddRoute.tsx";

function App() {

    return (
        <Routes>
            <Route path="/add-route" element={<PageAddRoute/>}/>
        </Routes>
    )
}

export default App
