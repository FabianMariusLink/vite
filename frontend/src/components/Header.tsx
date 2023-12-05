import '../index.css';
import viteLogo from '../pictures/vite-logo.png';

export default function Header() {

    return (
        <>
            <div className="header-container">
                <img src={viteLogo} alt="vite-logo"/>
                <h2>Vite</h2>
            </div>
        </>
    );
}