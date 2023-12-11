import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import axios from "axios";

type MapProps = {
    coordinates: { lat: number; lng: number };
    loading: boolean
};

export default function MapWindow(mapProps: Readonly<MapProps>) {

    const [open, setOpen] = useState<boolean>(false);

    const[apiKey, setApiKey] = useState<string | undefined>(undefined)

    function fetchApiKey() {
        axios.get("/api/settings")
            .then(r => setApiKey(r.data))
            .catch (e => console.log(e))
    }

    useEffect(() => {
        fetchApiKey();
    }, []);

    if(!apiKey) return <p>Loading ... </p>

    return (
        <div className={"map-container"}>
            <APIProvider apiKey={apiKey}>
                {mapProps.loading ? (
                    <h2 id="loading-text">Karte wird geladen ...</h2>
                ) : (
                    <Map zoom={18}
                         center={{lat: mapProps.coordinates.lat, lng: mapProps.coordinates.lng}}
                         mapId={"8a28e823bfef5b48"}
                    >
                        <AdvancedMarker
                            position={{lat: mapProps.coordinates.lat, lng: mapProps.coordinates.lng}}
                            onClick={() => setOpen(true)}
                        >
                            <Pin
                                background={"#98c5ed"}
                                borderColor={"white"}
                                glyphColor={"white"}/>
                        </AdvancedMarker>
                        {open && (
                            <InfoWindow
                                position={{lat: mapProps.coordinates.lat, lng: mapProps.coordinates.lng}}
                                onCloseClick={() => setOpen(false)}>
                                <p>I am here :-)</p>
                            </InfoWindow>
                        )}
                    </Map>
                )}
            </APIProvider>
        </div>
    );
}