import React, { useEffect, useState } from 'react'


export const EmployeesList = () => {
  const [employees, setEmployees] = useState([]); 
  const [weekOneResponders, setWeekOneResponders] = useState([]); 
  const [weekTwoResponders, setWeekTwoResponders] = useState([]); 
  const [weekThreeResponders, setWeekThreeResponders] = useState([]); 
  const [weekFourResponders, setWeekFourResponders] = useState([]); 

  console.log('this is before fectch')

  useEffect(() => {
    fetch('/api/employees')
  .then((data) => data.json())
  .then((employees) => {
    const allEmployees = []; 
    const weekOneRespondersArr = []; 
    const weekTwoRespondersArr = []; 
    const weekThreeRespondersArr = []; 
    const weekFourRespondersArr = []; 
    console.log('I am inside fetch') 

    for (let i = 0; i < employees.length; i++) {
      allEmployees.push(employees[i].name);

        if (employees[i].took_survey) {
          if (employees[i].week_id === 1) {
            weekOneRespondersArr.push(employees[i].name);
          }
          else if (employees[i].week_id === 2) {
            weekTwoRespondersArr.push(employees[i].name)
          }
          else if (employees[i].week_id === 3) {
            weekThreeRespondersArr.push(employees[i].name)
          }
          else if (employees[i].week_id === 4) {
            weekFourRespondersArr.push(employees[i].name)
          }
        }
    }

    //filter a unique set of employees because they will be repeated on the data bale. Create a variable that filters the employees name 
    //pass that variable to setEmployees 
    console.log('looking for all employees', allEmployees); 

    setEmployees(allEmployees); 
    setWeekOneResponders(weekOneRespondersArr);
    setWeekTwoResponders(weekTwoRespondersArr);
    setWeekThreeResponders(weekThreeRespondersArr);
    setWeekFourResponders(weekFourRespondersArr);
  })
  }, []);
  console.log('looking for employees', employees); 

  return (
    <div id='displayNames'>
      <div>
        <h1>List of all employees</h1>
        <ul>
        {employees.map((employee, index) =>  <li key={index}>{employee}</li>)}
        </ul>
      </div>
      <div>
        <h1>Employees who have responded</h1>
        <h2>Week One</h2>
        <ul>
        {weekOneResponders.map((responder, index) =>  <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Two</h2>
        <ul>
        {weekTwoResponders.map((responder, index) =>  <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Three</h2>
        <ul>
        {weekThreeResponders.map((responder, index) =>  <li key={index}>{responder}</li>)}
        </ul>
        <h2>Week Four</h2>
        <ul>
        {weekFourResponders.map((responder, index) =>  <li key={index}>{responder}</li>)}
        </ul>
      </div>
    </div>
  )
}