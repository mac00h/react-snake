import React from 'react';
import styled from 'styled-components';

const size = 30;

function getRandomInt() {
    return Math.floor(Math.random() * (Math.floor(29) - Math.ceil(0) + 1)) + Math.ceil(0);
}

const Board = () => {
    const [board, setBoard] = React.useState(new Array(size).fill(0).map(row => new Array(size).fill(0)))
    const [snakeState, setSnakeState] = React.useState('null')
    const [snakeSize, setSnakeSize] = React.useState(0);
    const [snakeHead, setSnakeHead] = React.useState({
        x: 0,
        y: 0,
    })
    const [tail, setTail] = React.useState([{
        x: null,
        y: null,
    }
    ])

    const [food, setFood] = React.useState({
        x: null,
        y: null,
    })

    const prevRef = React.useRef()

    React.useEffect(() => {
        prevRef.current = snakeHead
        if (snakeSize >= 1) {
            let v = []
            v.push({ x: prevRef.current.x, y: prevRef.current.y })
            for (let i = 0; i < snakeSize; i++) {
                v.push(tail[i])
            }
            setTail(v)
        }
        
    }, [snakeHead.x, snakeHead.y])

    React.useEffect(() => {
        if (snakeHead.x === size) setSnakeHead({ x: 0, y: snakeHead.y })
        if (snakeHead.x === -1) setSnakeHead({ x: size - 1, y: snakeHead.y })
        if (snakeHead.y === size) setSnakeHead({ x: snakeHead.x, y: 0 })
        if (snakeHead.y === -1) setSnakeHead({ x: snakeHead.x, y: size - 1 })
        if (snakeHead.y === food.y && snakeHead.x === food.x) {
            setSnakeSize(snakeSize + 1)
        }
    }, [snakeHead.x, snakeHead.y])

    React.useEffect(() => {
        console.log(snakeSize)
        setFood({
            x: getRandomInt(),
            y: getRandomInt()
        })
    }, [snakeSize])

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
                    setSnakeHead({ x: snakeHead.x + 1, y: snakeHead.y })
                } else if (snakeState === 'left') {
                    setSnakeHead({ x: snakeHead.x - 1, y: snakeHead.y })
                } else if (snakeState === 'up') {
                    setSnakeHead({ x: snakeHead.x, y: snakeHead.y - 1 })
                } else if (snakeState === 'down') {
                    setSnakeHead({ x: snakeHead.x, y: snakeHead.y + 1 })
                }
            }, 50);
            return () => clearInterval(interval);
        }

    }, [snakeState, snakeHead.x, snakeHead.y]);

    const handleArrowPress = (e) => {
        switch (e.keyCode) {
            case 37: //left
                // setSnakeHead({ x: snakeHead.x - 1, y: snakeHead.y });
                setSnakeState('left')
                break;
            case 38: //up
                // setSnakeHead({ x: snakeHead.x, y: snakeHead.y - 1 });
                setSnakeState('up')
                break;
            case 39: //right
                // setSnakeHead({ x: snakeHead.x + 1, y: snakeHead.y });
                setSnakeState('right')
                break;
            case 40: //down
                // setSnakeHead({ x: snakeHead.x, y: snakeHead.y + 1 });
                setSnakeState('down')
                break;
        }

        return 0;
    }

    const calc = (ix, iy) => {
        for (let i = 0; i < tail.length; i++) {
            if (ix === tail[i].x && iy === tail[i].y) {
                return true;
            }
        }

    }

    return (
        <div style={{ border: '1px solid white', padding: '10px' }}>
            {board.map((row, indexR) => (
                <div key={indexR} style={{ height: '25px', margin: '5px' }}>
                    {row.map((cell, indexC) => {
                        return indexR === snakeHead.y && indexC === snakeHead.x ? <Cell key={indexC} color={'white'} />
                            : calc(indexC, indexR) ? <Cell key={indexC} color={'white'} />
                                : indexR === food.y && indexC === food.x ? <Cell key={indexC} color={'red'} /> : <Cell key={indexC} />
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board;

const Cell = styled.div`
width: 25px;
height: 25px;
display: inline-flex;
margin: 3px;
background: ${props => props.color};
`;