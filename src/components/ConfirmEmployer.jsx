import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

const handleClick = () => {
      fetch('/api/graph')
      .then((data) => data.json())
      .then((data) => {
        console.log('sdlfjdkls', data);
        // res.locals.graph = data;
      })
  }

const ConfirmEmployer = () => {

    return (
        <div id= 'confirmEmployer'>
            <h3>Please enter your Employer ID:</h3>
        <input type='text' placeholder='Employer ID' />
        <Link to='/graph'>
          <button onClick={()=>handleClick()} id="confirmSubmit">SUBMIT</button>
        </Link>
        </div>
    )
}

export default ConfirmEmployer