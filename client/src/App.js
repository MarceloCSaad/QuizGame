import React, {useMemo, useState} from 'react';
import OptionsForm from './Components/OptionsForm/OptionsForm';
import Quiz from './Components/Quiz/Quiz.jsx'
import './App.css';

function App() {
  // Setting States:
  const [ gameOptions, setGameOptions ] = useState(null)
  const isGameRunning = useMemo( () => ( gameOptions !== null ), [gameOptions] )

  return (
    <div className="App" >
      <div className="content-wrap">
        {
          ( isGameRunning )
          ? <Quiz gameOptions={gameOptions} setGameOptions={setGameOptions} />
          : <OptionsForm setGameOptions={setGameOptions}/>
        }
      </div>
    </div>
  );
}

export default App;
