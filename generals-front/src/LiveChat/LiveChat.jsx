import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { messagesSelector } from '../storage/messages/messages.selector'
import { sendMessage } from '../socket/socketManager'
import styles from './LiveChat.module.scss'
import { Input, Button } from 'antd'

export default () => {
    const [newMessage, setNewMessage] = useState('')
    const messages = useSelector(messagesSelector)

    const handleSendMessage = () => {
        sendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <div className={styles['chat-wrapper']}>
            <div className={styles['chat-history']}>
                {
                    messages.map((v, index) => <div key={index}>{v}</div>)
                }
            </div>
            <div className={styles['new-message']}>
                <Input 
                    placeholder='Message....'
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage}>
                    Send Message
                </Button>
            </div>
        </div>
    )
}