import React,
{
 useState
} from "react";

import axios
from "axios";

import {
 Link,
 useNavigate
} from "react-router-dom";

function Login() {

 const navigate =
 useNavigate();

 const [email,
 setEmail] =
 useState("");

 const [password,
 setPassword] =
 useState("");

 const loginUser =
 async () => {

 try {

 const data = {
  email,
  password
 };

 const response =
 await axios.post(

 "http://https://nba-accreditation-system-production.up.railway.app/login",

 data
 );

 /* CHECK LOGIN */

 if(
 response.data.message
 === "Login Success"
 ){

  alert(
   "Login Success"
  );

  navigate(
   "/dashboard"
  );

 }

 else {

  alert(
   "Invalid Email or Password"
  );

 }

 }

 catch(error){

 console.log(error);

 alert(
 "Login Failed"
 );

 }

 };

 return (

 <div className="login-page">

 <div className="login-box">

 <h1>Login</h1>

 <input
 type="email"
 placeholder="Enter Email"
 value={email}

 onChange={(e)=>
 setEmail(
 e.target.value
 )}
 />

 <input
 type="password"
 placeholder="Enter Password"
 value={password}

 onChange={(e)=>
 setPassword(
 e.target.value
 )}
 />

 <button
 onClick={
 loginUser
 }
 >
 Login
 </button>

 <p>

 Don't have account?

 <Link to="/register">
 Register
 </Link>

 </p>

 </div>

 </div>
 );
}

export default Login;