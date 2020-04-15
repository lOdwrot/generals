import React from 'react'
import styles from './Abilities.module.scss'
import { Popover } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { usersStatsSelector, playerRoleSelector, boardSelector, abilitySelectionSelector } from '../storage/game/game.selector'
import Ability from './Ability'
import { setAbilitySelection } from '../storage/game/game.action'

const getImageLink = (imgPath) => `url(${process.env.PUBLIC_URL + imgPath})`
const abilityReborn = {
    name: 'Reborn From Ashes',
    id: 'reborn',
    icon: getImageLink('/ability_reborn.jpg'),
    cost: '',
    description: 'Reborn in castle of your allie. Click on ability and select a castle with minimum 100 units to reborn there.'
}

const capitolAbilities = [
    {
        name: 'Move Capitol',
        id: 'moveCapitol',
        icon: getImageLink('/ability_moveCapitol.jpg'),
        cost: 150,
        type: 'select',
        description: 'Reborn in castle of your allie. Click on ability and select a castle with minimum 100 units to reborn there.'
    },
    {
        name: 'Ultra Defender',
        id: 'defender',
        icon: getImageLink('/ability_defeder.jpg'),
        cost: 200,
        description: ''
    },
    {
        name: 'Plowing The Field',
        id: 'plowingField',
        type: 'select',
        icon: getImageLink('/ability_plowingField.png'),
        cost: 25,
        description: ''
    }
]

const builidingAbilities = [
    
    {
        name: 'Scan Area',
        icon: getImageLink('/ability_observer.png'),
        cost: '',
        description: ''
    },
    {
        name: 'Autumn Of The Middle Ages',
        icon: getImageLink('/ability_autumn.png'),
        cost: '',
        description: 'Release a devastating plague that destroy almost everyone across across all kingdoms. On every field only one warrior will remain (buildings and capitols will be affected as well).'
    },
    {
        name: 'Archery Tower',
        icon: getImageLink('/ability_archery.png'),
        cost: '',
        description: ''
    },
]

export default () => {
    const board = useSelector(boardSelector)
    const user = useSelector(userSelector)
    const userStats = useSelector(usersStatsSelector)
    const selectedAbility = useSelector(abilitySelectionSelector)
    const playerRole = useSelector(playerRoleSelector)
    const dispatch = useDispatch()

    const isPlayerDead = !userStats[user.socketId]?.units
    const capitolField = board.flat().find(({type, owner}) => type === 'capitol' && owner === user.socketId)

    const handleSetAbilitySelectionMode = (ability) => dispatch(setAbilitySelection(ability)) 
    
    return (
        <div className={styles['ability-panel']}>
            {
                isPlayerDead &&
                <Ability
                    handleClick={() => handleSetAbilitySelectionMode(abilityReborn.id)}
                    disabled={false}
                    ability={abilityReborn}
                    selectedAbility={selectedAbility}
                />
            }
            {
                capitolAbilities.map(v => (
                    <Ability
                        handleClick={() => {
                            if(v.type === 'select') handleSetAbilitySelectionMode(v.id)
                        }}
                        disabled={false}
                        ability={v}
                        selectedAbility={selectedAbility}
                    />
                ))
            }
        </div>
    )
}