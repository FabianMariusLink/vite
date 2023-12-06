import {Run, NewRun} from '../Types.ts';
import Header from "../components/Header.tsx";
import MapWindow from "../components/MapWindow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import viteLocation from "../pictures/vite-pin.png";
import viteSave from "../pictures/vite-save.png";

type UpdateRunsProps = {
    onListRunsChange: () => void
}

export default function PageUpdateRun(updateRunsProps: Readonly<UpdateRunsProps>) {

    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
    const [valueTitle, setValueTitle] = useState('');
    const [valueTitleValid, setValueTitleValid] = useState(true);
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueAuthorValid, setValueAuthorValid] = useState(true);
    const [valueDescription, setValueDescription] = useState('');
    const [valueDescriptionValid, setValueDescriptionValid] = useState(true);

    const [data, setData] = useState<Run>({id: '', name: '', lat: 0, lng: 0, date: '', author: '', description: ''});
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get(`/api/routes/${params.id}`)
            .then(response => {
                setData(response.data);
                setUserLocation({lat: data.lat, lng: data.lng});
                setValueTitle(data.name);
                setValueAuthor(data.author);
                setValueDescription(data.description);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [data.lat, data.lng, data.author, data.description, data.name, params.id]);

    const handleUserLocation = () => {
        setShowPopup(true);
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        setUserLocation({lat: latitude, lng: longitude});
                        resolve(userLocation);
                        setShowPopup(false);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        reject(error);
                        setShowPopup(false);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                const error = new Error('Geolocation is not supported by this browser.');
                reject(error);
                setShowPopup(false);
            }
        });
    };

    const handleSubmitUpdate = () => {
        axios.put(`/api/routes/${data.id}`, {
            name: valueTitle,
            lat: userLocation.lat,
            lng: userLocation.lng,
            date: data.date,
            author: valueAuthor,
            description: valueDescription,
        } as NewRun)
            .then(updateRunsProps.onListRunsChange)

        navigate('/details-run/' + data.id);
    }

    return (
        <div className="display">
            <Header/>
            <MapWindow coordinates={userLocation} loading={loading}/>
            <div className={"content-container"}>
                <form className={"form-container"}>
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
                </form>
                <div className="round-buttons">
                    <button className="icon-button" onClick={handleUserLocation}>
                        <img className="icon-image" src={viteLocation} alt="icon"/>
                    </button>
                    <button className="icon-button" onClick={handleSubmitUpdate}>
                        <img className="icon-image" src={viteSave} alt="icon"/>
                    </button>
                </div>
                {showPopup && (
                    <div className="popup">
                        <p>Dein Standort wird erfasst ...</p>
                    </div>
                )}
            </div>
        </div>
    );
}