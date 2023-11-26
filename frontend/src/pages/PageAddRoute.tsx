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

export default function PageAddRoute() {

    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
    const [open, setOpen] = useState(false);
    const [valueTitle, setValueTitle] = useState('');
    const [valueTitleValid, setValueTitleValid] = useState(true);
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueAuthorValid, setValueAuthorValid] = useState(true);
    const [valueDescription, setValueDescription] = useState('');
    const [valueDescriptionValid, setValueDescriptionValid] = useState(true);
    const [currentDate, setCurrentDate] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (valueTitle === '') {
            setValueTitleValid(false);
            return;
        } else if (valueAuthor === '') {
            setValueAuthorValid(false);
            return;
        } else if (valueDescription === '') {
            setValueDescriptionValid(false);
            return;
        }

        axios.post('/api/routes', {
            name: valueTitle,
            lat: userLocation.lat,
            lng: userLocation.lng,
            date: currentDate,
            author: valueAuthor,
            description: valueDescription,
        } as NewRoute)
            .then()
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation({lat: latitude, lng: longitude});

                    const today = new Date();
                    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                    setCurrentDate(formattedDate);

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
            <div className={"content-container"}>
                <APIProvider apiKey={""}>
                    <div className={"map-container"}>
                        {loading ? (
                            <h2 id="loading-text">Map is loading ...</h2>
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
                <form onSubmit={handleSubmit} className={"form-container"}>
                    <label>Streckentitel:
                        <br/>
                        <input
                            type="text"
                            value={valueTitle}
                            onChange={event => {
                                setValueTitleValid(true);
                                setValueTitle(event.target.value)
                            }}
                        />
                        {!valueTitleValid ? <span style={{color: 'red'}}>Bitte Titel eintragen!</span> : null}
                    </label>
                    <label>Author:
                        <br/>
                        <input
                            type="text"
                            value={valueAuthor}
                            onChange={event => {
                                setValueAuthor(event.target.value)
                                setValueAuthorValid(true);
                            }}
                        />
                        {!valueAuthorValid ? <span style={{color: 'red'}}>Bitte Author eintragen!</span> : null}
                    </label>
                    <label>
                        Beschreibung:
                        <br/>
                        <textarea
                            value={valueDescription}
                            onChange={event => {
                                setValueDescription(event.target.value)
                                setValueDescriptionValid(true);
                            }}
                        />
                        {!valueDescriptionValid ?
                            <span style={{color: 'red'}}>Bitte Beschreibung eintragen!</span> : null}
                    </label>
                    <button>Speichern</button>
                </form>
            </div>
        </>
    );
}