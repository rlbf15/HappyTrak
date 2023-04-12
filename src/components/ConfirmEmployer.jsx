import React from 'react'
import { Link } from 'react-router-dom'


const ConfirmEmployer = ({ username, password }) => {


  function changeToken(event) {
    event.preventDefault();
    fetch('http://localhost:3000/postToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeToken: username,
        employerToken: password
      }),
    })
      .then((response) => {
        if (type === 'employee' && employeeToken === inputToken) {
          navigate('/Survey');
        } else if (type === 'employer' && employerToken === inputToken) {
          navigate('/ConfirmEmployer');
        } else {
          console.log('please enter the corret token');
        }
      })
      .catch((err) => {
        console.log({ err: 'Error authenticating user' });
      });
  }



    return (

        <div className='mainButtons'>
            <h1>Hello {username} </h1>

            <Link to='/graph'>
                <button id="confirmSubmit">View Graph</button>
            </Link>
            <form className='create-login' onSubmit={changeToken}>

                <label value='employeeToken'>Change Employee Token<br /> </label>
                <input
                id='employeeToken'
                name='employeeToken'
                type='text'
                onChange={(e) => changeToken(e.target.value)}
                />
                <label value='username'><br />submit<br /></label>
        
                <input className='submit' type='submit' value='employeeToken' />
            </form>
        </div>
        
    )
}

export default ConfirmEmployer


