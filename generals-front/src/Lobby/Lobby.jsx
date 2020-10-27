import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import { joinToRoom } from '../socket/socketManager';
import { useSelector } from 'react-redux'
import styles from './Lobby.module.scss'
import { userSelector } from '../storage/user/user.selector';
import RoomTeams from '../RoomTeams/RoomTeams';
import useLocalStorage from '../hooks/useLocalStorage';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import ButtonGroup from 'antd/lib/button/button-group';
import JoinRoomModal from './JoinRoomModal/JoinRoomModal';

const FormItem = Form.Item

export default () => {
    const [userName, setUserName] = useLocalStorage('userName', 'King')
    const [isNameConfirmed, setIsNameConfirmed] = useState(false)
    const user = useSelector(userSelector)
    const isAllDisabled = !!user.roomId

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
                    <div style={{marginBottom: '25px'}}>
                        <ButtonGroup>
                            <CreateRoomModal
                                userName={userName}
                            />
                            <JoinRoomModal
                                userName={userName}
                            />
                        </ButtonGroup>
                    </div>
                }
                {
                    user.roomId && <RoomTeams/>
                }
            </div>
        </div>
    )
}