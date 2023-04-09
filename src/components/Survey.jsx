import React from 'react'
import { useState } from 'react'


// array to populate questions in survey
const questions = [
  'What is your level of job satisfaction?',
  'Does your manager value your feedback?',
  'Do you feel appreciated and respected at work?',
  'Do you feel connected to your coworkers?'
]


// component to be rendered on page
const Survey = () => {

  const styles = {color:"black"}

  // initalizing state
  const [rating, setRating] = useState([])
  const [employeeID, setEmployeeID] = useState('')
  const [week, setWeek] = useState('')

  // handling choice (rating) changes and updating state
  const updateChoice = (i, value) => {
    const newRatings = [...rating];
    newRatings[i] = value; 
    setRating(newRatings);
  }
  
  // capturing employee ID and updating state
  const updateEmployeeID = (e) => {
    const ID = e.target.value;
    setEmployeeID(ID);
  }

  // capturing week number and updating state
  const updateWeek = (e) => {
    const newWeek = e.target.value;
    setWeek(newWeek);
  }

  // converting user input values (rating) into schema format that DB is expecting
  const data = {}
  for (let i = 0; i < rating.length; i++) {
    data[`question_${i}`] = rating[i];
  }
  data['week'] = week;
  data['employee_ID'] = employeeID;
  
  // handling post request on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  
  const individualQuestion = [];
  for (let i = 0; i < questions.length; i++) {
    individualQuestion.push(
      <div key={`Question_${i}`}> {questions[i]}<br />

        <label htmlFor="{`choice_${i}`}">   1 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 1)} />
        <label htmlFor="{`choice_${i}`}">   2 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 2)} />
        <label htmlFor="{`choice_${i}`}">   3 </label>
        <input type="radio" name={`choice_${i}`} onChange={()=> updateChoice(i, 3)} /> 
        <label htmlFor="{`choice_${i}`}">   4 </label>
        <input type="radio" name={`choice_${i}`} onChange={()=> updateChoice(i, 4)} /> 
        <label htmlFor="{`choice_${i}`}">   5 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 5)} /> 
        
      </div >);
  };


  return (

    <div id='survey'>
    <h3>Please complete the following survey:</h3>
    <form style={styles} onSubmit={handleSubmit}>

      <label htmlFor="week">Week:</label>
      <select name="week" onChange={updateWeek}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select><br /><br />
      <input type="text" id="employeeId" placeholder="Please enter Employee ID" onChange={updateEmployeeID} />
      <p id="SurveyDescription">Please select a rating to answer each question, where 1 is the lowest and 5 is the highest.</p>
      <label className="questions">
        {individualQuestion}
      </label><br />
      <input id="surveySubmitButton" type="submit" value="SUBMIT" />

    </form>
    </div>

  );
}

export default Survey;




/*
Current Bugs:
  - The onSubmit Functionality: It sometimes console logs what we want. Other times, there is no console log. 
  - Getting createRoot error (may have something to do with index.js)
  - theres a weird /? and in the console a weird 8080/ws
*/



    // {
    //   week: 1,
    //   employee_id: 0,
    //   question_0: 1,
    //   question_1: 1,
    //   question_2: 1
    // }



