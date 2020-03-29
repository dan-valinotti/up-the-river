import React from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import GameController from "./components/GameController";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" id="game-root">
        <GameController/>
      </Container>
    </div>
  );
}

export default App;
