import React, {useState, useEffect, useMemo} from "react";
import QuizForm from './QuizForm.jsx'
import Button from "../Button/Button.jsx"
import "./Quiz.css"
import axios from 'axios'
import NextRound from "./NextRound.jsx"

export default function Quiz (props) {
  const gameOptions = props.gameOptions

  const [ roundHistory, setRoundHistory ] = useState( [] )
  const [ round, setRound ] = useState(null)

  const points = useMemo( () => {
    return roundHistory.reduce( (tot, ele) => (ele.playerAnswer === ele.correctAnswer) ?tot+1 :tot , 0)
  }, [roundHistory])
  const totalRounds = useMemo( () => roundHistory.length, [roundHistory])
  const accuracy = useMemo( () => (totalRounds > 0) ?Math.round(100*points/totalRounds) :0, [roundHistory])
  const quizEnded = useMemo( () => (roundHistory.length >= gameOptions.size), [roundHistory])
  const isRoundAnswered = useMemo( () => (round && "correctAnswer" in round), [round]) 


  const handleValidateAnswer = (event) => {
    let answer = event.target.choices.value
    event.preventDefault()

    if (event.target.choices.value === "") {
      console.log("No option was selected. Failed validation.")
      return
    }

    axios.get('http://localhost:8000/validate', {params: {answer}} )
    .then( res => {
      setRound ({...round, playerAnswer:answer, correctAnswer: res.data.correctAnswer })
    })
    .catch((e) => console.log(e))
  }

  const getNewRoundData = () => {
    console.log("Getting new Round data from backend. Please wait....")
    axios.get('http://localhost:8000/getNewRound' ,{params: {difficulty: gameOptions.difficulty}})
    .then( (res) => {
      console.log("Got new round data!!" , res.data)
      setRound(res.data)
    })
    .catch((e) => console.warn(e))
  }

  useEffect( () => { if ( round === null ) getNewRoundData() }, [round])


  return (
    <>
      <div className="round-container">
        { ( quizEnded )
          ? <div> 
              <p> final score</p>
              <h3>{points}</h3>
              <Button flavor="continue" handleClick={ () => {props.setGameOptions(null)} }/>
            </div>
          : ( round !== null )
            ? (isRoundAnswered)
              ? <NextRound round={round} setRound={setRound} roundHistory={roundHistory} setRoundHistory={setRoundHistory}/>
              : <QuizForm round={round} handleSubmit={handleValidateAnswer} />
            : <p>loading...</p>
        }
      </div>
      <div className="statistics">
        <h1>{points}</h1>
        <p>POINTS</p>
        <div className="statistics-details">
          <h3>{totalRounds}/{gameOptions.size}</h3>
          <p>questions answered</p>
          <h3>{accuracy}%</h3>
          <p>accuracy</p>
        </div>
      </div>
    </>
  )
}