import React, {useMemo, useState} from 'react';
import OptionsForm from './Components/OptionsForm/OptionsForm';
import Button from './Components/Button/Button';
import Quiz from './Components/Quiz/Quiz.jsx'
import './App.css';

function App() {
  // Setting States:
  const [ gameOptions, setGameOptions ] = useState(null)
  const isGameRunning = useMemo( () => ( gameOptions !== null ), [gameOptions] )

  // Setting handlers:


  // Setting Renders:
  const renderQuiz = () => { return ( isGameRunning )
    ? <Quiz gameOptions={gameOptions} setGameOptions={setGameOptions} />
    
    :<OptionsForm setGameOptions={setGameOptions}/>
  }
  
  return (
    <div className="App" >
      <div className="content-wrap">
        {renderQuiz()}
      </div>
    </div>
  );
}

export default App;
