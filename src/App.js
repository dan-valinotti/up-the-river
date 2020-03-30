import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import GameController from "./components/GameController";

function App() {
  return (
    <div className="App">
      <Container style={{maxWidth: 800}} id="game-root">
        <GameController/>
      </Container>
    </div>
  );
}

export default hot(module)(App);
