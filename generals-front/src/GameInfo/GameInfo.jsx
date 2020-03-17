import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { playersSelector, userColorsSelector } from '../storage/game/game.selector'
import styles from './GameInfo.module.scss'

export default () => {
    const user = useSelector(userSelector)
    const players = useSelector(playersSelector)
    const userColors = useSelector(userColorsSelector)

    return (
        <div className={styles['info-panel']}>
            <div className={styles['room-header']}>
                {user.roomId}
            </div>
            {
                players.map(v => (
                    <div key={v.socketId} className={styles['player-item']}>
                        <div
                            className={styles['color-box']}
                            style={{background: userColors[v.socketId]}}
                        />
                        {`${v.userName}`}
                    </div>
                ))
            }
        </div>
    )
}