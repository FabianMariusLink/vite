import {NewRun} from '../Types.ts';
import '../index.css';
import Header from "../components/Header.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import MapWindow from "../components/MapWindow.tsx";
import viteSave from "../pictures/vite-save.png";
import {useNavigate} from "react-router-dom";

type AddRunProps = {
    onListRunsChange: () => void
}

export default function PageAddRun(addRunProps: Readonly<AddRunProps>) {

    const [loading, setLoading] = useState<boolean>(true);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number }>({lat: 0, lng: 0});
    const [valueTitle, setValueTitle] = useState<string>('');
    const [valueTitleValid, setValueTitleValid] = useState<boolean>(true);
    const [valueAuthor, setValueAuthor] = useState<string>('');
    const [valueAuthorValid, setValueAuthorValid] = useState<boolean>(true);
    const [valueDescription, setValueDescription] = useState<string>('');
    const [valueDescriptionValid, setValueDescriptionValid] = useState<boolean>(true);
    const [currentDate, setCurrentDate] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmitNewRun = (event: React.FormEvent<HTMLFormElement>) => {
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
        } as NewRun)
            .then(addRunProps.onListRunsChange)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        navigate('/');
    };

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

    return (
        <div className="display">
            <Header/>
            <MapWindow coordinates={userLocation} loading={loading}/>
            <div className={"content-container"}>
                <form onSubmit={handleSubmitNewRun} className={"form-container"}>
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
                    <button className="icon-button">
                        <img src={viteSave} alt="icon" className="icon-image"/>
                    </button>
                </form>
            </div>
        </div>
    );
}