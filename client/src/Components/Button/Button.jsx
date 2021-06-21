import React from "react"
import './Button.css'

export default function Button (props) {
  return (
    <button className="generic-button" onClick={props.handleClick}>
      {props.flavor}
    </button>
  )
}