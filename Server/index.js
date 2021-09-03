const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const htmlEntities = require('html-entities')
// API questions are in html text. I'm html-entities's decode function to convert to plain text

const app = express()
app.use(cors())
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}));

let currentAnswer;


async function getNewRound (difficulty) {
  console.log( "Please wait... fetching from",`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`)
  return await axios.get(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`)
}

function shuffleArray (array) {
  console.log( array )
  let j = 0;
  for (let i = array.length -1; i > 0; i--) {
    j = Math.floor( Math.random() * (i + 1) )
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  console.log( array )
}

function frontendFormatting (obj) {
  let category = obj.category
  let boolean = (obj.type === "boolean") ?true :false;
  let question = htmlEntities.decode(obj.question)
  let answers = []
  
  obj.incorrect_answers.forEach(ele => { answers.push(htmlEntities.decode(ele)) })
  answers.push(obj.correct_answer)
  shuffleArray( answers )
  
  return {category, boolean, question, answers}
}


app.get('/getNewRound', ( req, res ) => {
  console.log("Gotta '/getNewRound' request")

  const promise = getNewRound(req.query.difficulty || "hard") //will get a promised back from the async function

  Promise.all( [promise] ) //when all promises are fulfilled, then do something
  .then((results) => {
    console.log( "Promised fulfilled! Returning:", results[0].data.results[0])
    currentAnswer = results[0].data.results[0].correct_answer
    res.send( frontendFormatting(results[0].data.results[0]) )
  })
})

app.get('/validate', ( req, res ) => {
  console.log("Frontend needs to '/validate'", req.query.answer)

  res.send( (req.query.answer === currentAnswer) ?true :false )
})

app.listen(8000, () => { console.log("Server running on port 8000") })
