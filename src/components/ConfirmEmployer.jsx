import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quotes } from '../../server/models/quotes/quotes'

const ConfirmEmployer = ({ username, password }) => {
  const [users, setUsers] = useState([]);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [quote, setQuote] = useState('')
  const [employeeToken, setEmployeeToken] = useState('');
  const [employerToken, setEmployerToken] = useState('');

  useEffect(() => {
    const quotes = Quotes
    const randomIndex = Math.floor((Math.random() * quotes.length));
    const qOfTheDay = quotes[randomIndex];
    setQuote(qOfTheDay)
  }, []);

  // FUNCTION TO CHANGE STATE OF FETCHCOUNTER
  const incrementCounter = () => {
    setFetchCounter(fetchCounter + 1);
  }

  useEffect(() => {
    fetch('http://localhost:3000/getUsers')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log({ err: 'Error fetching users' });
      });
  }, [fetchCounter]);

  function changeToken(event, tokenType) {
    event.preventDefault();
    const inputToken = tokenType === 'employee' ? employeeToken : employerToken;
    fetch('http://localhost:3000/updateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: tokenType,
        token: inputToken,
      }),
    })
      .then((response) => {
        console.log('Token was Added!');
      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user: ' + err });
      });
  }



  function deleteUser(user) {
    fetch(`http://localhost:3000/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response or UI update after deleting user
        console.log('User deleted successfully:', data);
        incrementCounter()
      })
      .catch((err) => {
        console.log({ err: 'Error deleting user' });
      });
  }

  return (

    <div className='confirmContainer'>
      <div className='quote-header'>
        {quote}
      </div>
      {/* Display users fetched from the database */}
      <div id='change-token' className='create-login'>
        <h1 className='userlist'>Current Users:</h1>
        <ul>
          {users.map((user) => (
            <li key={user}>
              {user}
              <button className='deleteUser' onClick={() => deleteUser(user)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div id='graph' className='create-login'>
        {/* Link to graph page */}
        <Link id='graph' to='/graph'>
          <button id='confirmSubmit'>View Graph</button>
        </Link>
      </div>


      <div id='change-token'>
        {/* Change employee token form */}
        <form className='create-login' onSubmit={(e) => changeToken(e, 'employee')}>
          <h1>Hello {username} </h1>
          <label htmlFor='employeeToken'>Change Employee Token<br /> </label>
          <input id='employeeToken' value={employeeToken} name='employeeToken' type='text' onChange={(e) => setEmployeeToken(e.target.value)} />
          <input className='submit' type='submit' value='Submit' />
        </form >

        {/* Change employer token form */}
        <form className='create-login' onSubmit={(e) => changeToken(e, 'employer')}>
          <label htmlFor='employerToken'>Change Employer Token<br /> </label>
          <input id='employerToken' value={employerToken} name='employerToken' type='text' onChange={(e) => setEmployerToken(e.target.value)} />
          <input className='submit' type='submit' value='Submit' />
        </form>
      </div>


    </div>
  );
};

export default ConfirmEmployer;


