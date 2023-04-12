import React from 'react'
import { Link } from 'react-router-dom'


const ConfirmEmployer = ({ username, password }) => {

    return (
    
        <div id= 'confirmEmployer'>
            <h1>Hello {username} </h1>
            <h3>Please enter your Employer ID:</h3>
        <input type='text' placeholder='Employer ID' />
        <Link to='/graph'>
          <button /*onClick={handleClick}*/ id="confirmSubmit">SUMBIT</button>
        </Link>
        </div>
    )
}

export default ConfirmEmployer


