// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './User.css';

// const User = () => {
//   const [data, setData] = useState([]);
//   const decSlot = async (SerialNumber) => {
//     try {
//       await fetch(`http://localhost:5000/api/decupdate/${SerialNumber}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const response = await fetch('http://localhost:5000/api/data');
//       const updatedData = await response.json();
//       setData(updatedData);
//       alert("BOOKED SUCCESSFULLY");
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/data');
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Vaccination Centres</h2>
//       <table id='admin-table'>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>LocationName</th>
//             <th>CentreName</th>
//             <th>GovtOrPrivate</th>
//             <th>Address</th>
//             <th>Slot</th>
//             <th>Bookings</th>
//             {/* Add more columns based on your table structure */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.SerialNumber}>
//               <td>{item.SerialNumber}</td>
//               <td>{item.LocationName}</td>
//               <td>{item.CentreName}</td>
//               <td>{item.GovtOrPrivate}</td>
//               <td>{item.Address}</td>
//               <td>{item.slot}</td>
//               <td><button className='slot'onClick={() => decSlot(item.SerialNumber)}>Book</button></td>
//               {/* Add more cells based on your table structure */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';

const User = () => {
  const [data, setData] = useState([]);
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
      alert("BOOKED SUCCESSFULLY");
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
    <div>
      <h2>Vaccination Centres</h2>
      <table id='admin-table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>LocationName</th>
            <th>CentreName</th>
            <th>GovtOrPrivate</th>
            <th>Address</th>
            <th>Slot</th>
            <th>Bookings</th>
            {/* Add more columns based on your table structure */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.SerialNumber}>
              <td>{item.SerialNumber}</td>
              <td>{item.LocationName}</td>
              <td>{item.CentreName}</td>
              <td>{item.GovtOrPrivate}</td>
              <td>{item.Address}</td>
              <td>{item.slot}</td>
              <td><button className='slot'onClick={() => decSlot(item.SerialNumber)}>Book</button></td>
              {/* Add more cells based on your table structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
