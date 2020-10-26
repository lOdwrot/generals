import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardSelector, commandsSelector, playerRoleSelector, userColorsSelector, abilityVisibleFieldsSelector, passiveAbilitiesSelector, usersStatsSelector, playersSelector, abilitySelectionSelector, activeFieldSelector, moveTypeSelector } from '../storage/game/game.selector'
import './Board.css'
import Field from './Field'
import { keyboardListener } from './Reactions'
import store from '../storage/store'

export default ({
    overridedBoard,
    overridedUserColors
}) => {
    const board = overridedBoard || useSelector(boardSelector)
    const userColors = overridedUserColors || useSelector(userColorsSelector)
    const commands = useSelector(commandsSelector)
    const playerRole = useSelector(playerRoleSelector)
    const visibleFields = useSelector(abilityVisibleFieldsSelector)
    const passiveAbilities = useSelector(passiveAbilitiesSelector)
    const abilitySelection = useSelector(abilitySelectionSelector)
    const activeField = useSelector(activeFieldSelector)
    const moveType = useSelector(moveTypeSelector)
    const [abilityHoveredFields, setAbilityHoveredFields] = useState({})

    const isAllVisible = playerRole === 'spectator' || playerRole === 'historySpectator' || window.debug === true
    const allCrownsVisible= passiveAbilities.includes('revealCapitols')

    const handleHoverField = (x, y) => {
        if (!abilitySelection) return
        const fields = {}
        for (let iX = x - 1; iX <= x + 1; iX++) {
            for (let iY = y - 1; iY <= y + 1; iY++) {
                if(!fields[iX]) fields[iX] = {}
                fields[iX][iY] = true
            }
        }
        setAbilityHoveredFields(fields)
    }

    const clearAbilityHover = () => setAbilityHoveredFields({})

    useEffect(() => {
        centerOnCapitol()
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
                                        abilitySelection={abilitySelection}
                                        userColors={userColors}
                                        visibleFromAbility={isAllVisible || visibleFields[v.x]?.[v.y] || (allCrownsVisible && (v.type === 'capitol' || v.type === 'defendedCapitol'))}
                                        commands={commandsForFields[`${v.x}-${v.y}`] || []}
                                        field={v}
                                        notifyMouseOver={handleHoverField}
                                        clearAbilityHover={clearAbilityHover}
                                        isHoveredByAbility={abilitySelection && abilityHoveredFields[v.x]?.[v.y]}
                                        isActiveField={v.x === activeField.x && v.y === activeField.y}
                                        moveType={moveType}
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

function mouseMoveListener({movementX, movementY, buttons}) {
    if(buttons !== 1) return
    const board = document.getElementById('board')
    const {left, top} = board.style
    board.style.left = (Number(left.slice(0, -2)) + movementX) + 'px'
    board.style.top = (Number(top.slice(0, -2)) + movementY) + 'px'
}

function mouseWheelListener({deltaY}) {
    modifieZoom(deltaY)
}

export function modifieZoom(scrollValue, forceValue) {
    const board = document.getElementById('board')
    const currnetScale = Number(board.style.transform.slice(6, -1))
    const scaleModifier = forceValue 
        ? scrollValue
        : (scrollValue > 0
            ? -0.1
            : 0.1
        )
    const nextScale = currnetScale + scaleModifier
    if (nextScale > 2 || nextScale < 0.3) return

    board.style.transform = `scale(${String(nextScale).padEnd(3, '.0')})`
} 



// TO DO: rewrite to reactive way
function centerOnCapitol() {
    setTimeout(() => {
        try {
            const gState = store.getState()
            const userStats = gState.game.usersStats
            const socketId = gState.user.socketId
            const capitol = userStats[socketId].ownedSpecialFields[0]
            if(!capitol) console.error('# no capitol for player found')
            const {x, y} = capitol
            const board = document.getElementById('board')
            board.style.top = `${(window.innerHeight / 2) - 45 * y}px`
            board.style.left = `${(window.innerWidth / 2) - 45 * x}px`
        } catch(e) {
            console.error('Data to center map not available yet')
            console.error(e)
        }
    }, 1750)
}