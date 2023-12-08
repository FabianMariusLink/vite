import {Run, NewRun} from '../Types.ts';
import Header from "../components/Header.tsx";
import MapWindow from "../components/MapWindow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import viteLocation from "../pictures/vite-pin.png";
import Form from "../components/Form.tsx";

type UpdateRunsProps = {
    onListRunsChange: () => void
}

export default function PageUpdateRun(updateRunsProps: Readonly<UpdateRunsProps>) {

    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
    const [valueTitle, setValueTitle] = useState('');
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [data, setData] = useState<Run>({id: '', name: '', lat: 0, lng: 0, date: '', author: '', description: ''});
    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

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

    const handleUpdateRun = (title: string, author: string, description: string) => {
        axios.put(`/api/routes/${data.id}`, {
            name: title,
            lat: userLocation.lat,
            lng: userLocation.lng,
            date: data.date,
            author: author,
            description: description,
        } as NewRun)
            .then(updateRunsProps.onListRunsChange);
        //navigate('/details-run/' + data.id);
        navigate('/');
    }

    return (
        <div className="display">
            <Header/>
            <MapWindow coordinates={userLocation} loading={loading}/>
            <button className="icon-button" onClick={handleUserLocation}>
                <img className="icon-image" src={viteLocation} alt="icon"/>
            </button>
            <div className={"content-container"}>
                <Form title={valueTitle} author={valueAuthor} description={valueDescription}
                      onSaveFormEntries={handleUpdateRun}/>
                {showPopup && (
                    <div className="popup">
                        <p>Dein Standort wird erfasst ...</p>
                    </div>
                )}
            </div>
        </div>
    );
}