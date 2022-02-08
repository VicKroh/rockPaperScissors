import React, { useState, useEffect } from 'react';

import Scissors from './scissors.png';
import Rock from './rock.png';
import Paper from './paper.png';
import White from './white.png';

import './App.css';
import { LookupFunction } from 'net';

let winner: number = -1;



const lookUpWinner = {
  "paper": "scissors",
  "scissors": "Rock",
  "rock": "Paper"
}

const lookUpChoices = [
  { id: 0, name: "White", icon: White },
  { id: 1, name: "Rock", icon: Rock },
  { id: 2, name: "Paper", icon: Paper },
  { id: 3, name: "scissors", icon: Scissors }

]

function calculateWinner(player1: string): any {


  return 0;
}

function displayChoices(player1: string, player2: string) {
  <div>
    <img src={Scissors} className="player1Choice" alt="logo" />
    <img src={Scissors} className="player2Choice" alt="logo" />
  </div>
}

function displayWinner() {
  if (winner > 0) {
    return "Choose a Weapon above!";
  } else if (winner === 0) {
    return "Tie";
  } else if (winner === 1) {
    return "Player wins!";
  } else {
    return "Bot wins!"
  }
}



function App() {
  const [player1, setPlayer1] = useState(lookUpChoices.find(input => input.id == 0));
  const [computer, setComputer] = useState(lookUpChoices.find(input => input.id == 0));

  const [gameState, setGameState] = useState(null);



  useEffect(() => {
    const computerchoice: any = lookUpChoices[Math.floor(Math.random() * lookUpChoices.length)];
    setComputer(computerchoice);
  })


  function handleClick(choice: number) {

    const userChoice: any = lookUpChoices.find(input => input.id == choice);
    setPlayer1(userChoice);
  }

  function renderIcons(choice: any) {
    const Component = choice.icon;
    return <Component />
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors</h1>

        <p>
          Pick your weapon:
        </p>
        <div>
          <button className="buttons" onClick={() => (handleClick(1))}>Rock</button>
          <button className="buttons" onClick={() => (handleClick(2))}>Paper</button>
          <button className="buttons" onClick={() => (handleClick(3))}>Scissors</button>
          <button className="buttons" onClick={() => (handleClick(4))}>Random</button>
        </div>

    
        <div>
          <img src={White} className="player1Choice" alt="logo" />
          <img src={White} className="player2Choice" alt="logo" />
        </div>


        <div> {() => displayWinner()} </div>

      </header>
    </div>
  );
}

export default App;
