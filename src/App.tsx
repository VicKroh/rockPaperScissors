import React, { useState, ComponentState } from 'react';

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
  { id: 0, name: "rock", icon: Rock, losesTo: 1 },
  { id: 1, name: "paper", icon: Paper, losesTo: 2 },
  { id: 2, name: "scissors", icon: Scissors, losesTo: 0 },
  { id: 3, name: "white", icon: White, losesTo: null }
]

function displayChoices(player1: any, player2: any): ComponentState {
  return (<div>
    <img src={player1.icon} className="player1Choice" alt={`logo-${player1.name}`} /> 
    <img src={player2.icon} className="player2Choice" alt={`logo-${player2.name}`} />
  </div>) // ` for string literal to use variable names
}

function App() {
  const [player1, setPlayer1] = useState(lookUpChoices.find(input => input.id === 3));
  const [computer, setComputer] = useState(lookUpChoices.find(input => input.id === 3));

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const [gameState, setGameState]: any = useState();

  function handleClick(choice: number) {

    const computerchoice: any = lookUpChoices[getRandom(lookUpChoices.length - 1)]; // -1 to prevent choosing nothing

    setComputer(computerchoice);

    if (choice === lookUpChoices.length - 1) {
      choice = getRandom(lookUpChoices.length - 1);
    }

    const userChoice: any = lookUpChoices.find(input => input.id === choice);
    setPlayer1(userChoice);

    if (userChoice.id === computerchoice.id) {
      setGameState(lookUpGameState.draw);

    } else if (userChoice.losesTo === computerchoice.id) {
      setGameState(lookUpGameState.lose);
      setLosses(losses + 1);
    } else {
      setGameState(lookUpGameState.win);
      setWins(wins + 1);
    }
  }

  function reset(): void {
    setComputer(lookUpChoices[lookUpChoices.length - 1]);
    setPlayer1(lookUpChoices[lookUpChoices.length - 1]);
    setGameState(null);
    setWins(0);
    setLosses(0);
  }

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
        <div>Wins: {wins} Losses: {losses}</div>
        <div>{displayChoices(player1, computer)}</div>

        <div className="gameState">{gameState}</div>

        <button className="buttons" onClick={() => (reset())}>Reset Game</button>

      </header>
    </div>
  );
}

export default App;
