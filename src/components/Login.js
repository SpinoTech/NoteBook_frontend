import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import Loder from './Loder';


export default function Login(props) {
    // importing the alert component through the props
    const { showAlart } = props;
    // useNavigation is a hook which gives access to navigation object.
    let history = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [loding, setLoading] = useState(false);

    const handleClickSubmit = async (e) => {

        e.preventDefault();
        // api call
        setLoading(true);
        const responce = await fetch(`https://spinotech-notebook-backend2.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        });
        const json = await responce.json();
        setLoading(false);
        // console.log(json);
        if (json.success) {
            showAlart("you are now successfully loggedin !!!");
            //save the auth token to localstorage and redirect
            localStorage.setItem('token', json.authentication_token);
            // navigating to the home page using useNavigate hook of react
            history("/");

        }
        else {
            // alert("invalid ");
            showAlart("invalid email or password");
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
                        <h2> Log In </h2>

                        <form onSubmit={handleClickSubmit}>
                            <input type="email" required placeholder='enter your email' id='email' name='email' value={data.email} onChange={onchange} />
                            <input type="password" required placeholder='enter your password' id='password' name='password' value={data.password} onChange={onchange} />
                            <input type="submit" placeholder='submit' id='btn' value={data.email.indexOf('gmail.com') === -1 ? "write email" : data.password.length <= 8 ? "Write Password" : "Log In"} disabled={data.password.length <= 8} />
                        </form>
                    </div>
            }
        </div>
    )
}
