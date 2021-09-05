import React from 'react'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Button from '../Button/Button.jsx'
import './NextRound.css'

export default function NextRound (props) {
  let round = {...props.round}
  let roundHistory = [...props.roundHistory]
  let gotIt = (round.playerAnswer === round.correctAnswer)
  
    return(
    <>
      <DisplayImage src={gotIt}/>
      <div className="confirmation-wrapper">
      { (gotIt)
        ? <p className="positive-answer"> <b><em>{round.correctAnswer}</em></b> is correct!</p>
        : <>
            <p className="negative-answer"> <b><em>{round.playerAnswer}</em></b> is incorrect.</p>
            <p className="negative-answer"> <b><em>{round.correctAnswer}</em></b> was the right answer.</p>
          </>
      }
      </div>
      <Button flavor="next question" handleClick={ () => {
        props.setRoundHistory([...roundHistory, round])
        props.setRound(null)}
      }/>
    </>
  )
}