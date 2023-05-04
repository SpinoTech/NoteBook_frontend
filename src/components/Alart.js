import React from 'react'
import "./Alart.css";
const Alart = (props) => {
  const myFun=()=>{
    const doc=document.getElementById("alBody");
    doc.style.display="none";
  }

  // setTimeout(() => {
  //   const doc=document.getElementById("alBody");
  //   doc.style.display="none";
  // }, 1500);

  return (
   props.alart && <div id="alBody">
      {/* <h2>{props.color}</h2> */}
       <p>{props.alart}</p>
       <button onClick={myFun}>X</button>
    </div>
  )
}

export default Alart
