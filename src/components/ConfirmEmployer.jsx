import React from 'react'
import { Link } from 'react-router-dom'


const ConfirmEmployer = ({ username, password }) => {


    function changeToken(event, tokenType) {
        event.preventDefault();
        const inputToken = event.target.value;
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
            console.log('Token was Added! : ' + response)
          })
          .catch((err) => {
            console.log({ err: 'Error authenticating user: ' + err });
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
                onChange={(e) => changeToken(e, 'employee')}
                />
                <label value='username'></label>
        
                <input className='submit' type='submit' value='submit' />
            </form>
            <form className='create-login' onSubmit={changeToken}>
                <label value='employerToken'>Change Employeer Token<br /> </label>
                <input
                id='employerToken'
                name='employerToken'
                type='text'
                onChange={(e) => changeToken(e, 'employer')}
                />
                <label value='username'></label>
        
                <input className='submit' type='submit' value='submit' />
            </form>
        </div>

    )
}

export default ConfirmEmployer


