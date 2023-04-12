import React from 'react'
import { useState } from 'react'


// array to populate questions in survey
const questions = [
  'Do you feel welcome at the company?',
  'Does your manager value your feedback?',
  'Do you feel appreciated and respected at work?',
  'Do you feel connected to your coworkers?'
]


// component to be rendered on page
const Survey = () => {

  const styles = { color: "black" }

  // initalizing state
  const [surveyData, setSurveyData] = useState({
    week: 1,
  })

  // handling choice (rating) changes and updating state
  const updateChoice = (i, question) => {
    setSurveyData({ ...surveyData, [question]: i });
  }

  // capturing employee ID and updating state
  // const updateEmployeeID = (e) => {
  //   const ID = e.target.value;
  //   setEmployeeID(ID);
  // }

  // capturing week number and updating state
  const updateWeek = (e) => {
    const newWeek = e.target.value;
    setSurveyData({ ...surveyData, week: newWeek });
  }

  // converting user input values (rating) into schema format that DB is expecting
  // const data = {}
  // for (let i = 0; i < rating.length; i++) {
  //   data[`question_${i}`] = Number(rating[i]);
  // }
  // data['week'] = Number(week);
  // data['employee_id'] = Number(employeeid);

  // handling post request on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyData)
    })
      .then((res) => res.json())
      .then((value) => window.location = value);
  }


  const individualQuestion = [];
  for (let i = 1; i <= questions.length; i++) {
    individualQuestion.push(
      <div key={`Question_${i}`}> {questions[i]}<br />

        <label htmlFor="{`choice_${i}`}">   1 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 'q1')} />
        <label htmlFor="{`choice_${i}`}">   2 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 'q2')} />
        <label htmlFor="{`choice_${i}`}">   3 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 'q3')} />
        <label htmlFor="{`choice_${i}`}">   4 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 'q4')} />
        <label htmlFor="{`choice_${i}`}">   5 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(i, 'q5')} />
        <br />
        <br />
      </div >);
  };


  return (

    <div id='survey'>
      <h3><i>Please complete the following survey:</i></h3>
      <form id='survey-box' style={styles} onSubmit={handleSubmit}>

        <div className="weekEmployeeId">
          <label className="week" htmlFor="week">Week:</label>
          <select name="week" onChange={updateWeek}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select><br /><br />
          <input type="text" id="employeeId" placeholder="Please enter Employee ID" /*onChange={updateEmployeeID}*/ />
        </div>

        <p id="SurveyDescription"><b>Please select a rating to answer each question, where 1 is the lowest and 5 is the highest.</b></p>
        <label className="questions">
          {individualQuestion}
        </label><br />
        <input id="surveySubmitButton" type="submit" value="SUBMIT" />

      </form>
    </div>

  );
}

export default Survey;



