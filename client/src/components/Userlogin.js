import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate,useNavigate } from 'react-router-dom';
function Userlogin(){
    const navigate=useNavigate();
    const handlelog =()=>{
        navigate('/User');
    }
    return(
        <div className="box">
            <h1>CITIZEN</h1>
            <div className="container">

                
                <label>E-mail</label>
                <input/>
                <label>Password</label>
                <input/>
                <button onClick={handlelog}>SUBMIT</button>
                <p>
                    New User? <Link to="/Usersign">Signup</Link>
                </p>
                
            </div>

        </div>
    )

}
export default Userlogin;