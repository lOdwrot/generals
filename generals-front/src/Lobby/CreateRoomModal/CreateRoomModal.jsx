import React from 'react'
import { useState } from 'react'
import { Select, Form, Button, Modal, Checkbox } from 'antd';
import styles from './CreateRoomModal.module.scss'
import { createRoom } from '../../socket/socketManager';

const { Option } = Select;
const FormItem = Form.Item;
const possiblePlayerNumbers = Array(14).fill(null).map((v, index) => index + 2)

export default ({userName}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isRoomPublic, setIsRoomPublic] = useState(true)
    const [maxPlayers, setMaxPlayers] = useState(4)

    const showModal = () => setIsModalOpen(true)
    const confirmRoomCreation = () => {
        createRoom(userName, isRoomPublic, maxPlayers)
        setIsModalOpen(false)
    }

    return (
        <>
            <Button 
                disabled={!userName}
                type="primary" 
                onClick={showModal}
            >
                Create Room
            </Button>
            <Modal
                closable={false}
                visible={isModalOpen}
                title='Create Room'
                onOk={confirmRoomCreation}
                onCancel={() => setIsModalOpen(false)}
            >
                <div className={styles['new-room-parameters']}>
                    <FormItem help='Is Public'>
                        <Checkbox 
                            checked={isRoomPublic}
                            onChange={(e) => setIsRoomPublic(e.target.value)}>
                        </Checkbox>
                    </FormItem>
                    <FormItem help='Maximum Players'>
                        <Select 
                            value={maxPlayers} 
                            onChange={v => setMaxPlayers(v)}
                        >
                            {
                                possiblePlayerNumbers.map(v => <Option value={v} key={v}>{v}</Option>)
                            }
                        </Select>
                    </FormItem>
                    
                </div>
            </Modal>
      </>
    )
}
