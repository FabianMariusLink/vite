import Header from "../components/Header.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ListItem from "../components/ListItem.tsx";

type Route = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string
}

export default function PageListRoutes() {

    const [routes, setRoutes] = useState<Route[]>([])

    function fetchTodos() {
        axios
            .get("/api/routes")
            .then((response) => {
                setRoutes(response.data as Route[]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(fetchTodos, [])

    return (
        <>
            <Header/>
            {
                routes.map(route => <ListItem route={route} key={route.id}/>)
            }
        </>
    );
}