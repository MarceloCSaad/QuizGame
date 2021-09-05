import React from 'react'
import Button from '../Button/Button'
import './QuizForm.css'

export default function QuizForm (props) {

  const renderInputs = () => {
    return props.round.answers.map( (ele) => {
      return (
        <div>
          <input type="radio" name="choices" id={ele} value={ele}></input>
          <label for={ele}> {ele} </label>
        </div>
      )})
  }

  return (
    <>
      <h2>{props.round.question}</h2>
      <form className="quiz-form" onSubmit={props.handleSubmit}>
        <div className="choices-wrapper">
          {renderInputs()}
        </div>
        <Button flavor="submit" timer={5}/>
      </form>
    </>
  )
}