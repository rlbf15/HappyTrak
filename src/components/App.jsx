import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Survey from './Survey.jsx'
import ConfirmEmployer from './ConfirmEmployer.jsx'
import Dashboard from './Dashboard.jsx'

// import Chart from "chart.js/auto";
import { useState , useEffect} from "react"; // ADDED USE EFFECT
//import { surveyData } from "../utils/Data.js";
import LineChart from './LineChart.jsx';

import '../style.css'

const App = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [chartData, setChartData] = useState({});

	// const [chartData, setChartData] = useState({
  //   labels: surveyData.map((data) => data.week_id),
  //   datasets: [
  //     {
  //       label: "Cultural Fit",
  //       data: surveyData.map((data) =>data.question_0_total)
  //     },
  //     {
  //       label: "Manager Relationships",
  //       data: surveyData.map((data) => data.question_1_total)
  //     },
  //     {
  //       label: "Employee Validation",
  //       data: surveyData.map((data) => data.question_2_total)
  //     },
  //     {
  //       label: "Coworker Relationships",
  //       data: surveyData.map((data) => data.question_3_total)
  //     },
  //   ]
  // })

  useEffect(() => {
    // FETCH INFO FROM THE API GRAPH
    fetch("/api/graph")
      .then((response) => response.json()) //response as json
      .then((data) => {
        console.log("data from ",data)
        setSurveyData(data);
        setChartData({
          // sample was missing the mapping of the data in individudal items
          labels: data.map((item) => item.week_id),
          datasets: [
            {
              label: "Cultural Fit",
              data: data.map((item) => item.question_0_total),
            },
            {
              label: "Manager Relationships",
              data: data.map((item) => item.question_1_total),
            },
            {
              label: "Employee Validation",
              data: data.map((item) => item.question_2_total),
            },
            {
              label: "Coworker Relationships",
              data: data.map((item) => item.question_3_total),
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching survey data:", error));
  }, []); // empty array only calls it one time

    return (
        
		<div className='container'>
			<Routes>
        <Route path='/survey' element={<Survey/> }/>
				<Route path='/graph' element={<LineChart chartData={chartData}/>}/>
				<Route path='/' element={ <Dashboard /> } />
        <Route path='/confirmEmployer' element={<ConfirmEmployer /> } />
			</Routes>
		</div>
)
}

export default App;
  

/// ATTEMPT TO PLUG DATA FROM DATABASE TO CHART 

//   const [bool, setBool] = useState(false)
//   let whatever;
//   let chartData;
//   useEffect(() => {
//     fetch('/api/graph')
//       .then((data) => data.json())
//       .then((data) => {
//     console.log('sdlfjdkls', data);
//     whatever = data;
//   })
//     .then(() => {
//       console.log('whateverrrr', whatever)
      
//       chartData = {
//         labels: whatever.map((data) => data.week_id),
//         datasets: [
//           {
//             label: "Employee Satisfaction",
//             data: whatever.map((data) => data.question_0)
//           },
//           {
//             label: "Employee Happiness",
//             data: whatever.map((data) => data.question_2)
//           },
//           {
//             label: "Employee Comfort",
//             data: whatever.map((data) => data.question_1)
//           },
//         ]
//       }
//       setBool(true);
//     })
// }, [])