import axios from "axios";
import { useState } from "react"
import "./register.css"

export default function Register() {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [email, setEmail]=useState("");
  const [error, setError]=useState(false);
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false);
    try{
    const res=await axios.post("/auth/register",{
      username,
      password,
      email,
    });     
    res.data && window.location.replace("/login");
  } catch (err){ 
    setError(true);
   }
  };
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." 
        onChange={e=>setUsername(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
        onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." 
        onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton" type="submit">Register</button>
      </form> 
        <button className="registerLoginButton">Login</button>
        {error && <span style={{color:"red", marginTop:"10px", fontSize:"20px",
        paddingLeft:"10px"
      }}>Span something went wrong!!!</span>}
    </div>
    )
}
