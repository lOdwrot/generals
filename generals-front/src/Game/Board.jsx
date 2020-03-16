import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardSelector, commandsSelector } from '../storage/game/game.selector'
import { setBoard } from '../storage/game/game.action'
import { Button } from 'antd'
import './Board.css'
import Field from './Field'
import { keyboardListener } from './Reactions'
import { startGame } from '../socket/socketManager'

const mapGenerator = (
    width = 16, 
    height = 16,
    castles = 12,
    mountains = 28,
    players = ['p1', 'p2']
) => {
    let result = []
    // generate map
    const generateCoordinates = () => ([
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height)
    ])
    
    for(let y = 0; y < width; y++) {
        result[y] = []
        for(let x = 0; x < height; x++) {
            result[y][x] = ({
                type: 'plain',
                owner: 'n',
                units: null,
                x,
                y
            })
        }
    }

    // generate castles
    for (let i = 0; i < castles; i++) {
        const [x, y] = generateCoordinates()
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'castle',
            units: Math.floor(Math.random() * 15) + 30
        })
    }

    for (let i = 0; i < mountains; i++) {
        const [x, y] = generateCoordinates()
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'mountain'
        })
    }

    let i = 0
    while(true) {
        const [x, y] = generateCoordinates()
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'capitol',
            owner: players[i],
            units: 1
        })
        
        if (++i === players.length) break
    } 

    return result
}

export default () => {
    const board = useSelector(boardSelector)
    const commands = useSelector(commandsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('keypress', keyboardListener)
        return () => window.removeEventListener('keypress', keyboardListener)
    }, [])

    const handleClickGenerat = () => startGame()
    const commandsForFields = commands.reduce((acc, v) => {
        const key = `${v.from.x}-${v.from.y}`
        if(!acc[key]) acc[key] = []
        acc[key].push(v)
        return acc
    }, {})

    return (
        <div>
            <Button onClick={handleClickGenerat}>
                Start
            </Button>
            <div className='board-container'>
                {
                    board.map((row, index) => (
                        <div key={index} className='board-row '>
                            {
                                row.map(v => (
                                    <Field
                                        commands={commandsForFields[`${v.x}-${v.y}`] || []}
                                        field={v}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}