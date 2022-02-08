import React, { useState, useEffect, ComponentState } from 'react';

import Scissors from './scissors.png';
import Rock from './rock.png';
import Paper from './paper.png';
import White from './white.png';

import './App.css';

enum lookUpGameState {
  win = "You Win!",
  lose = "You Lose :(",
  draw = "Draw, try again!"
};


function getRandom(max: number): number {
  return Math.floor(Math.random() * (max));
}

const lookUpChoices = [
  { id: 0, name: "Rock", icon: Rock, losesTo: 1 },
  { id: 1, name: "Paper", icon: Paper, losesTo: 2 },
  { id: 2, name: "scissors", icon: Scissors, losesTo: 0 },

  { id: 3, name: "White", icon: White, losesTo: null } // TODO workaround?
]


function displayChoices(player1: any, player2: any): ComponentState {
  return (<div>
    <img src={player1.icon} className="player1Choice" alt="logo" />
    <img src={player2.icon} className="player2Choice" alt="logo" />
  </div>)
}


function App() {
  const [player1, setPlayer1] = useState(lookUpChoices.find(input => input.id === 3));
  const [computer, setComputer] = useState(lookUpChoices.find(input => input.id === 3));

  const [gameState, setGameState]: any = useState();

  /*   useEffect(() => {
  
    }) */

  function handleClick(choice: number) {

    const computerchoice: any = lookUpChoices[getRandom(lookUpChoices.length - 1)]; // -1 to prevent choosing nothing

    setComputer(computerchoice);

    if (choice === lookUpChoices.length - 1) {
      choice = getRandom(lookUpChoices.length - 1);
    }

    const userChoice: any = lookUpChoices.find(input => input.id === choice);
    setPlayer1(userChoice);
    // console.log("player: " + userChoice.id)

    if (userChoice.id === computerchoice.id) {
      setGameState(lookUpGameState.draw)
      //  console.log("wincondition: " + computerchoice.id + " " + userChoice.id + " = Draw")
    } else if (userChoice.losesTo === computerchoice.id) {
      //  console.log("wincondition: " + userChoice.id + " " + computerchoice.id + " = lose")
      setGameState(lookUpGameState.lose)
    } else if (computerchoice.losesTo === userChoice.id) {
      //  console.log("wincondition: " + computerchoice.id + " " + userChoice.id + " = win")
      setGameState(lookUpGameState.win)
    }
  }

  function reset() : void {
    setComputer(lookUpChoices[lookUpChoices.length - 1])
    setPlayer1(lookUpChoices[lookUpChoices.length - 1])
    setGameState(null)

  }

  /* 
    function renderIcons(choice: any) {
      const Component = choice.icon;
      return <Component />
    } */


  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors</h1>

        <p>
          Pick your weapon:
        </p>
        <div>
          <button className="buttons" onClick={() => (handleClick(0))}>Rock</button>
          <button className="buttons" onClick={() => (handleClick(1))}>Paper</button>
          <button className="buttons" onClick={() => (handleClick(2))}>Scissors</button>
          <button className="buttons" onClick={() => (handleClick(3))}>Random</button>
        </div>

        <div>{displayChoices(player1, computer)}</div>

        <div className="gameState">{gameState}</div>

        <button className="buttons" onClick={() => (reset())}>Reset Game</button>

      </header>
    </div>
  );
}

export default App;
