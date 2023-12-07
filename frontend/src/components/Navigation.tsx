import viteList from "../pictures/vite-list.png";
import vitePlusPin from "../pictures/vite-plus-pin.png";
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <div className="navigation">
            <button>
                <Link to="/"><img src={viteList} alt="vite-list"/></Link>
            </button>
            <button>
                <Link to="/add-run"><img src={vitePlusPin} alt="vite-map"/></Link>
            </button>
        </div>
    );
}