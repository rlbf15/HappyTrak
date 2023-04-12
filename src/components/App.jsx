import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Survey from './Survey.jsx'
import ConfirmEmployer from './ConfirmEmployer.jsx'
import Dashboard from './Dashboard.jsx'

// import Chart from "chart.js/auto";
import { useState } from "react";
import { surveyData } from "../utils/Data.js";
import LineChart from './LineChart.jsx';

import '../style.css'



const App = () => {


	const [chartData, setChartData] = useState({
    labels: surveyData.map((data) => data.week_id),
    datasets: [
      {
        label: "Cultural Fit",
        data: surveyData.map((data) =>data.question_0_total)
      },
      {
        label: "Manager Relationships",
        data: surveyData.map((data) => data.question_1_total)
      },
      {
        label: "Employee Validation",
        data: surveyData.map((data) => data.question_2_total)
      },
      {
        label: "Coworker Relationships",
        data: surveyData.map((data) => data.question_3_total)
      },
    ]
  })


    return (
        
		<div className='container'>
			<Routes>
        <Route path='/survey' element={<Survey/> }/>
				<Route path='confirmEmployer/graph' element={<LineChart />}/>
				<Route path='/' element={ <Dashboard /> } />
        <Route path='/confirmEmployer' element={<ConfirmEmployer/> } />
        <Route path='/graph' element={<LineChart /> } />
			</Routes>
		</div>
)
}



export default App;
  
