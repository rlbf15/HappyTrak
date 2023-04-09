import React, { Component } from 'react'
import { useState } from 'react'




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




const QuestionRow = () => {


const handleSubmit = (e) => {
  e.preventDefault();
  console.log('target Value', e.target);
  console.log('rating', rating)
  fetch('/survey', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    // body:JSON.stringify(),
    // {
    //   week: 1,
    //   employee_id: 0,
    //   question_0: 1,
    //   question_1: 1,
    //   question_2: 1
    // }
  })
  .then(req=> console.log('resbody', req.body))
}


  const [q1rating, setq1Rating] = useState('')
  const onOptionChange0 = e => {
    setRating(e.target.value)
  }

  const [q2rating, setq2Rating] = useState('')
  const onOptionChange1 = e => {
    setRating(e.target.value)
  }

  const [q3rating, setq3Rating] = useState('')
  const onOptionChange2 = e => {
    setRating(e.target.value)
  }

  const individualQuestion = [];
  for (let i=0; i<questions.length; i++) {
    individualQuestion.push(
      <div key={`Question_${i}`}>{questions[i]}
        <input type="radio" name={`choice_${i}`} value="1" onChange={onOptionChange0} />
        <input type="radio" name={`choice_${i}`} value="2" onChange={onOptionChange1} />
        <input type="radio" name={`choice_${i}`} value="3" onChange={onOptionChange2} />
      </div >);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label className="QuestionRow">
        {individualQuestion}
      </label>
      <input type="submit" value="CLICK"/>
    </form>
  )
}

export default QuestionRow;

{/* <form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form> */}


/*
Current Bugs:
  - The onSubmit Functionality: It sometimes console logs what we want. Other times, there is no console log. 
  - Getting createRoot error (may have something to do with index.js)
  - theres a weird /? and in the console a weird 8080/ws
*/


















// const questions = [
//   'How accomplished do you feel this week?',
//   'How supportive is your manager?',
//   'How comfortable do you feel about sharing your ideas?'
// ]


// const questionBlock = () => {
//   // const individualQuestion = [];
//   // for (let i = 0; i < questions.length; i++) {
//   //   individualQuestion.push(<div key={`Question_${i}`}>{questions[i]}</div>)
//   // }
//       return (
//         <div>
//           hi
//           {/* {individualQuestion} */}
//         </div>
//     )
// }


// export default questionBlock;