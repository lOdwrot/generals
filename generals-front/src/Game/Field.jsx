import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { activeFieldSelector, userColorsSelector, moveTypeSelector, abilitySelectionSelector, playerIdToTeamIdSelector } from '../storage/game/game.selector'
import classnames from 'classnames'
import { clickOnActiveField, setHalfUnitsMove } from './Reactions'
import {executeInstantCommand} from '../socket/socketManager'
import {isEqual} from 'lodash'
import { setAbilitySelection } from '../storage/game/game.action'
import { playRandomCapitol } from '../audioPlayer/audioPlayer'

export default React.memo(({
    field,
    commands,
    visibleFromAbility,
    userColors,
    abilitySelection,
    notifyMouseOver,
    clearAbilityHover,
    isHoveredByAbility,
}) => {
    const user = useSelector(userSelector)
    const activeField = useSelector(activeFieldSelector)
    const moveType = useSelector(moveTypeSelector)
    const playerIdToTeamId = useSelector(playerIdToTeamIdSelector)
    const dispatch = useDispatch()

    const { type, owner, units, x, y, isVisible } = field
    const isOwner = user.socketId === owner
    const isActiveField = activeField.x === x && activeField.y === y

    const handleClickField = () => {
        if (!isOwner || visibleFromAbility) return
        if (type === 'capitol' && Math.random() < 0.08) playRandomCapitol()
        if (isActiveField && moveType === 'all') return setHalfUnitsMove()
        clickOnActiveField(x, y)
    }

    const handleRightClickField = (event) => {
        event.preventDefault()
        if  (isClickableByAbility()) executeInstantCommand(abilitySelection, {x, y}) 
        if (abilitySelection) dispatch(setAbilitySelection(null))
    }

    const getBackgroundColor = () => {
        if (!visibleFromAbility && !isVisible === true) return '#202020'
        if(owner === 'n') return 'grey'
        return userColors[owner] || 'grey'
    }

    const getFieldUnits = () => (visibleFromAbility || !!isVisible) && (units != null) && units
    const isClickableByAbility = () => {
        if(!abilitySelection) return false
        if(abilitySelection === 'reborn' && type === 'castle' && playerIdToTeamId[owner] === playerIdToTeamId[user.socketId]) return true
        if(abilitySelection === 'moveCapitol' && type === 'castle' && owner === user.socketId) return true
        if(abilitySelection === 'plowingField' && type === 'plain' && owner === user.socketId) return true
        if(abilitySelection === 'archeryFire' && (visibleFromAbility || isVisible)) return true
        if(abilitySelection === 'scan') return true
    }
    // not-visible
    return (
        <div 
            onClick={handleClickField}
            onContextMenu={handleRightClickField}
            onMouseEnter={() => isClickableByAbility() ? notifyMouseOver(x, y) : clearAbilityHover()}
            style={{
                backgroundColor: getBackgroundColor(),
                backgroundImage: getImageLink(type, isVisible || visibleFromAbility)
            }}
            className={classnames('board-tile', {
                'clickable': isOwner || isClickableByAbility(),
                'selected-field': isActiveField,
                'hovered-by-ability' : isHoveredByAbility
            })}
        >
            {
                (isActiveField && moveType === 'half')
                    ? '50%'
                    :  getFieldUnits()
            }
            {
                commands.map(v => (
                    <div className={getClassForArrow(v)}>
                        {getSignForArrow(v)}
                    </div>
                ))
            }
        </div>
    )
}, (prevProps, nextProps) => {
    if(
        isEqual(prevProps.commands, nextProps.commands) &&
        isEqual(prevProps.field, nextProps.field) &&
        isEqual(prevProps.visibleFromAbility, nextProps.visibleFromAbility) &&
        isEqual(prevProps.isHoveredByAbility, nextProps.isHoveredByAbility)
    ) return true
    return false
})

function getImageLink(type, isVisible) {
    let imagePath = '';
    isVisible = isVisible || window.debug
    if (type === 'plain' || (!isVisible && type === 'capitol')) return 'unset'
    else if(!isVisible && type !== 'capitol') imagePath = '/obstacle.png'
    else if(type === 'castle') imagePath = '/city.png'
    else if(type === 'mountain') imagePath = '/mountain.png'
    else if(type === 'capitol') imagePath = '/crown.png'
    else if(type === 'defendedCapitol') imagePath = '/defendedCrown.png'
    else if(type === 'archeryTower') imagePath = '/archery_tower.png'
    else if(type === 'observerTower') imagePath = '/observer_tower.png'
    else if(type === 'abandonedFortress') imagePath = '/tower5G.png'

    return `url(${process.env.PUBLIC_URL + imagePath})`
}
  
function getSignForArrow({direction}) {
    switch (direction) {
        case 'u':return '↑'
        case 'd':return '↓'
        case 'l':return '←'
        case 'r':return '→'
        default: return 'x'
    }
}

function getClassForArrow({direction}) {
    switch (direction) {
        case 'u':return 'arrow-container arrow-up'
        case 'd':return 'arrow-container arrow-down'
        case 'l':return 'arrow-container arrow-left'
        case 'r':return 'arrow-container arrow-right'
        default: return alert('command without direction')
    }
}