import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardSelector, commandsSelector, playerRoleSelector, userColorsSelector } from '../storage/game/game.selector'
import './Board.css'
import Field from './Field'
import { keyboardListener } from './Reactions'

export default ({
    overridedBoard,
    overridedUserColors
}) => {
    const board = overridedBoard || useSelector(boardSelector)
    const userColors = overridedUserColors || useSelector(userColorsSelector)
    const commands = useSelector(commandsSelector)
    const playerRole = useSelector(playerRoleSelector)

    const isAllVisible = playerRole === 'spectator' || playerRole === 'historySpectator' || window.debug === true
    
    const mouseMoveListener = ({movementX, movementY, buttons}) => {
        if(buttons !== 1) return
        const board = document.getElementById('board')
        const {left, top} = board.style
        board.style.left = (Number(left.slice(0, -2)) + movementX) + 'px'
        board.style.top = (Number(top.slice(0, -2)) + movementY) + 'px'

    }

    const mouseWheelListener = ({deltaY}) => {
        const board = document.getElementById('board')
        const currnetScale = Number(board.style.transform.slice(6, -1))
        const nextScale = currnetScale + (deltaY > 0
                ? -0.1
                : 0.1
            )
        if (nextScale > 2 || nextScale < 0.3) return

        board.style.transform = `scale(${String(nextScale).padEnd(3, '.0')})`
    }

    useEffect(() => {
        if(playerRole !== 'historySpectator') {
            window.addEventListener('keypress', keyboardListener)
        }
        window.addEventListener('mousemove', mouseMoveListener)
        window.addEventListener('mousewheel', mouseWheelListener)
        return () => {
            if(playerRole !== 'historySpectator') {
                window.removeEventListener('keypress', keyboardListener)
            }
            window.removeEventListener('mousemove', mouseMoveListener)
            window.removeEventListener('mousewheel', mouseWheelListener)
        }
    }, [])

    const commandsForFields = commands.reduce((acc, v) => {
        const key = `${v.from.x}-${v.from.y}`
        if(!acc[key]) acc[key] = []
        acc[key].push(v)
        return acc
    }, {})

    return (
        <div>
            <div
                id='board'
                className='board-container'
                style={{left: '10px', top: "10px", transform: "scale(1)"}}
            >
                {
                    board.map((row, index) => (
                        <div key={index} className='board-row '>
                            {
                                row.map((v, index) => (
                                    <Field
                                        key={index}
                                        userColors={userColors}
                                        seeAll={isAllVisible}
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