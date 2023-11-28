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

export default function ListItem(routeProps: RouteProps) {
    return (
        <div>
            {routeProps.route.name}
        </div>
    );
}