import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { createRoom, joinToRoom } from '../socket/socketManager';
import { useDispatch, useSelector } from 'react-redux'
import { setUserName } from '../storage/user/user.action';
import styles from './Lobby.module.scss'
import { userSelector } from '../storage/user/user.selector';
import RoomTeams from '../RoomTeams/RoomTeams';

const FormItem = Form.Item

export default () => {
    const dispatch = useDispatch()
    const [roomId, setRoomId] = useState('')
    const [isNameConfirmed, setIsNameConfirmed] = useState(false)
    const user = useSelector(userSelector)
    const isAllDisabled = !!user.roomId
    
    return (
        <div className={styles['lobby-wrapper']}>
            <div className={styles['lobby-content-box']}>
                <h3 className={styles['header']}>Overlight Generals: Kings Alliance</h3>
                <FormItem help='User Name'>
                    <div style={{display: 'flex'}}>
                        <Input
                            onChange={e => dispatch(setUserName(e.target.value))}
                            value={user.userName}
                            placeholder='User Name'
                            disabled={isNameConfirmed || isAllDisabled}
                        />

                        {
                            !user.roomId &&
                            <Button 
                                type='primary'
                                disabled={isNameConfirmed || isAllDisabled}
                                onClick={() => setIsNameConfirmed(true)}
                            >
                                Confirm
                            </Button>
                        }
                    </div>
                </FormItem>
                {
                    !user.roomId &&
                    <div>
                        <Button
                            disabled={user.roomId}
                            onClick={createRoom}
                            style={{width: '255px'}}
                        >
                            Create Room
                        </Button>
                    </div>
                }
                {
                    !user.roomId &&
                    <div>
                        <FormItem help={'Room ID to join'}>
                            <div style={{display: 'flex'}}>
                                <Input 
                                    placeholder='Room ID' 
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                                <Button onClick={() => joinToRoom(roomId)}>
                                    Join
                                </Button>
                            </div>
                        </FormItem>
                    </div>
                }

                {
                    user.roomId && <RoomTeams/>
                }
            </div>
        </div>
    )
}