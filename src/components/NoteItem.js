import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext.js";
import "./NoteItem.css";
// import noteContext from "../context/notes/noteContext.js";
import { SiTeamspeak } from "react-icons/si";
import { IoMdVolumeOff } from "react-icons/io";

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: "transparent",
    padding: "0",
    borderRadius: "3rem",
    border: "3px solid #899494",
    boxShadow: " 0px 0px 40px #99908f"
  },
  overlay: {
    backgroundColor: "#012c2dc9",
  }
};


function Note_item(props) {

  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note, showAlart } = props;
  // creating a edit note state
  const [notes, setNotes] = useState({ edit_title: "", edit_description: "", edit_tag: "" })

  const onClickDelete = () => {
    deleteNote(note._id);
    showAlart("The Note Is Deleted Successfully !!!");
  }

  // modal part start
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal(e) {
    // for preventing page load
    e.preventDefault();
    editNote(note._id, notes.edit_title, notes.edit_description, notes.edit_tag)
    setIsOpen(false);
    if (notes.edit_title === '' && notes.edit_description === '' && notes.edit_tag === '') showAlart("You Don't Update Anything");
    else if (notes.edit_title !== '' && notes.edit_description === '' && notes.edit_tag === '') showAlart("The Title of The Note Is Updated Successfully");
    else if (notes.edit_title === '' && notes.edit_description !== '' && notes.edit_tag === '') showAlart("The Description of The Note Is Updated Successfully");
    else if (notes.edit_title === '' && notes.edit_description === '' && notes.edit_tag !== '') showAlart("The Tag of The Note Is Updated Successfully");
    else showAlart("The Total Note Is Updated Successfully");
  }
  // modal part end


  const onchnage = (e) => {
    // whatever changes happen that will set to the setNote
    // (...)it is spread operator and (...note) copies all the exhisting value to the note and add new valuse ([e.target.name]: e.target.value)

    setNotes({ ...notes, [e.target.name]: e.target.value });
  }

  // for speaking functionality:--
  const [speak, setSpeak] = useState(true);
  const speakTheDescription = () => {
    let Speak_content = `${note.description} `
    let msg = new SpeechSynthesisUtterance(Speak_content);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[7];
    window.speechSynthesis.speak(msg);
    setSpeak(false);
  }
  const mute_the_speaker = () => {
    window.speechSynthesis.cancel();
    setSpeak(true);
  }

  return (
    <div className='note_container'>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div id="modal">
          <h2>Update Your Note</h2>
          <form action="">
            <input type="text" placeholder='Heading of the note' id='title' name='edit_title' onChange={onchnage} />
            <textarea name="edit_description" id="description" cols="30" rows="10" placeholder='Please Write Something In the Note' onChange={onchnage} ></textarea>
            <input type="text" placeholder='tag' id='tag' name='edit_tag' onChange={onchnage} />
            <input type="submit" value="Update The Note" className='btn' onClick={closeModal} />
          </form>
        </div>
      </Modal>

      {/* actual notes */}
      <div id="top">
        <h2>{note.title}</h2>
        <p>{note.tag}</p>
      </div>
      <div id="down">
        <p>{note.description}</p>
      </div>
      <div id="setting">
        <button onClick={openModal}>Update</button>
        {speak ? <SiTeamspeak size={20} style={{ cursor: "pointer" }} onClick={speakTheDescription} /> : <IoMdVolumeOff size={20} style={{ cursor: "pointer" }} onClick={mute_the_speaker} />}
        <button onClick={onClickDelete}>Delete</button>

      </div>

    </div>
  )
}

export default Note_item
