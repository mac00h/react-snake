import React from 'react';
import styled from 'styled-components';

const size = 15;

const Board = () => {
    const [board, setBoard] = React.useState(new Array(size).fill(0).map(row => new Array(size).fill(0)))
    const [snake, setSnake] = React.useState({
        x: 0,
        y: 0,
    })

    React.useEffect(() => {
        window.addEventListener('keydown', handleArrowPress);

        return () => {
            window.removeEventListener('keydown', handleArrowPress)
        }
    })

    const handleArrowPress = (e) => {
        switch (e.keyCode) {
            case 37: //left
                return setSnake({ x: snake.x - 1, y: snake.y });
            case 38: //up
                return setSnake({ x: snake.x, y: snake.y - 1 });
            case 39: //right
                return setSnake({ x: snake.x + 1, y: snake.y });
            case 40: //down
                return setSnake({ x: snake.x, y: snake.y + 1 });
        }
    }

    return (
        <div>
            {board.map((row, indexR) => (
                <div key={indexR} style={{ height: '50px' }}>
                    {row.map((cell, indexC) => {
                        return indexR === snake.y && indexC === snake.x ? <Cell key={indexC} color={'green'} /> : <Cell key={indexC} />
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board;

const Cell = styled.div`
width: 50px;
height: 50px;
outline: 1px solid white;
display: inline-block;
background: ${props => props.color};
`;