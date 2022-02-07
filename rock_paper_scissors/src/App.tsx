import React from 'react';
import scissors from './scissors.png';
import './App.css';

const noOfChoices : number = 3;

let winner : number = -1;



interface lookUpChoice  {
    0: "scissors",
    1: "Rock",
    2: "Paper"
}

function calculateWinner(player1: string) {
  const computerchoice : number = Math.floor(Math.random() * noOfChoices);

}

function displayChoices(player1: string, player2: string) {
  <div>
    <img src={scissors} className="player1Choice" alt="logo" />
    <img src={scissors} className="player2Choice" alt="logo" />
  </div>
}

function displayWinner(){
  if( winner > 0){
    return <div>Choose a Weapon above!</div>;
  } else if (winner === 0){
    return <div>Tie</div>;
  } else if (winner === 1){
    return "Player wins!";
  } else {
    return "Bot wins!"
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors</h1>

        <p>
          Pick your weapon:
        </p>
        <div>
          <button className="buttons" onClick={() => calculateWinner("rock")}>Rock</button>
          <button className="buttons" onClick={() => calculateWinner("paper")}>Paper</button>
          <button className="buttons" onClick={() => calculateWinner("scissors")}>Scissors</button>
          <button className="buttons" onClick={() => calculateWinner("Random")}>Random</button>
        </div>

        <div>
          <img src={scissors} className="player1Choice" alt="logo" />
          <img src={scissors} className="player2Choice" alt="logo" />
        </div>

        <div> {() => displayWinner()} </div>
      </header>
    </div>
  );
}

export default App;
