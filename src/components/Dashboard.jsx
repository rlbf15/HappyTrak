import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmEmployer from './ConfirmEmployer';
import '../style.css'

export default function Dashboard() {
  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [employeeToken, setEmployeeToken] = useState('abc');
  const [employerToken, setEmployerToken] = useState('zzz');

  const navigate = useNavigate();

  //this is to fetch a create account password for a new employee to create an account. otherwise, anyone can create an account to log into 
  useEffect(() => {
    fetch('http://localhost:3000/getToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployeeToken(data.employeeToken);
        setEmployerToken(data.employerToken);
      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user:' + err });
      });
  }, []);

  function tokenCheck() {
    if (type === 'employee' && employeeToken === inputToken) {
      return {nav: navigate('/Survey')};
    } else if (type === 'employer' && employerToken === inputToken) {
      return {nav: navigate('/ConfirmEmployer')};
    } else {
      return false; 
    }
  }

  function registerUser(event) {
    const tokenData = tokenCheck()
    if (!tokenData) return console.log('please enter the corret token:')
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        type: type
      }),
    })
      .then((response) => {
        console.log("successfully created an account!");
        tokenData.nav

      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user' });
      });
  }


  function authenticateUser(event) {
    event.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        type
      }),
    })

      .then((data) => data.json())
      .then((response) => {
        console.log('inside authenticate user response')
        // if (response.ok) {
        if (response.type === 'employee') {
          navigate('/survey');
        } else {
          navigate('/confirmEmployer');
        }
        // } else {
        //   throw new Error('Error authenticating user');
        // }
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  }


  return (
    <div className='mainButtons'>
      <section id='dashboardMessage'>
        <h1 className='fade-in-1'>WELCOME</h1> <h1 className='fade-in-2'>TO</h1> <h1 className='fade-in-3'>HAPPYTRAK!</h1>
      </section>
      
      <form className='create-login' onSubmit={registerUser}>
        <h4>Create Account</h4>

        <label value='inputToken'><br />Enter Token<br /> </label>
        <input
          id='inputToken'
          name='inputToken'
          type='text'
          onChange={(e) => setInputToken(e.target.value)}
        />
        <label value='username'><br />Enter Email<br /></label>
        <input
          id='username'
          name='username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label value='password'><br />Create password<br /></label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <label>
            Employee
            <input
              type='radio'
              name='type'
              value='employee'
              onChange={(e) => setType(e.target.value)}
              checked={type === 'employee'}
            />
          </label>
          <label>
            Employer
            <input
              type='radio'
              name='type'
              value='employer'
              onChange={(e) => setType(e.target.value)}
              checked={type === 'employer'}
            />
          </label>
        </div>
        <input className='submit' type='submit' value='Create Account' />
      </form>

      <form className='create-login' onSubmit={authenticateUser}>
        <h4>Account Login</h4>
        <label value='username'><br />Enter Email<br /></label>
        <input
          id='username'
          name='username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label value='password'><br />Enter password<br /></label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className='submit' type='submit' value='Login' />
      </form>
      {/* <ConfirmEmployer username={'Akeem'}/> */}


    </div>
  );
}




// <Routes>
// <Route path='/survey' element={<Survey/> }/>
// <Route path='/confirmEmployer'  /> } /> 
// </Routes>


        // if (type === 'employee' && employeeToken === inputToken) {
        //   navigate('/Survey');
        // } else if (type === 'employer' && employerToken === inputToken) {
        //   navigate('/ConfirmEmployer');
        // } else {
        //   console.log('please enter the corret token');
        // }