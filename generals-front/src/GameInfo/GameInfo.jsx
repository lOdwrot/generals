import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { playersSelector, userColorsSelector, usersStatsSelector, tourCounterSelector, playerRoleSelector } from '../storage/game/game.selector'
import classnames from 'classnames'
import styles from './GameInfo.module.scss'
import { Button } from 'antd'
import { setPlayerRole } from '../storage/game/game.action'
import { gameSettingsSelector } from '../storage/settings/settings.selector'

export default () => {
    const players = useSelector(playersSelector)
    const userColors = useSelector(userColorsSelector)
    const userStats = useSelector(usersStatsSelector)
    const tour = useSelector(tourCounterSelector)
    const playerRole = useSelector(playerRoleSelector)
    const {nonAggression} = useSelector(gameSettingsSelector)
    const dispatch = useDispatch()

    const handleClickLobby = () => dispatch(setPlayerRole('lobby'))

    return (
        <div className={styles['info-panel']}>
            <div className={classnames(styles['grid-container'])}>
                <div/>
                <div className={styles['room-header']}>
                    Player
                </div>
                <div>Army</div>
                <div>Lands</div>
                {
                    players.map(v => (
                        <React.Fragment key={v.socketId}>
                            <div>
                                <div
                                    className={styles['color-box']}
                                    style={{background: userColors[v.socketId]}}
                                />
                            </div>
                            <div>
                                {`${v.userName}`}
                            </div>
                            <div>
                                {userStats[v.socketId]?.units || 0}
                            </div>
                            <div>
                                {userStats[v.socketId]?.lands || 0}
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
            <div>
                Tour: {tour} / {nonAggression}
            </div>
            <div>
                {
                    playerRole === 'spectator' &&
                    <Button
                        onClick={handleClickLobby}
                        type={"danger"}
                        style={{width: '100%'}}
                    >
                        Back To Lobby!
                    </Button>
                }
            </div>
        </div>
    )
}