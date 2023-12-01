import Header from "../components/Header.tsx";
import '../index.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MapWindow from "../components/MapWindow.tsx";

type Route = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string
}

export default function PageDetailsRoute() {

    const [data, setData] = useState<Route>({id: '', name: '', lat: 0, lng: 0, date: '', author: '', description: ''});
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    useEffect(() => {
        axios.get(`/api/routes/${params.id}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [params.id]);

    return (
        <>
            <Header/>
            <div className={"content-container"}>
                <MapWindow coordinates={{lat: data.lat, lng: data.lng}} loading={loading}/>
                <p>Streckentitel:</p>
                <p className="details-background">{data.name}</p>
                <p>Erstellt am:</p>
                <p className="details-background">{data.date}</p>
                <p>Author:</p>
                <p className="details-background">{data.author}</p>
                <p>Beschreibung:</p>
                <p className="details-background">{data.description}</p>
            </div>
        </>
    );
}