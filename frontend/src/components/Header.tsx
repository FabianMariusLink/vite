import '../css/Header.css';
import {Link} from "react-router-dom";
import viteLogo from '../pictures/vite-logo.png';

export default function Header() {

    return (
        <>
            <div className="header-container">
                <img src={viteLogo}  alt="vite-logo"/>
                <h2>Vite</h2>
            </div>
            <hr className="underline"/>
            <div className={"navigation"}>
                <Link to="/">Liste</Link>
                <Link to="/add-route">Strecke anlegen</Link>
            </div>
        </>
    );
}