import React,
{
 useState
} from "react";

import axios
from "axios";

import {
 useNavigate,
 Link
} from "react-router-dom";

function Register() {

 const navigate =
 useNavigate();

 const [name,
 setName] =
 useState("");

 const [email,
 setEmail] =
 useState("");

 const [password,
 setPassword] =
 useState("");

 const registerUser =
 async () => {

  try {

   const data = {
    name,
    email,
    password
   };

   const response =
   await axios.post(

   "http://https://nba-accreditation-system-production.up.railway.app/register",

   data

   );

   alert(
    response.data.message
   );

   setName("");
   setEmail("");
   setPassword("");

   navigate("/");

  }

  catch(error){

   console.log(error);

   alert(
    "Registration Failed"
   );
  }
 };

 return (

 <div
 className="register-page"
 >

 <div
 className="register-box"
 >

 <h1>
 Register
 </h1>

 <input
 type="text"
 placeholder="Enter Name"
 value={name}

 onChange={(e)=>
 setName(
 e.target.value
 )}
 />

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
 registerUser
 }
 >
 Register
 </button>

 <p>

 Already have account?

 <Link to="/">
 Login
 </Link>

 </p>

 </div>

 </div>
 );
}

export default Register;