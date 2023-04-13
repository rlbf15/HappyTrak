import React from 'react'
import { useState } from 'react'


// array to populate questions in survey
const questions = [
  'Do you feel welcome at the company?',
  'Does your manager value your feedback?',
  'Do you feel appreciated and respected at work?',
  'Do you feel connected to your coworkers?',
  'What is your favorite number between 1 and 5?'
]


// component to be rendered on page
const Survey = () => {


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
    setSurveyData({ ...surveyData, week: Number(newWeek) });
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
    fetch('http://localhost:3000/sendSurvey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyData)
    })
      .then((res) => res.json())
      .then(() => window.alert('Thank you for your submission!'));
  }


  const individualQuestion = [];
  for (let i = 1; i <= questions.length; i++) {
    individualQuestion.push(
      <div key={`Question_${i}`}> {questions[i - 1]}<br />

        <label htmlFor="{`choice_${i}`}">   1 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(1, `q${i}`)} />
        <label htmlFor="{`choice_${i}`}">   2 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(2, `q${i}`)} />
        <label htmlFor="{`choice_${i}`}">   3 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(3, `q${i}`)} />
        <label htmlFor="{`choice_${i}`}">   4 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(4, `q${i}`)} />
        <label htmlFor="{`choice_${i}`}">   5 </label>
        <input type="radio" name={`choice_${i}`} onChange={() => updateChoice(5, `q${i}`)} />
        <br />
        <br />
      </div >);
  };


  return (

    <div id='survey'>
      <div id='surveyHeader'>
      <h3><i>Please complete the following survey:</i></h3>
      </div>
      <form id='survey-box' onSubmit={handleSubmit}>

        <div className="weekEmployeeId">
          <label className="week" htmlFor="week">Week:</label>
          <select name="week" onChange={updateWeek}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select><br /><br />
        </div>

        <p id="surveyDescription"><b>Please select a rating to answer each question, where 1 is the lowest and 5 is the highest.</b></p>
        <label className="questions">
          {individualQuestion}
        </label><br />
        <input id="surveySubmitButton" type="submit" value="SUBMIT" />
      </form>
    </div>

  );
}

export default Survey;



