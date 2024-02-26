// Adminpg.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Adminpg.css';

const Adminpg = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to track form visibility
  const [newCentre, setNewCentre] = useState({
    LocationName: '',
    CentreName: '',
    GovtOrPrivate: '', // Changed to dropdown value
    Address: '',
    Slot: 0,
  });

  const incSlot = async (SerialNumber) => {
    try {
      await fetch(`http://localhost:5000/api/update/${SerialNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch('http://localhost:5000/api/data');
      const updatedData = await response.json();
      setData(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  const decSlot = async (SerialNumber) => {
    try {
      await fetch(`http://localhost:5000/api/decupdate/${SerialNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch('http://localhost:5000/api/data');
      const updatedData = await response.json();
      setData(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  const delSlot = async (SerialNumber) => {
    try {
      await fetch(`http://localhost:5000/api/delupdate/${SerialNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch('http://localhost:5000/api/data');
      const updatedData = await response.json();
      setData(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  const addNewCentre = async () => {
    try {
      await fetch('http://localhost:5000/api/addcentre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCentre),
      });

      const response = await fetch('http://localhost:5000/api/data');
      const updatedData = await response.json();
      setData(updatedData);
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error adding new centre:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const updatedData =response.data.map((item, index) => ({
          ...item,
          SerialNumber: index + 1,
        }));
  
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='admin-container'>
      <h2>Vaccination Centres</h2>
      <button className='addnew' onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Add new'}
      </button>

      {showForm && (
        <div className='form-container'>
          <label>Location Name:</label>
          <input
            type="text"
            name="LocationName"
            value={newCentre.LocationName}
            onChange={(e) => setNewCentre({ ...newCentre, LocationName: e.target.value })}
          />

          <label>Centre Name:</label>
          <input
            type="text"
            name="CentreName"
            value={newCentre.CentreName}
            onChange={(e) => setNewCentre({ ...newCentre, CentreName: e.target.value })}
          />

          <label>Govt or Private:</label>
          <select
            name="GovtOrPrivate"
            value={newCentre.GovtOrPrivate}
            onChange={(e) => setNewCentre({ ...newCentre, GovtOrPrivate: e.target.value })}
            className="form-dropdown"
          >
            <option value="">Select</option>
            <option value="Govt">Govt</option>
            <option value="Private">Private</option>
          </select>

          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={newCentre.Address}
            onChange={(e) => setNewCentre({ ...newCentre, Address: e.target.value })}
          />

          <label>Slot:</label>
          <input
            type="number"
            name="Slot"
            value={newCentre.Slot}
            onChange={(e) => setNewCentre({ ...newCentre, Slot: e.target.value })}
          />

          <button type="button" id='addnew' onClick={addNewCentre}>
            Add Centre
          </button>
        </div>
      )}

      <table id='admin-table'>
        <thead>
          <tr>
            <th>LocationName</th>
            <th>CentreName</th>
            <th>GovtOrPrivate</th>
            <th>Address</th>
            <th>Slot</th>
            <th>Del Centre</th>
            <th>Add Slots</th>
            <th>Rem Slots</th>
            {/* Add more columns based on your table structure */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.SerialNumber}>
              <td>{item.LocationName}</td>
              <td>{item.CentreName}</td>
              <td>{item.GovtOrPrivate}</td>
              <td>{item.Address}</td>
              <td>{item.slot}</td>
              <td><button className='del' onClick={() => delSlot(item.SerialNumber)}>Delete</button></td>
              <td><button className='slot' onClick={() => incSlot(item.SerialNumber)}>+</button></td>
              <td><button className='slot' onClick={() => decSlot(item.SerialNumber)}>-</button></td>
              {/* Add more cells based on your table structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminpg;
