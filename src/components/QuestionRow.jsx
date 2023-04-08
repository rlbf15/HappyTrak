import React, { Component }  from 'react'

const questions = [
  'How accomplished do you feel this week?',
  'How supportive is your manager?',
  'How comfortable do you feel about sharing your ideas?'
]

const handleSubmit = (e) => {
  console.log('yelloowww')
}


const QuestionRow = () => {
  const individualQuestion = [];
  for (let i=0; i<questions.length; i++) {
    individualQuestion.push(
      <p key={`Question_${i}`}>{questions[i]}
        <input type="radio" name="choice" value="1" />
        <input type="radio" name="choice" value="2" />
        <input type="radio" name="choice" value="3" />
      </p >);
  }
  return (
    <form>
      <label className="QuestionBlock">
        {individualQuestion}
      </label>
      <button onClick={()=>handleSubmit()}>SUBMIT</button>
    </form>
  )
}

export default QuestionRow;