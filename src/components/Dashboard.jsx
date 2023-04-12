import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createToken, setCreateToken] = useState('abc');
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch('/getToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCreateToken(data.token);
      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user' });
      });
  }, []);
  

  function registerUser(event) {
    if (event.target.createToken.value === createToken) {
      event.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        type: type,
      }),
    })
      .then(() => {
        if (type === 'employee') {
          navigate('/survey');
        } else {
          navigate('/confirmEmployer');
        }
      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user' });
      });
    } else {
      console.log('this ain\'t right');
    }
    
  }


  function authenticateUser(event) {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        type,
      }),
    })
      .then((response) => {
        if (response.ok) {
          if (type === 'employee') {
            navigate('/survey');
          } else {
            navigate('/confirmEmployer');
          }
        } else {
          throw new Error('Error authenticating user');
        }
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  }


  return (
    <div className='mainButtons'>
      <section id='dashboardMessage'>
        <h1>WELCOME</h1>
        <h2>to HappyTrak!</h2>
      </section>
      <form className='create-login' onSubmit={registerUser}>
        {/* form content */}
        <label value='createToken'>Enter Create Account Token<br/> </label>
        <input
          id='createToken'
          name='createToken'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label value='username'><br/>Create username<br/></label>
        <input
          id='username'
          name='username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label value='password'><br/>Create password<br/></label>
        <input
          id='password'
          name='password'
          type='text'
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
        {/* form content */}
        <label value='username'><br/>Enter username<br/></label>
        <input
          id='username'
          name='username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label value='password'><br/>Enter password<br/></label>
        <input
          id='password'
          name='password'
          type='text'
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
        <input className='submit' type='submit' value='Login' />
      </form>
    </div>
  );
}




{/* <h4><i>Select your role:</i></h4> 
<Link to='/survey' style={{ textDecoration: 'none' }}> 
<button id="emp_button">EMPLOYEE</button> 
</Link><br/>
<Link to='/confirmEmployer' style={{ textDecoration: 'none' }}> 
<button id="emp_button" >EMPLOYER</button> 
</Link>  */}