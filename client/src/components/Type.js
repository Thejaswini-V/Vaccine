import React from "react";
import { useNavigate } from 'react-router-dom';
import App from "../App";

import './Type.css'

const Type = () => {
    const navigate=useNavigate();
    const handleadmin=()=>{
        navigate('/AdminLogin')
    }
    const handleuser=()=>{
        navigate('/Userlogin')
    }
  return (
    <div className="box">
      <div className="logo">
        
        <h1>IMMUNOSPHERE</h1>
      </div>
      <div className="container">
        <h2>CHOOSE YOUR IDENTITY</h2>
        <button onClick={handleadmin}>ADMINISTRATOR</button>
        <button onClick={handleuser}>CITIZEN</button>
      </div>
    </div>
  );
};

export default Type;
