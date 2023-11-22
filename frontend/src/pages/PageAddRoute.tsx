import Header from "../components/Header.tsx";
import '../css/Global.css';
import React, {useState} from "react";
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

    const position = {lat: 47.99342361334973, lng: 7.857156473011635};
    const [open, setOpen] = useState(false);
    const [valueTitle, setValueTitle] = useState('');
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueDescription, setValueDescription] = useState('');

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/routes", {
            name: valueTitle,
            lat: 47.99342361334973,
            lng: 7.857156473011635,
            date: "2023-11-21",
            author: valueAuthor,
            description: valueDescription
        } as NewRoute)
            .then();
    };

    return (
        <>
            <Header/>
            <body>
            <APIProvider apiKey={""}>
                <div className={"map"}>
                    <Map zoom={15} center={position} mapId={"8a28e823bfef5b48"}>
                        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                            <Pin background={"red"} borderColor={"red"} glyphColor={"red"}/>
                        </AdvancedMarker>
                        {open && (
                            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                <p>I am in Hamburg</p>
                            </InfoWindow>
                        )}
                    </Map>
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
                <div>
                    <label className="toggle-switch">
                        Standort verwenden:
                        <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
                        <span className="slider"></span>
                    </label>
                </div>
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
            </body>
        </>
    );
}