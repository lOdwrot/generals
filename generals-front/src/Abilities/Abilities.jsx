import React from 'react'
import styles from './Abilities.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { usersStatsSelector, playerRoleSelector, boardSelector, abilitySelectionSelector, cooldownsSelector } from '../storage/game/game.selector'
import Ability from './Ability'
import { setAbilitySelection } from '../storage/game/game.action'
import { executeInstantCommand } from '../socket/socketManager'

const getImageLink = (imgPath) => `url(${process.env.PUBLIC_URL + imgPath})`
const abilityReborn = {
    name: 'Reborn From Ashes',
    id: 'reborn',
    icon: getImageLink('/ability_reborn.jpg'),
    description: 'Reborn in castle of your allie. Click on ability and select a castle with minimum 100 units to reborn there.',
    cost: 50,
    from: 'ally castle',
    maxCooldown: 500,
}

const capitolAbilities = [
    {
        name: 'Unite Army',
        id: 'unite',
        icon: getImageLink('/ability_uniteArmy.png'),
        type: 'instant',
        description: 'Gather army from .',
        cost: 0,
        from: 'capitol',
        maxCooldown: 500,
    },
    {
        name: 'Move Capitol',
        id: 'moveCapitol',
        icon: getImageLink('/ability_moveCapitol.jpg'),
        type: 'select',
        description: 'Move capi.',
        cost: 200,
        from: 'capitol',
        maxCooldown: 500,
    },
    {
        name: 'Ultra Defender',
        id: 'defender',
        icon: getImageLink('/ability_defeder.jpg'),
        type: 'instant',
        description: '',
        cost: 10,
        from: 'capitol',
        maxCooldown: 1000,
    },
    {
        name: 'Plowing The Field',
        id: 'plowingField',
        type: 'select',
        icon: getImageLink('/ability_plowingField.png'),
        description: '',
        cost: 25,
        from: 'capitol',
        maxCooldown: 25,
    }
]

const builidingAbilities = [
    
    {
        name: 'Scan Area',
        id: 'scan',
        icon: getImageLink('/ability_observer.png'),
        description: '',
        cost: 100,
        from: 'observation tower',
        maxCooldown: 100,
    },
    {
        name: 'Autumn Of The Middle Ages',
        id: 'autumn',
        icon: getImageLink('/ability_autumn.png'),
        description: 'Release a devastating plague that destroy almost everyone across across all kingdoms. On every field only one warrior will remain (buildings and capitols will be affected as well).',
        cost: 300,
        from: 'abondoned fortress',
        maxCooldown: 1000,
    },
    {
        name: 'Archery Tower',
        id: 'archery tower',
        icon: getImageLink('/ability_archery.png'),
        description: '',
        cost: 250,
        maxCooldown: 300,
    },
]

export default () => {
    const board = useSelector(boardSelector)
    const user = useSelector(userSelector)
    const userStats = useSelector(usersStatsSelector)
    const selectedAbility = useSelector(abilitySelectionSelector)
    const cooldowns = useSelector(cooldownsSelector)
    const dispatch = useDispatch()

    const isPlayerDead = !userStats[user.socketId]?.units
    const capitolField = board.flat().find(({type, owner}) => (type === 'capitol' || type === 'defendedCapitol') && owner === user.socketId)

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
                    cooldown={cooldowns[abilityReborn.id]}
                />
            }
            {
                capitolAbilities.map(v => (
                    <Ability
                        handleClick={() => {
                            if(v.type === 'select') handleSetAbilitySelectionMode(v.id)
                            if(v.type === 'instant') executeInstantCommand(v.id)
                        }}
                        disabled={false}
                        ability={v}
                        selectedAbility={selectedAbility}
                        cooldown={cooldowns[v.id]}
                    />
                ))
            }
        </div>
    )
}