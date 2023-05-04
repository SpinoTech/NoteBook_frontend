import React, { useContext, useEffect } from 'react'
import "./Notes.css";
import noteContext from "../context/notes/noteContext.js";
import NoteItem from './NoteItem.js';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    let history = useNavigate();
    const {showAlart}=props;
    const context = useContext(noteContext);
    const { notes , getNotes} = context;
    useEffect(()=>{
        if(localStorage.getItem('token'))getNotes();
        else history("/login");
    });
    return (
        <div>
            <h2 id='notes_heading'>All Notes Of Yours</h2>
            {notes.length===0 && "No Notes Found !"}
            {
            
                notes.map((note) => {
                    return <NoteItem note={note} key={note._id} showAlart={showAlart}/>;
                })
            }
        </div>
    )
}

export default Notes
