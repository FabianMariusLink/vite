import '../css/Header.css';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className="header-container">
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="20" stroke="#328CDB" fill="#328CDB"/>
                </svg>
                <h2>Vite</h2>
            </div>
            <hr className="underline"/>
            <div className={"navigation"}>
                <Link to="/">Liste</Link>
                <Link to="/PageAddRoute">Strecke anlegen</Link>
            </div>
        </>
    );
}