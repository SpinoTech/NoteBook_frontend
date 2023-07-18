import React, { useContext, useState } from 'react'
import "./Home.css";
import Notes from './Notes';
import noteContext from "../context/notes/noteContext.js";
function Home(props) {

  const {showAlart}=props;

  const context = useContext(noteContext);
  const { addNote } = context;
  // creating a note state
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    // for showing the conditions of input
    if(note.title.length<5) showAlart("Note Title Should Be Atlist 5 Charecter");
    if(note.description.length<10)showAlart("Note Title Should Be Atlist 10 Charecter");
    
    // for preventing page load
   e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlart("The Note Is Added Successfully");
  }

  const onchnage = (e) => {
    // whatever changes happen that will set to the setNote
    // (...)it is spread operator and (...note) copies all the exhisting value to the note and add new valuse ([e.target.name]: e.target.value)
    
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div className='main_body'>
      <div id="left">
        <h2>Create Your Note</h2>
        <form action="">
          <input type="text" placeholder='Heading(Atlist 5 charecters)' id='title' name='title' onChange={onchnage} value={note.title}/>
          <textarea name="description" id="description" cols="30" rows="10" placeholder='Please Write Something In the Note (Atlist 10 charecters)' onChange={onchnage} value={note.description}></textarea>
          <input type="text" placeholder='tag' id='tag' name='tag' onChange={onchnage} value={note.tag}/>
          <input disabled={note.title.length<5 || note.description.length<10} type="submit" value={note.title.length<5?"write more title" : note.description.length<10?"write more description":"add note"} className='btn' onClick={handleClick} />
        </form>
      </div>

      <div id="right">
        <Notes showAlart={showAlart}/>
      </div>
    </div>
  )
}

export default Home
