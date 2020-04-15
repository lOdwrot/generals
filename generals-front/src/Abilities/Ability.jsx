import React from 'react'
import { Popover } from 'antd'
import styles from './Abilities.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { setAbilitySelection } from '../storage/game/game.action'

export default ({
    ability,
    handleClick,
    disabled=false,
    selectedAbility
}) => {
    const dispatch = useDispatch()
    const { name, description, icon, id} = ability
    return (
        <Popover 
            title={name}
            placement="rightTop"
            content={(
                <div className={styles['ability-description-box']}>
                    {description}
                </div>
            )}
        >
            <div
                onClick={() => {
                    if(selectedAbility === id) dispatch(setAbilitySelection(null))
                    else !disabled && handleClick()
                }}
                style={{backgroundImage: icon}}
                className={classnames(styles['ability-block'], {
                    [styles['selected-block']]: selectedAbility === id,
                })}
            />
        </Popover>
    )
}