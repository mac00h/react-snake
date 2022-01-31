import React from 'react';
import styled from 'styled-components';
import Board from './Board';

function App() {
  const [gameState, setGameState] = React.useState('0')
  return (
    <MainWrapper>
      <GameInfo>
        {gameState === '0' ? <h2>Use arrow key to start the game.</h2> : <h2>Game in progress!</h2>}
        <h1>Score: {gameState}</h1>
      </GameInfo>
      <Board setGameState={setGameState} gameState={gameState} snakeS/>
    </MainWrapper>
  );
}


export default App;

const MainWrapper = styled.div`
text-align: center;
background-color: #282c34;
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
color: white;
`;

const GameInfo = styled.div`
  min-height: 90vh;
  min-width: 40vw;
`;
