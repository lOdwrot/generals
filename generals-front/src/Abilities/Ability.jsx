import React from 'react'
import { Popover, Divider } from 'antd'
import styles from './Abilities.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { setAbilitySelection } from '../storage/game/game.action'

export default ({
    ability,
    handleClick,
    disabled=false,
    selectedAbility,
    cooldown,
    isPassive,
    isOwned
}) => {
    const dispatch = useDispatch()
    const { name, description, icon, id, maxCooldown, cost, from} = ability

    const handleAbiliyBlockClick = () => {
        if(selectedAbility === id) dispatch(setAbilitySelection(null))
        else !disabled && handleClick()
    }

    const isDisabled = (cooldown || disabled)

    return (
        <Popover 
            title={name}
            placement="rightTop"
            content={(
                <div className={styles['ability-description-box']}>
                    <div className={styles['popover-stats']}>
                        <div>{`Cost: ${cost} units from ${from}`}</div>
                        {
                            !isPassive &&
                            <div>Cooldown: {cooldown}/{maxCooldown}</div>
                        }
                        {
                            isPassive &&
                            <div>Passive Ability</div>
                        }
                    </div>
                    {description}
                    
                </div>
            )}
        >
            <div className={styles['ability-block-container']}>
                <div
                    onClick={handleAbiliyBlockClick}
                    style={{backgroundImage: icon}}
                    className={classnames(styles['ability-block'], {
                        [styles['selected-block']]: selectedAbility === id,
                        [styles['clickable']]: !isOwned && !isDisabled
                    })}
                >
                    <div
                        style={{boxShadow: !isOwned ? `inset 0 0px 3px ${Math.ceil(40*cooldown/maxCooldown)}px rgba(0, 0, 0, 0.8)` : 'inset 0 0px 3px 40px rgba(255, 223, 0, 0.35'}}
                        className={classnames(styles['filler-block'], {
                            [styles['filler-block__disabled']]: !isOwned && isDisabled
                        })}
                    />
                </div>
            </div>
        </Popover>
    )
}