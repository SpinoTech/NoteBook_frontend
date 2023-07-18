import React, { useState } from 'react';
import "./Login.css";
import Loder from './Loder';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const { showAlart } = props;
  let history = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "", confirm_password: "" });
  const [loding, setLoading] = useState(false);

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (data.confirm_password !== data.password) showAlart("confirmed password is not same as the password");
    else {
      setLoading(true);
      // api call
      const responce = await fetch(`https://spinotech-notebook-backend2.onrender.com/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
      });
      const json = await responce.json();
      setLoading(false);
      // console.log(json);
      if (json.success) {
        //save the auth token to localstorage and redirect
        localStorage.setItem('token', json.authentication_token);
        // navigating to the home page using useNavigate hook of react
        showAlart("You Are Now Successfully Signed Up !!!");
        history("/");
      }
      else {
        showAlart("the user is already exhists");
      }
    }
  }

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <div id='login_body'>
       {/* for background animation */}
       <div class="blue-orbit leo">
            </div>

            <div class="green-orbit leo">
            </div>

            <div class="red-orbit leo">
            </div>

            <div class="white-orbit w1 leo">
            </div><div class="white-orbit w2 leo">
            </div><div class="white-orbit w3 leo">
            </div>
            
      {
        loding === true ? <Loder /> :

          <div className="from_body">
            <h2> Sign Up </h2>
            <form onSubmit={handleClickSubmit}>
              <input type="text" required placeholder='enter your name' id='name' name='name' value={data.name} onChange={onchange} />
              <input type="email" required placeholder='enter your email' id='email' name='email' value={data.email} onChange={onchange} />
              <input type="password" required placeholder='enter your password' id='password' name='password' value={data.password} onChange={onchange} minLength={8} />
              <input type="password" required placeholder='confirm your password' id='confirm_password' name='confirm_password' value={data.confirm_password} onChange={onchange} minLength={8} />
              <input disabled={data.name.length <= 3 || data.email.indexOf('gmail.com') === -1 || data.password.length <= 8} type="submit" placeholder='submit' id='btn' value={data.name.length <= 3 ? "Write Name" : data.email.indexOf('gmail.com') === -1 ? "Write email" : data.password.length <= 8 ? "Write Password" : "Sign Up"} />
            </form>
          </div>
      }
    </div>
  )
}
