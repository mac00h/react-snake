import React from 'react';
import styled from 'styled-components';

const size = 15;

const Board = () => {
    const [board, setBoard] = React.useState(new Array(size).fill(0).map(row => new Array(size).fill(0)))
    const [snakeState, setSnakeState] = React.useState('null')
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

    React.useEffect(() => {
        if (snakeState !== 'null') {
            const interval = setInterval(() => {
                if (snakeState === 'right') {
                    setSnake({ x: snake.x + 1, y: snake.y })
                } else if (snakeState === 'left') {
                    setSnake({ x: snake.x - 1, y: snake.y })
                } else if (snakeState === 'up') {
                    setSnake({ x: snake.x, y: snake.y - 1 })
                } else if (snakeState === 'down') {
                    setSnake({ x: snake.x, y: snake.y + 1 })
                }
            }, 400);
            return () => clearInterval(interval);
        }

    }, [snakeState, snake.x, snake.y]);

    const handleArrowPress = (e) => {
        switch (e.keyCode) {
            case 37: //left
                setSnake({ x: snake.x - 1, y: snake.y });
                setSnakeState('left')
                break;
            case 38: //up
                setSnake({ x: snake.x, y: snake.y - 1 });
                setSnakeState('up')
                break;
            case 39: //right
                setSnake({ x: snake.x + 1, y: snake.y });
                setSnakeState('right')
                break;
            case 40: //down
                setSnake({ x: snake.x, y: snake.y + 1 });
                setSnakeState('down')
                break;
        }

        return 0;
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