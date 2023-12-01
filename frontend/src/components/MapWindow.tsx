import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
import {useState} from "react";

type MapProps = {
    coordinates: { lat: number; lng: number };
    loading: boolean
};

export default function MapWindow(mapProps: Readonly<MapProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className={"map-container"}>
                {mapProps.loading ? (
                    <h2 id="loading-text">Map is loading ...</h2>
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
            </div>
        </APIProvider>
    );
}