import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { activeFieldSelector, userColorsSelector, moveTypeSelector } from '../storage/game/game.selector'
import classnames from 'classnames'
import { clickOnActiveField, setHalfUnitsMove } from './Reactions'
import {isEqual} from 'lodash'

export default React.memo(({
    field,
    commands,
    seeAll,
    userColors
}) => {
    const user = useSelector(userSelector)
    const activeField = useSelector(activeFieldSelector)
    const moveType = useSelector(moveTypeSelector)
    const { type, owner, units, x, y, isVisible } = field
    const isOwner = user.socketId === owner
    const isActiveField = activeField.x === x && activeField.y === y

    const handleClickField = () => {
        if (!isOwner || seeAll) return
        console.log(moveType)
        if (isActiveField && moveType === 'all') return setHalfUnitsMove()
        clickOnActiveField(x, y)
    }

    const getBackgroundColor = () => {
        if (!seeAll && !isVisible === true) return '#202020'
        if(owner === 'n') return 'grey'
        return userColors[owner] || 'grey'
    }

    const getFieldUnits = () => (seeAll || !!isVisible) && (units != null) && units
    
    // not-visible
    return (
        <div 
            onClick={handleClickField}
            style={{
                backgroundColor: getBackgroundColor(),
                backgroundImage: getImageLink(type, isVisible || seeAll)
            }}
            className={classnames('board-tile', {
                'clicable': isOwner,
                'selected-field': isActiveField,
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
        isEqual(prevProps.seeAll, nextProps.seeAll)
    ) return true
    return false
})

function getImageLink(type, isVisible) {
    let imagePath = '';
    isVisible = isVisible || window.debug
    if(!isVisible && (type === 'castle' || type === 'mountain')) imagePath = '/obstacle.png'
    else if(type === 'castle') imagePath = '/city.png'
    else if(type === 'mountain') imagePath = '/mountain.png'
    else if(isVisible && type === 'capitol') imagePath = '/crown.png'

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