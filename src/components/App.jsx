import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Survey from './Survey.jsx'
import ConfirmEmployer from './ConfirmEmployer.jsx'
import Dashboard from './Dashboard.jsx'

import Chart from "chart.js/auto";
import { useState } from "react";
import { surveyData } from "../utils/Data.js";
import LineChart from './LineChart.jsx';

import '../style.css'



const App = () => {
	const [chartData, setChartData] = useState({
		labels: surveyData.map((data) => data.week_id),
    datasets: [
      {
		label: "Employee Satisfaction", 
		data: surveyData.map((data) => data.q1)
      }, 
      {
        label: "Employee Happiness", 
        data: surveyData.map((data) => data.q2)
      },
      {
        label: "Employee Comfort", 
        data: surveyData.map((data) => data.q3)
      },
    ]
	})
    return (
        
		<div className='container'>
			<Routes>
          <Route path='/survey' element={<Survey/> }/>
				<Route path='/graph' element={ <LineChart chartData={chartData}/> }/>
				<Route path='/' element={ <Dashboard /> } />
				<Route path='/confirmEmployer' element={ <ConfirmEmployer /> } />
			</Routes>
		</div>
)
//   render() {
//     return (

//       <BrowserRouter>
// 		<div className='mainButtons'>
//         	<Link to='/survey'> <button>EMPLOYEE</button> </Link>
//         	<Link to='/survey'> <button>EMPLOYER</button> </Link>
// 		</div>
//         <Routes>
//           <Route path='/survey' element={ <QuestionRow/> } />
//         </Routes>
      
//       </BrowserRouter>

//     )
//   }
}



  export default App;