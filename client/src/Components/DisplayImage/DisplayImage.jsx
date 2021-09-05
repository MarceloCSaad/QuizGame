import React from 'react'
import "./DisplayImage.css"
import images from '../../images/images.js'

export default function DisplayImage (props) {
  const imageSelector = (key) => {
    switch (key) {
      case "easy":
        return images.pacifier

      case "medium":
        return images.brain

      case "hard":
        return images.pentagram

      case true:
        return images.correct
    
      case false:
        return images.incorrect
    
      default:
        return images.dices
    }
  }

  return(
    <img src={imageSelector(props.src)} className="big-image"></img>
  )
}