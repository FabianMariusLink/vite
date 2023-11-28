import {Route, Routes} from "react-router-dom";
import PageAddRoute from "./pages/PageAddRoute.tsx";
import PageListRoutes from "./pages/PageListRoutes.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<PageListRoutes/>}/>
            <Route path="/add-route" element={<PageAddRoute/>}/>
        </Routes>
    )
}

export default App
