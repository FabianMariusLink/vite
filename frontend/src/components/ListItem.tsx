import {Run} from '../Types.ts';
import '../index.css';
import {Link} from "react-router-dom";
import vitePinList from '../pictures/vite-pin-list.png';
import viteMapList from "../pictures/vite-map.png";

type RunProps = {
    run: Run,
}

export default function ListItem(runProps: Readonly<RunProps>) {

    function truncateText(text: string, maxLength: number) {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + ' ...';
        }
        return text;
    }

    return (
        <div className="list-item">
            <div className="left">
                <img src={vitePinList} alt="vite-pin-list"/>
            </div>
            <div className="center">
                <p className="date-author">{runProps.run.date} {runProps.run.author}</p>
                <p className="name">{runProps.run.name}</p>
                <p className="description">{truncateText(runProps.run.description, 4)}</p>
            </div>
            <div className="right">
                <Link to={`/details-run/${runProps.run.id}`}>
                    <img src={viteMapList} alt="vite-details"/>
                </Link>
            </div>
        </div>
    );
}