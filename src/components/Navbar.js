import React, { useState, useContext } from 'react'
import "./Navbar.css";
// importing useLocation hook
import { Link, useLocation, useNavigate } from "react-router-dom";
// import bgvdo from "../documents/bgvdo.jpg";
// Hamburger icon import
import { Spin as Hamburger } from 'hamburger-react';
// importing the context api
import noteContext from "../context/notes/noteContext.js";
// react modal import part is here
import Modal from 'react-modal';
import SearchModal from './SearchModal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: "0",
    borderRadius: "3rem",
    border: "3px solid #899494",
    boxShadow: " 0px 0px 40px #99908f",
    maxHeight: "calc(100vh - 210px)",
    overflowY: "auto",
    background: "transparent"
  },
  overlay: {
    backgroundColor: "#012c2dc9",
  }
};

function Navbar() {
  const history = useNavigate();
  const context = useContext(noteContext);
  const { searchNote } = context;
  // search state making
  const [search, setSearch] = useState({ title: "" });
  // modal state part is here 
  const [modalIsOpen, setIsOpen] = useState(false);

  const searchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const [search_Note, setSearch_Note] = useState(null);

  const OnClickSearch = async (e) => {
    toggleMode();
    // for preventing page load
    e.preventDefault();
    // if the authentication token is present to the local storage then it will give the access else it will redirect to the login page 
    let note = await searchNote(search.title);
    setSearch_Note(note);
    //  opening the modal
    if (localStorage.getItem('token')) setIsOpen(true);
    else setIsOpen(false);


  }

  const PressEnterToSearch = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      // e.preventDefault();
      OnClickSearch(e);
    }
  }
  // closing the modal
  function closeModal() {
    setIsOpen(false);
  }


  // for location of navigation
  let location = useLocation();
  // making responsive
  const [mobile, setMobile] = useState(false);
  const toggleMode = () => {
    // console.log(mobile);
    setMobile(!mobile);
  };

  // for logout part
  const onclickLogout = () => {
    toggleMode();
    localStorage.removeItem('token');
    history('/login');
  }

  return (
    <>
      {/* <video src={bgvdo} autoPlay muted loop className="bgvdo"></video> */}
      <span className="bgimage" no-repeat center cover />
      <nav className='navbody'>
        <div className="left">
          <Link to="/" ><h2>SpinoTech-Notebook</h2></Link>
        </div>

          <div className={ mobile ? "right open_right":"right"}>
            <Link to="/" className={` ${location.pathname === "/" ? "active" : ""}`} onClick={toggleMode}> Home </Link>
            <Link to="/about" className={` ${location.pathname === "/about" ? "active" : ""}`} onClick={toggleMode}> About </Link>
            <div className="search_container">
              <input type="search" placeholder='Title' onChange={searchChange} name="title" onKeyDown={PressEnterToSearch} />
              <input disabled={search.title.length < 5} type="submit" className='btn' value={search.title.length < 5 ? `Searching ${5 - search.title.length}` : "Search"} onClick={OnClickSearch} />
            </div>
            {!localStorage.getItem('token') ?
              <>
                <Link to="/signup" onClick={toggleMode}>sign up</Link>
                <Link to="/login" onClick={toggleMode}>login</Link>
              </>
              :
              <Link onClick={onclickLogout}>Log Out</Link>
            }
          </div>
        

        <div id="toggle" onClick={toggleMode}>
          {mobile ? <Hamburger size={20} /> : <Hamburger size={20} />}
        </div>

        {/* modal part syntax is here */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          {/* heading={search_Note[0].title} description={search_Note[0].description} tag={search_Note[0].tag} */}
          <SearchModal data={search_Note} close={closeModal} />
        </Modal>

      </nav>
    </>
  )
}

export default Navbar
