import {Run} from '../Types.ts';
import Header from "../components/Header.tsx";
import ListItem from "../components/ListItem.tsx";

type ListRunsProps = {
    runs: Run[];
}

export default function PageListRuns(listRunsProps: Readonly<ListRunsProps>) {

    return (
        <>
            <div className="display">
                <Header/>
                <div className={"content-container"}>
                    {
                        listRunsProps.runs.map(run => <ListItem run={run} key={run.id}/>)
                    }
                </div>
            </div>
        </>
    );
}