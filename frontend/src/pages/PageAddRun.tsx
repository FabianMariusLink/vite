import {NewRun} from '../Types.ts';
import '../index.css';
import Header from "../components/Header.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import MapWindow from "../components/MapWindow.tsx";
import {useNavigate} from "react-router-dom";
import Form from "../components/Form.tsx";

type AddRunProps = {
    onListRunsChange: () => void
}

export default function PageAddRun(addRunProps: Readonly<AddRunProps>) {

    const [loading, setLoading] = useState<boolean>(true);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number }>({lat: 0, lng: 0});
    const [currentDate, setCurrentDate] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation({lat: latitude, lng: longitude});

                    const today = new Date();
                    const day = today.getDate();
                    const month = today.getMonth() + 1;
                    const formatNumber = (number: number) => (number < 10 ? `0${number}` : number);
                    const formattedDate = `${today.getFullYear()}-${formatNumber(month)}-${formatNumber(day)}`;
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

    const handleSaveRun = (title: string, author: string, description: string) => {
        axios.post('/api/routes', {
            name: title,
            lat: userLocation.lat,
            lng: userLocation.lng,
            date: currentDate,
            author: author,
            description: description,
        } as NewRun)
            .then(addRunProps.onListRunsChange)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        navigate('/');
    };

    return (
        <div className="display">
            <Header/>
            <MapWindow coordinates={userLocation} loading={loading}/>
            <div className={"content-container"}>
                <Form title={''} author={''} description={''} onSaveFormEntries={handleSaveRun}/>
            </div>
        </div>
    );
}