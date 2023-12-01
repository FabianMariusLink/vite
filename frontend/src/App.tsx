import {Route, Routes} from "react-router-dom";
import PageAddRoute from "./pages/PageAddRoute.tsx";
import PageListRoutes from "./pages/PageListRoutes.tsx";
import PageDetailsRoute from "./pages/PageDetailsRoute.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<PageListRoutes/>}/>
            <Route path="/details-route/:id" element={<PageDetailsRoute/>}/>
            <Route path="/add-route" element={<PageAddRoute/>}/>
        </Routes>
    )
}

export default App
