import '../css/ListItem.css';
import {Link} from "react-router-dom";
import vitePinList from '../pictures/vite-pin-list.png';
import viteDetails from "../pictures/vite-world.png";

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
                <img src={vitePinList} alt="vite-pin-list"/>
            </div>
            <div className="center">
                <p className="date-author">{routeProps.route.date} {routeProps.route.author}</p>
                <p className="name">{routeProps.route.name}</p>
                <p className="description">{truncateText(routeProps.route.description, 4)}</p>
            </div>
            <div className="right">
                <Link to={`/details-route/${routeProps.route.id}`}>
                    <img src={viteDetails} alt="vite-details"/>
                </Link>
            </div>
        </div>
    );
}