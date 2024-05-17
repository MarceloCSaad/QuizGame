import React, { useState } from 'react'
import Button from '../Button/Button'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import './OptionsForm.css'

export default function OptionsForm (props) {


  const [tempOptions, setTempOptions] = useState({ size: 10, difficulty: "" })

  const handleBarChange = (event) => {
    let temp = {...tempOptions}
    temp.size = event.target.value
    console.log(temp)
    setTempOptions(temp)
  }

  const handleRadioSelect = (event) => {
    let temp = {...tempOptions}
    temp.difficulty = event.target.value
    setTempOptions(temp)
  }

  const startGame = (event) => {
    event.preventDefault()
    props.setGameOptions(tempOptions)
  }

  return (
    <>
      <form className="option-form" onSubmit={props.handleSubmit}>
        <div className="lobby-container">
          {
            <DisplayImage src={tempOptions.difficulty} />
          }
          <Button flavor="NEW QUIZ" handleClick={startGame}/>
        </div>

        <div className="settings">
          <h1>settings</h1>
          <div>
            <p>{tempOptions.size} questions total</p>
            <input type="range" name="options" id="Number of Questions" min="1" defaultValue="10" max="20" onChange={handleBarChange}></input>
          </div>
          <div className="difficulty-wraper">
            <div>
              <label for="difficulty"> Any </label>
              <input type="radio" name="options" id="difficulty" value="" defaultChecked onChange={handleRadioSelect}></input>
            </div>
            <div>
              <label for="difficulty"> Easy </label>
              <input type="radio" name="options" id="difficulty" value="easy" onChange={handleRadioSelect}></input>
            </div>
            <div>
              <label for="difficulty"> Medium </label>
              <input type="radio" name="options" id="difficulty" value="medium" onChange={handleRadioSelect}></input>
            </div>
            <div>
              <label for="difficulty"> Hard </label>
              <input type="radio" name="options" id="difficulty" value="hard" onChange={handleRadioSelect}></input>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}