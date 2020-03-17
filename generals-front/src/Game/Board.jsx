import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { boardSelector, commandsSelector } from '../storage/game/game.selector'
import './Board.css'
import Field from './Field'
import { keyboardListener } from './Reactions'

export default () => {
    const board = useSelector(boardSelector)
    const commands = useSelector(commandsSelector)

    useEffect(() => {
        window.addEventListener('keypress', keyboardListener)
        return () => window.removeEventListener('keypress', keyboardListener)
    }, [])

    const commandsForFields = commands.reduce((acc, v) => {
        const key = `${v.from.x}-${v.from.y}`
        if(!acc[key]) acc[key] = []
        acc[key].push(v)
        return acc
    }, {})

    return (
        <div>
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