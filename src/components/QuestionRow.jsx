import React, { useState, setCount } from 'react'


///////////////////////////////////////////////////////
////// ARRAY TO POPULATE QUESTIONS IN SURVEY //////////
//////////////////////////////////////////////////////

const questions = [
  'How accomplished do you feel this week?',
  'How supportive is your manager?',
  'How comfortable do you feel about sharing your ideas?'
]

///////////////////////////////////////////////////
////// POST REQUEST WHEN SUBMIT IS CLICKED /////////
///////////////////////////////////////////////////
  
const handleSubmit = (e) => {
  console.log('heeeeellooo')
  console.log('reqbody heree', req.body)
  fetch('/survey', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    // body:JSON.stringify()
  })
  .then(req=> console.log(req.body))
}


const QuestionRow = () => {
  //declaring the state 
  const state = useState({
    question: '', 
    answer: ''
  });
  const value = state[0];
  const setCount = state[]

  const individualQuestion = [];
  for (let i=0; i<questions.length; i++) {
    individualQuestion.push(
      <div key={`Question_${i}`}>{questions[i]}
        <input type="radio" name="choice" value="1" />
        <input type="radio" name="choice" value="2" />
        <input type="radio" name="choice" value="3" />
      </div >);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label className="QuestionRow">
        {individualQuestion}
      </label>
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default QuestionRow;


/*
Current Bugs:
  - The onSubmit Functionality: It sometimes console logs what we want. Other times, there is no console log. 
  - Getting createRoot error (may have something to do with index.js)
  - theres a weird /? and in the console a weird 8080/ws
*/