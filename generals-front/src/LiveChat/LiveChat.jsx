import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { messagesSelector } from '../storage/messages/messages.selector'
import { sendMessage } from '../socket/socketManager'
import styles from './LiveChat.module.scss'
import { Input, Button } from 'antd'
import { userSelector } from '../storage/user/user.selector'
import classnames from 'classnames'

export default () => {
    const [newMessage, setNewMessage] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isHighlighted, setIsHighlighted] = useState(true)
    const user = useSelector(userSelector)
    const messages = useSelector(messagesSelector)

    useEffect(() => {
        if(!isVisible && !isHighlighted && messages.length){
            setIsHighlighted(true)
        }
    }, [messages])

    const handleSendMessage = () => {
        sendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <div className={styles['chat-wrapper']}>
            <div 
                onClick={() => {
                    setIsVisible(!isVisible)
                    setIsHighlighted(false)
                }}
                className={classnames(styles['chat-header'], {
                    [styles['chat-header-attention']]: isHighlighted
                })}>
                Room Chat
            </div>
            {
                isVisible &&
                <div>
                    <div className={styles['chat-history']}>
                        {
                            messages.map((v, index) => <div key={index}>{v}</div>)
                        }
                        {
                            !user.roomId && <div style={{color: 'red'}}>Join to room to use Room Chat</div>
                        }
                    </div>
                    <div className={styles['new-message']}>
                        <Input 
                            onKeyDown={(e) => {
                                e.key === 'Enter' && handleSendMessage()
                            }}
                            placeholder='Message....'
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}