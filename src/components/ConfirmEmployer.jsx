// import React from 'react'
// import { Link } from 'react-router-dom'


// const ConfirmEmployer = ({ username, password }) => {


//     function changeToken(event, tokenType) {
//         event.preventDefault();
//         const inputToken = event.target.value;
//         fetch('http://localhost:3000/updateToken', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             type: tokenType,
//             token: inputToken,
//           }),
//         })
//           .then((response) => {
//             console.log('Token was Added! : ' + response)
//           })
//           .catch((err) => {
//             console.log({ err: 'Error authenticating user: ' + err });
//           });
//       }



//     return (
//         <div className='mainButtons'>
           
//             <Link to='/graph'>
//                 <button id="confirmSubmit">View Graph</button>
//             </Link>

//             <form className='create-login' onSubmit={changeToken}>
//             <h1>Hello {username} </h1>
//                 <label value='employeeToken'>Change Employee Token<br /> </label>
//                 <input
//                 id='employeeToken'
//                 name='employeeToken'
//                 type='text'
//                 onChange={(e) => changeToken(e, 'employee')}
//                 />
//                 <label value='username'></label>
        
//                 <input className='submit' type='submit' value='submit' />
//             </form>
//             <form className='create-login' onSubmit={changeToken}>
//                 <label value='employerToken'>Change Employeer Token<br /> </label>
//                 <input
//                 id='employerToken'
//                 name='employerToken'
//                 type='text'
//                 onChange={(e) => changeToken(e, 'employer')}
//                 />
//                 <label value='username'></label>
        
//                 <input className='submit' type='submit' value='submit' />
//             </form>
//         </div>

//     )
// }

// export default ConfirmEmployer

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConfirmEmployer = ({ username, password }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getUser')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log({ err: 'Error fetching users' });
      });
  }, []);

  function deleteUser(userId) {
    fetch(`http://localhost:3000/deleteUser/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response or UI update after deleting user
        console.log('User deleted successfully:', data);
      })
      .catch((err) => {
        console.log({ err: 'Error deleting user' });
      });
  }

  return (
    <div className='mainButtons'>
      {/* Display users fetched from the database */}
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{' '}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Link to graph page */}
      <Link to='/graph'>
        <button id='confirmSubmit'>View Graph</button>
      </Link>

      {/* Change employee token form */}
      <form className='create-login' onSubmit={(e) => changeToken(e, 'employee')}>
        <h1>Hello {username} </h1>
        <label htmlFor='employeeToken'>Change Employee Token<br /> </label>
        <input id='employeeToken' name='employeeToken' type='text' />
        <input className='submit' type='submit' value='Submit' />
      </form>

      {/* Change employer token form */}
      <form className='create-login' onSubmit={(e) => changeToken(e, 'employer')}>
        <label htmlFor='employerToken'>Change Employer Token<br /> </label>
        <input id='employerToken' name='employerToken' type='text' />
        <input className='submit' type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default ConfirmEmployer;


