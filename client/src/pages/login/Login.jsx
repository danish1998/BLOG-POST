import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Action";

export default function Login() {
  const userRef= useRef();
  const passwordRef= useRef();
  const {dispatch, isFetching}=useContext(Context);
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    dispatch(LoginStart);
    try {
      const res= await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value, 
      });
      dispatch(LoginSuccess(res.data))
    } catch (err) {
      dispatch(LoginFailure)
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username..." 
        ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." 
        ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
            <Link className="link" to="/register">
              <button className="loginRegisterButton">Register</button>
            </Link>
    </div>
  );
}
