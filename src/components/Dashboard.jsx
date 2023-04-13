import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
		<div className='mainButtons'>
      <section id= 'dashboardMessage'> 
        <h1> WELCOME</h1>
          <h2>to HappyTrak!</h2>
          <h4>Select your role:</h4>
      </section>
      <Link to='/survey' style={{ textDecoration: 'none' }}> 
        <button id="emp_button">EMPLOYEE</button> 
      </Link><br/>
      <Link to='/confirmEmployer' style={{ textDecoration: 'none' }}> 
        <button id="emp_button" >EMPLOYER</button> 
      </Link>
		</div>

    )
}

export default Dashboard;