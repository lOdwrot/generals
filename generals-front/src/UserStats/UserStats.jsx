import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { playersSelector } from '../storage/game/game.selector'
import styles from './UserStats.module.scss'

export default () => {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const players = useSelector(playersSelector)

    useEffect(() => {
        window.addEventListener('keyup', ({key}) => key === 'Tab' && setIsModalOpened(false))
        window.addEventListener('keydown', ({key}) => key === 'Tab' && setIsModalOpened(true))
    }, [])

    return (
        <Modal
            closable={false}
            title="Stats"
            visible={isModalOpened}
            footer={[]}
        >
           {
               !players.length && 'No players in room'
           }
           {
                !!players.length &&
                <div>
                    <div className={styles['row']}>
                        <div>Name</div>
                        <div>Wins</div>
                        <div>Failures</div>
                    </div>
                    {
                        players
                            .sort(v => v.wins)
                            .map(v => (
                                <div key={v.socketId} className={styles['row']}>
                                    <div>{v.userName}</div>
                                    <div>{v.wins}</div>
                                    <div>{v.failures}</div>
                                </div>
                            ))
                    }
                </div>
           }
        </Modal>
    )
}