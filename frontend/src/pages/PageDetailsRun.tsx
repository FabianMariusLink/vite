import {Run} from '../Types.ts';
import '../index.css';
import Header from "../components/Header.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MapWindow from "../components/MapWindow.tsx";
import viteDelete from "../pictures/vite-muelleimer.png";
import viteEdit from "../pictures/vite-pen.png";

type DetailsRunsProps = {
    onListRunsChange: () => void
}

export default function PageDetailsRun(detailsRunsProps: Readonly<DetailsRunsProps>) {

    const [data, setData] = useState<Run>({id: '', name: '', lat: 0, lng: 0, date: '', author: '', description: ''});
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const handleYesClick = () => {
        axios.delete("/api/routes/" + data.id)
            .then(detailsRunsProps.onListRunsChange)
        navigate('/');
        setShowPopup(false);
    };

    const handleNoClick = () => {
        setShowPopup(false);
    };

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

    const deleteRun = () => {
        setShowPopup(true);
    };

    const updateRun = () => {
        navigate('/edit-run/' + data.id);
    }

    return (
        <>
            <div className="display">
                <Header/>
                <MapWindow coordinates={{lat: data.lat, lng: data.lng}} loading={loading}/>
                <div className={"content-container"}>
                    <div className={"content-details"}>
                        <p>Streckentitel:</p>
                        <p className="details-background">{data.name}</p>
                        <p>Erstellt am:</p>
                        <p className="details-background">{data.date}</p>
                        <p>Author:</p>
                        <p className="details-background">{data.author}</p>
                        <p>Beschreibung:</p>
                        <p className="details-background">{data.description}</p>
                        <div className="round-buttons">
                            <button className="icon-button" onClick={updateRun}>
                                <img src={viteEdit} alt="icon" className="icon-image"/>
                            </button>
                            <button className="icon-button" onClick={deleteRun}>
                                <img src={viteDelete} alt="icon" className="icon-image"/>
                            </button>
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <div className="popup">
                        <p>Strecke löschen?</p>
                        <div className="popup-buttons">
                            <button onClick={handleYesClick}>Ja</button>
                            <button onClick={handleNoClick}>Nein</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}