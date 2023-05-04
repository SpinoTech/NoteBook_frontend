import './App.css';
import {useState} from 'react';
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/notes/noteState.js";
import {
  Routes,
  Route
} from "react-router-dom";
// import Alart from './components/Alart';
import Login from './components/Login';
import Signup from './components/Signup';
import Alart  from './components/Alart';
// import Particle from './components/Particle';

function App() {
   // for alert component
   const [alart, setAlart] = useState(null);
   const showAlart=(massege)=>{
     setAlart(massege);
     setTimeout(() => {
       setAlart(null);
     }, 1600);
   };

  return (
    <>
    {/* <Particle/> */}
    <NoteState>

    <Navbar/>
    <Alart alart={alart}/> 
    <Routes>
    <Route exact path='/' element={<Home showAlart={showAlart}/>} />
    <Route exact path='/about' element={<About/>} />
    <Route exact path='/login' element={<Login showAlart={showAlart}/>}/>
    <Route exact path='/signup' element={<Signup showAlart={showAlart}/>}/>
    </Routes>

    </NoteState>
    </>
  );
}

export default App;
