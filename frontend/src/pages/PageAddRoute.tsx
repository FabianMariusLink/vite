import Header from "../components/Header.tsx";
import '../css/Global.css';
import React, {useEffect, useState} from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from "axios";

type NewRoute = {
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string
}

type SavedRoute = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    date: string,
    author: string,
    description: string
}

export default function PageAddRoute() {

    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [valueTitle, setValueTitle] = useState('');
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [savedRoute, setSavedRoute] = useState<SavedRoute>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        setCurrentDate(formattedDate);
        try {
            const response = await axios.post('/api/routes', {
                name: valueTitle,
                lat: userLocation.lat,
                lng: userLocation.lng,
                date: currentDate,
                author: valueAuthor,
                description: valueDescription,
            } as NewRoute);
            setSavedRoute(response.data);
            if (savedRoute && savedRoute.id) {
                alert(savedRoute.id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation({lat: latitude, lng: longitude});
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false);
                }
            );
        }
    }, []);

    return (
        <>
            <Header/>
            <body>
            <div className={"content-container"}>
                <APIProvider apiKey={""}>
                    <div className={"map"}>
                        {loading ? (
                            <p id="loading-container">Loading ...</p>
                        ) : (
                            <Map zoom={19}
                                 center={userLocation}
                                 mapId={"8a28e823bfef5b48"}
                            >
                                <AdvancedMarker
                                    position={userLocation}
                                    onClick={() => setOpen(true)}
                                >
                                    <Pin
                                        background={"#98c5ed"}
                                        borderColor={"white"}
                                        glyphColor={"white"}/>
                                </AdvancedMarker>
                                {open && (
                                    <InfoWindow
                                        position={userLocation}
                                        onCloseClick={() => setOpen(false)}>
                                        <p>I am here :-)</p>
                                    </InfoWindow>
                                )}
                            </Map>
                        )}
                    </div>
                </APIProvider>
                <form onSubmit={handleSubmit}>
                    <label>Streckentitel:
                        <br/>
                        <input
                            type="text"
                            value={valueTitle}
                            onChange={event => {
                                setValueTitle(event.target.value)
                            }}
                        />
                    </label>
                    <label>Author:
                        <br/>
                        <input
                            type="text"
                            value={valueAuthor}
                            onChange={event => setValueAuthor(event.target.value)}
                        />
                    </label>
                    <label>
                        Beschreibung:
                        <br/>
                        <textarea
                            value={valueDescription}
                            onChange={event => setValueDescription(event.target.value)}
                        />
                    </label>
                    <button>Speichern</button>
                </form>
            </div>
            </body>
        </>
    );
}