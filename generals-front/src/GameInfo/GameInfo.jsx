import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../storage/user/user.selector'
import { playersSelector } from '../storage/game/game.selector'

export default () => {
    const user = useSelector(userSelector)
    const players = useSelector(playersSelector)

    return (
        <div>
            Players In Room {user.roomId}
            {
                players.map(v => <div key={v.socketId}>{`${v.userName} (${v.socketId})`}</div>)
            }
        </div>
    )
}