import React from 'react'
import { useSelector } from 'react-redux'
import { playersSelector } from '../storage/game/game.selector'
import styles from './RoomTeams.module.scss'
import { Button } from 'antd'
import { userSelector } from '../storage/user/user.selector'
import { changeTeam } from '../socket/socketManager'

export default () => {
    const players = useSelector(playersSelector)
    const user = useSelector(userSelector)

    return (
        <>  
            <div className={styles['room-name']}>Room: {user.roomId}</div>
            <div className={styles['rooms-wrapper']}>
                {
                    players.map((v, index) => (
                        <div key={index}>
                            <div className={styles['room-name']}>Team {index}</div>
                            <div>
                                <div className={styles['players-block']}>
                                    {
                                        players
                                            .filter(v => v.teamId === index)
                                            .map(v => <div key={v.socketId}>{v.userName}</div>)
                                    }
                                </div>
                                <Button
                                    onClick={() => changeTeam(index)}
                                    disabled={user.teamId === index}
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}