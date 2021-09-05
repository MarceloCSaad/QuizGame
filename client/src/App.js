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
      <footer className="app-footer">
        <p>Design by Marcelo Saad</p>
        <div>
          <p>Powered by <a href="https://opentdb.com/" title="Open Trivia Database"> Open Trivia Database</a> | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
