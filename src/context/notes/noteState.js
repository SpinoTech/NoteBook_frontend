import React, { useState } from 'react';
// importing the context api
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host ="https://spinotech-notebook-backend2.onrender.com";

  // this is a state inside this NoteState function
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  // fetch all notes
  const getNotes = async() => {
    // api call
     const responce = await fetch(`${host}/api/notes/FetchAllNotes`,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'authentication_token' : localStorage.getItem('token')
      }
     })
     const json =await responce.json();
    //  console.log(json);
    setNotes(json);
  }
  // Add a note
  const addNote = async(title, description, tag) => {
    // api call
     const responce = await fetch(`${host}/api/notes/addNote`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'authentication_token' : localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
     })
     const json = responce.json();
     console.log(json);

    //  client side part
    // console.log("adding a new note");
    let note = {
      "_id": "641c36d3b4d0a10ffd246c63",
      "user": "641a1f81bf71cc1ef70d599e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-23T11:24:03.650Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  // Delete a Note
  const deleteNote = async(id) => {
    // api call
    const responce = await fetch(`${host}/api/notes/deleteNote/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'authentication_token' : localStorage.getItem('token')
      }
     })
     const json =await responce.json();
    //  console.log(json);
    setNotes(json);
    
    // filtering the notes which id is not equal to the id variable 
    const newNote = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNote);
  }
  // Edit a Note
  const editNote = async(id,title, description, tag) => {
    // api call
     const responce = await fetch(`${host}/api/notes/updateNote/${id}`,{
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'authentication_token' : localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
     })
     const json = responce.json();
     console.log(json);

    // logic to edit in client
    //  for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //    if(element._id===id)
    //    {
    //     element.title=title;
    //     element.description=description;
    //     element.tag=tag;
    //    }
    //  }
    // you can use the upper code or the bellow code .. both are same type and work
    const newNote = notes.filter((note) => {
      return note._id === id;
    })
    newNote.title=title;
    newNote.description=description;
    newNote.tag=tag;
    setNotes(newNote);
  }
   // search a notes
   const searchNote = async(title) => {
    // // api call
    //  const responce = await fetch(`${host}/api/notes/search`,{
    //   method : 'POST',
    //   headers : {
    //     'Content-Type' : 'application/json',
    //     'authentication_token' : localStorage.getItem('token')
    //   },
    //   body:JSON.stringify({title})
    //  })
    //  const json =await responce.json();
    //  console.log(json)
    //  return json;

    let notereturn=[];
    notes.map((note)=>{
        if(note.title===title)notereturn.push(note);
        return null;
    });
    return notereturn;
    
  }

  return (
    // Wrap child components in the Context Provider and supply the state value.
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote , searchNote }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;