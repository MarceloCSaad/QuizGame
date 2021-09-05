import React from "react"
import './Button.css'

export default function Button (props) {
  return (
    <button className="generic-button" onClick={props.handleClick}>
      {props.flavor}
    </button>
  )
}

/*
import React, { Component } from "react"
import './Button.css'

class Button extends React.Component {
  constructor(props){
    this.handleClick = props.handleClick
    this.startTimer = undefined;
    this.currentTimer = undefined
    this.timer = props.timer
    this.state = memo( () => {
      console.log(this.currentTimer)
      return (this.currentTimer > this.startTimer + (1000)*timer )
    }, [this.currentTimer])
  }

  componentDidMount(){
    this.startTimer = new Date().getTime()
    this.currentTimer = startTimer
    setInterval( () => {this.currentTimer = new Date().getTime()} )
  }

  
  
  render () {
    return 
      <button className="generic-button" onClick={this.handleClick}>
        {props.flavor}
      </button>
  }
}

export default Button;
*/