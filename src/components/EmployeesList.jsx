import React, { useEffect, useState } from 'react'

export const EmployeesList = () => {
  const [employees, setEmployees] = useState([]); 
  const [weekOneResponders, setWeekOneResponders] = useState([]); 
  const [weekTwoResponders, setWeekTwoResponders] = useState([]); 
  const [weekThreeResponders, setWeekThreeResponders] = useState([]); 
  const [weekFourResponders, setWeekFourResponders] = useState([]); 

  const [weekOneNonResponders, setWeekOneNonResponders] = useState([]); 
  const [weekTwoNonResponders, setWeekTwoNonResponders] = useState([]); 
  const [weekThreeNonResponders, setWeekThreeNonResponders] = useState([]); 
  const [weekFourNonResponders, setWeekFourNonResponders] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3000/api/employees')
  .then((data) => data.json())
  .then((newData) => {
    const allEmployees = []; 
    const weekOneRespondersArr = []; 
    const weekTwoRespondersArr = []; 
    const weekThreeRespondersArr = []; 
    const weekFourRespondersArr = []; 

    for (let i = 0; i < newData.length; i++) {
      allEmployees.push(newData[i].employee_name);

      if (newData[i].week_id === 1) {
        weekOneRespondersArr.push(newData[i].employee_name);
      }
      else if (newData[i].week_id === 2) {
        weekTwoRespondersArr.push(newData[i].employee_name)
      }
      else if (newData[i].week_id === 3) {
        weekThreeRespondersArr.push(newData[i].employee_name)
      }
      else if (newData[i].week_id === 4) {
        weekFourRespondersArr.push(newData[i].employee_name)
      }  
    }

    const noResponderForWeekOne = allEmployees.filter(person => !weekOneRespondersArr.includes(person)); 
    const noResponderForWeekTwo = allEmployees.filter(person => !weekTwoRespondersArr.includes(person));
    const noResponderForWeekThree = allEmployees.filter(person => !weekThreeRespondersArr.includes(person));
    const noResponderForWeekFour = allEmployees.filter(person => !weekFourRespondersArr.includes(person));

    setEmployees(allEmployees);
    setWeekOneResponders(weekOneRespondersArr);
    setWeekTwoResponders(weekTwoRespondersArr);
    setWeekThreeResponders(weekThreeRespondersArr);
    setWeekFourResponders(weekFourRespondersArr);

    setWeekOneNonResponders(noResponderForWeekOne);
    setWeekTwoNonResponders(noResponderForWeekTwo);
    setWeekThreeNonResponders(noResponderForWeekThree);
    setWeekFourNonResponders(noResponderForWeekFour);
  })
  }, []);

  return (
  <div id='displayNames'>
      <div className='allEmployees'>
        <h1>List of all employees</h1>
        <ul>
          {employees.map((employee, index) => <li key={index}>{employee}</li>)}
        </ul>
      </div>
      <div className='responders'>
        <h1>Employees who have responded</h1>
        <h2>Week One</h2>
        <ul>
          {weekOneResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Two</h2>
        <ul>
          {weekTwoResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Three</h2>
        <ul>
          {weekThreeResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Four</h2>
        <ul>
          {weekFourResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
      </div>
      <div className='nonResponders'>
        <h1>Employees who have not responded</h1>
        <h2>Week One</h2>
        <ul>
          {weekOneNonResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Two</h2>
        <ul>
          {weekTwoNonResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Three</h2>
        <ul>
          {weekThreeNonResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Four</h2>
        <ul>
          {weekFourNonResponders.map((responder, index) => <li key={index}>{responder}</li>)}
        </ul>
      </div>
    </div>
  )
}