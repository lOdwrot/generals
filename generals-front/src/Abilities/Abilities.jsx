import React from 'react'
import styles from './Abilities.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { usersStatsSelector, abilitySelectionSelector, cooldownsSelector, passiveAbilitiesSelector } from '../storage/game/game.selector'
import Ability from './Ability'
import { setAbilitySelection } from '../storage/game/game.action'
import { executeInstantCommand } from '../socket/socketManager'
import { playArcheriesReady, playPlowingFieldConfirmation, playMoveCapitolConfirmation, playCrownFinder, playAutumnSelect } from '../audioPlayer/audioPlayer'

const getImageLink = (imgPath) => `url(${process.env.PUBLIC_URL + imgPath})`
const abilityReborn = {
    name: 'Reborn From Ashes',
    id: 'reborn',
    type: 'select',
    icon: getImageLink('/ability_reborn.jpg'),
    description: 'Reborn in on of ally\'s castle. Click on ability and select (by right click) a castle with minimum 100 units to reborn there.',
    cost: 100,
    from: 'ally castle',
    maxCooldown: 500,
}

const capitolAbilities = [
    {
        name: 'Unite Army',
        id: 'unite',
        icon: getImageLink('/ability_uniteArmy.png'),
        type: 'instant',
        description: 'Gather all units from whole kingdom in your capitol immediately.',
        cost: 0,
        from: 'capitol',
        maxCooldown: 500,
    },
    {
        name: 'Move Capitol',
        id: 'moveCapitol',
        icon: getImageLink('/ability_moveCapitol.jpg'),
        type: 'select',
        description: 'Select owned castle to your new capitol. Select ability and right click on selected castle.',
        cost: 100,
        from: 'capitol',
        maxCooldown: 500,
    },
    {
        name: 'Ultra Defender',
        id: 'defender',
        icon: getImageLink('/logo.png'),
        type: 'instant',
        description: 'Units inside you capitol fight with double power for short period',
        cost: 50,
        from: 'capitol',
        maxCooldown: 10000,
    },
    {
        name: 'Plowing The Field',
        id: 'plowingField',
        type: 'select',
        icon: getImageLink('/ability_plowingField.png'),
        description: 'Clear one of controlled fields from your units to hide from enemies.',
        cost: 25,
        from: 'capitol',
        maxCooldown: 100,
    },
]

const builidingAbilities = [
    {
        name: 'Scan Area',
        id: 'scan',
        type: 'select',
        icon: getImageLink('/ability_observer.png'),
        description: 'Scan area you can not reach. Selected fields (by right click) will be visible even if you have no units in this area.',
        cost: 25,
        from: 'observation tower',
        fromFieldName: 'observerTower',
        maxCooldown: 50,
    },
    {
        name: 'Longrange Archery Fire',
        id: 'archeryFire',
        type: 'select',
        icon: getImageLink('/ability_archery.png'),
        description: 'Select (by right click) one of visible fields and order archeries longrange fire. Damage 75% of units on empty areas and 25% in buildings',
        cost: 300,
        from: 'archery tower',
        fromFieldName: 'archeryTower',
        maxCooldown: 400,
    },
    {
        name: 'Autumn Of The Middle Ages',
        id: 'autumn',
        type: 'instant',
        icon: getImageLink('/ability_autumn.png'),
        description: 'Cause a tragedy across all kingdoms. After tragedy only one unit on every standard field will remain.',
        cost: 1000,
        from: 'abondoned fortress',
        fromFieldName: 'abandonedFortress',
        maxCooldown: 2500,
    },
]

const passiveAbilities = [
    {
        name: 'Reveal Capitols',
        id: 'revealCapitols',
        type: 'instant',
        icon: getImageLink('/ability_show_crown.PNG'),
        description: 'Make all capitols visible on map (only you can see it).',
        cost: 3000,
        from: 'capitol',
        maxCooldown: 1,
    }
]


export default () => {
    const user = useSelector(userSelector)
    const userStats = useSelector(usersStatsSelector)
    const selectedAbility = useSelector(abilitySelectionSelector)
    const cooldowns = useSelector(cooldownsSelector)
    const gatheredPassiveAbilities = useSelector(passiveAbilitiesSelector)
    const dispatch = useDispatch()

    const playerStats = userStats[user.socketId]
    if (!playerStats) return null
    const isPlayerDead = !playerStats.units
    const handleSetAbilitySelectionMode = (ability) => dispatch(setAbilitySelection(ability)) 
    const handleClickAbility = (ability) => {
        const {type, id} = ability
        if(type === 'select') handleSetAbilitySelectionMode(id)
        if(type === 'instant') executeInstantCommand(id)

        if(id === 'archeryFire') playArcheriesReady()
        if(id === 'autumn') playAutumnSelect()
        if(id === 'revealCapitols' || id === 'scan') playCrownFinder()
        if(id === 'moveCapitol') playMoveCapitolConfirmation()
        if(id === 'plowingField') playPlowingFieldConfirmation()
        
    }
    const capitol = playerStats.ownedSpecialFields.find(v => v.type === 'capitol' || v.type === 'defendedCapitol')


    return (
        <div className={styles['ability-panel']}>
            {
                isPlayerDead &&
                <Ability
                    handleClick={() => handleClickAbility(abilityReborn)}
                    disabled={false}
                    ability={abilityReborn}
                    selectedAbility={selectedAbility}
                    cooldown={cooldowns[abilityReborn.id]}
                />
            }
            {
                !isPlayerDead &&
                capitolAbilities.map(v => (
                    <Ability
                        key={v.id}
                        handleClick={() => handleClickAbility(v)}
                        disabled={capitol.units <= v.cost}
                        ability={v}
                        selectedAbility={selectedAbility}
                        cooldown={cooldowns[v.id]}
                    />
                ))
            }
            {
                !isPlayerDead &&
                passiveAbilities.map(v => (
                    <Ability
                        key={v.id}
                        handleClick={() => handleClickAbility(v)}
                        disabled={capitol.units <= v.cost}
                        isPassive={true}
                        isOwned={gatheredPassiveAbilities.includes(v.id)}
                        ability={v}
                        selectedAbility={selectedAbility}
                        cooldown={cooldowns[v.id]}
                    />
                ))
            }
            {
                builidingAbilities
                    .filter(v => playerStats[v.fromFieldName])
                    .map(v => (
                        <Ability
                            key={v.id}
                            handleClick={() => handleClickAbility(v)}
                            disabled={!playerStats.ownedSpecialFields.some(field => field.type === v.fromFieldName && field.units > v.cost)}
                            ability={v}
                            selectedAbility={selectedAbility}
                            cooldown={cooldowns[v.id]}
                        />
                    ))
            }
        </div>
    )
}