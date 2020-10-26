import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import { createRoom, joinToRoom } from '../socket/socketManager';
import { useSelector } from 'react-redux'
import styles from './Lobby.module.scss'
import { userSelector } from '../storage/user/user.selector';
import RoomTeams from '../RoomTeams/RoomTeams';
import useLocalStorage from '../hooks/useLocalStorage';

const FormItem = Form.Item

export default () => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useLocalStorage('userName', 'King')
    const [isNameConfirmed, setIsNameConfirmed] = useState(false)
    const user = useSelector(userSelector)
    const isAllDisabled = !!user.roomId
    console.log('UserName ', userName)
    useEffect(() => {
        !user.roomId &&
        window.location.pathname.length > 1 && 
        joinToRoom(window.location.pathname.slice(1), userName)
    }, [])
    
    return (
        <div className={styles['lobby-wrapper']}>
            <div className={styles['lobby-content-box']}>
                <img alt='logo' src='/logo.png' className={`${styles['logo']}  ${styles['logo-left']}`}/>
                <img alt='logo' src='/logo.png' className={`${styles['logo']}  ${styles['logo-right']}`}/>
                <h3 className={styles['header']}>
                    Overlight Generals <br/>
                    <span className={styles['subtytle']}>Kings Alliance</span>
                </h3>
                <FormItem help='User Name'>
                    <div style={{display: 'flex'}}>
                        <Input
                            onChange={e => setUserName(e.target.value)}
                            value={userName}
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
                            onClick={() => createRoom(userName)}
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
                                <Button onClick={() => joinToRoom(roomId, userName)}>
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