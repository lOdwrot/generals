import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { createRoom, joinToRoom } from '../socket/socketManager';
import { useDispatch } from 'react-redux'
import { setUserName } from '../storage/user/user.action';
import GameInfo from '../GameInfo/GameInfo';

export default () => {
    const dispatch = useDispatch()
    const [roomId, setRoomId] = useState('')
    return (
        <>
            <div>
                <Input
                    onChange={e => dispatch(setUserName(e.target.value))}
                    placeholder='User Name'
                />
            </div>
            <div>
                <Button onClick={createRoom}>Create Room</Button>
                <div style={{display: 'flex', width: '300px'}}>
                    <Input 
                        placeholder='Room ID' 
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <Button onClick={() => joinToRoom(roomId)}>
                        Joint To Room
                    </Button>

                </div>
            </div>
            <GameInfo/>
        </>
    )
}