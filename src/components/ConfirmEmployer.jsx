import React, {useEffect, useState} from 'react'
import { Link, redirect } from 'react-router-dom'


const ConfirmEmployer = () => {
  const [chartData, setChartData] = useState('')

  // const handleClick = () => {
  //       fetch('/api/graph')
  //       .then((data) => data.json())
  //       .then((data) => {
  //         console.log(data)
  //       })

  //   }

    return (
        <div id= 'confirmEmployer'>
            <h3>Please enter your Employer ID:</h3>
        <input type='text' placeholder='Employer ID' />
        <Link to='/graph'>
          <button /*onClick={handleClick}*/ id="confirmSubmit">SUMBIT</button>
        </Link>
        </div>
    )
}

// export default DATA, ConfirmEmployer
export default ConfirmEmployer


