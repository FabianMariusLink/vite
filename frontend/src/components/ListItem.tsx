import '../css/ListItem.css';
import {Link} from "react-router-dom";

type Route = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string,
}

type RouteProps = {
    route: Route,
}

export default function ListItem(routeProps: Readonly<RouteProps>) {

    function truncateText(text: string, maxLength: number) {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + ' ...';
        }
        return text;
    }

    return (
        <div className="list-item">
            <div className="left">
                <img src="/src/pictures/vite-logo-list-item.png" alt="vite-logo-list-item"/>
            </div>
            <div className="center">
                <p className="date-author">{routeProps.route.date} {routeProps.route.author}</p>
                <p className="name">{routeProps.route.name}</p>
                <p className="description">{truncateText(routeProps.route.description, 4)}</p>
            </div>
            <div className="right">
                <Link to={`/details-route/${routeProps.route.id}/details`}>
                    <img src="/src/pictures/vite-welt-01.png" alt="vite-welt"/>
                </Link>
            </div>
        </div>
    );
}