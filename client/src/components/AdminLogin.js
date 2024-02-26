import React, { useState } from 'react';
import { Routes, Route,Navigate,useNavigate } from 'react-router-dom';
import './Login.css';
import Adminpg from './Adminpg';

function AdminLogin(){
    const navigate=useNavigate();
    const [email,setemail]=useState('');
    const[password,setpassword]=useState('');

    const handleinput=(e)=>{
        const id=e.target.id;
        const value=e.target.value;
        if(id==='email'){
            setemail(value);
        }
        if(id==='password'){
            setpassword(value);
        }

    }
    const handlelog = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/AdminLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            const { token } = await response.json();
            navigate('/Adminpg');
          } else {
            // Handle authentication failure
            const errorText = await response.text();
            alert('INVALID')
            console.error('Authentication failed',errorText);
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      };
    return(
        <div className="box">
            <h1>ADMINISTRATOR</h1>
            <div className="container">
                <label>E-mail</label>
                <input id='email'onChange={handleinput}/>
                <label>Password</label>
                <input id='password' onChange={handleinput}/>
                <button onClick={handlelog} >SUBMIT</button>
            </div>

        </div>
    )

}
export default AdminLogin;