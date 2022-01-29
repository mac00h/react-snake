import React from 'react';
import styled from 'styled-components';
import Board from './Board';



function App() {
  return (
    <MainWrapper>
      <Board/>
    </MainWrapper>
  );
}


export default App;

const MainWrapper = styled.div`
text-align: center;
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
`;
