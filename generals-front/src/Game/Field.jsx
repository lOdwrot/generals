import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { activeFieldSelector } from '../storage/game/game.selector'
import classnames from 'classnames'
import { clickOnActiveField } from './Reactions'

export default ({
    field,
    commands
}) => {
    const user = useSelector(userSelector)
    const activeField = useSelector(activeFieldSelector)
    const { type, owner, units, x, y } = field
    const isOwner = user.socketId === owner

    const handleClickField = () => isOwner && clickOnActiveField(x, y)
    
    return (
        <div 
            onClick={handleClickField}
            className={classnames('board-tile not-visible', {
                'red-tile': isOwner,
                'clicable': isOwner,
                'selected-field': (activeField.x === x && activeField.y === y),
            })}
            style={{backgroundImage: getImageLink(type)}}
        >
            {(units != null) && units}
            {
                commands.map(v => (
                    <div className={getClassForArrow(v)}>
                        {getSignForArrow(v)}
                    </div>
                ))
            }
        </div>
    )
}

function getImageLink(type) {
    let imagePath;
    switch (type) {
        case 'castle':
            imagePath = '/city.png'
            break;
        case 'mountain':
            imagePath = '/mountain.png'
            break;
        case 'capitol':
            imagePath = '/crown.png'
            break;
        default:
            return '';
    }
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