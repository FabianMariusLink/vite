import viteSave from "../pictures/vite-save.png";
import React, {useEffect, useState} from "react";

type FormProps = {
    title: string,
    author: string,
    description: string,
    onSaveFormEntries: (title: string, author: string, description: string) => void
}

export default function Form(formProps: FormProps) {

    const [valueTitle, setValueTitle] = useState<string>('');
    const [valueTitleValid, setValueTitleValid] = useState<boolean>(true);
    const [valueAuthor, setValueAuthor] = useState<string>('');
    const [valueAuthorValid, setValueAuthorValid] = useState<boolean>(true);
    const [valueDescription, setValueDescription] = useState<string>('');
    const [valueDescriptionValid, setValueDescriptionValid] = useState<boolean>(true);

    useEffect(setFormEntries, [formProps.author, formProps.description, formProps.title]);

    function setFormEntries() {
        setValueTitle(formProps.title);
        setValueAuthor(formProps.author);
        setValueDescription(formProps.description);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        formProps.onSaveFormEntries(valueTitle, valueAuthor, valueDescription);
    };

    return (
        <form onSubmit={handleSubmit} className={"form-container"}>
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
    );
}