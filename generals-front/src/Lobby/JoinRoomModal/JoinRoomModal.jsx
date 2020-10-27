import React, { useState } from 'react'
import { Button, Divider, Input, Modal } from 'antd';
import { joinToGameSearch, joinToRoom, leaveGameSearch } from './../../socket/socketManager';
import styles from './JoinRoomModal.module.scss'

export default ({userName}) => {
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [rooms, setRooms] = useState([])
     const [roomId, setRoomId] = useState('')

    const showModal = () => {
        setRooms([])
        setRoomId('')
        joinToGameSearch((rooms) => {
            console.log('Rooms update', rooms)
            setRooms(rooms)
        })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        leaveGameSearch()
    }

    const joinToRoomById = (roomId) => {
        joinToRoom(roomId, userName)
        closeModal()
    }

     return (
        <>
            <Button
                disabled={!userName}
                type="primary" 
                onClick={showModal}
            >
                Join Room
            </Button>
            <Modal
                closable={false}
                visible={isModalOpen}
                title='Join To Room'
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>
                ]}
            >
                <div className={styles['available-rooms-container']}>
                    <div className={styles['info-row']}>
                        <div>Room Id</div>
                        <div>Players</div>
                        <div/>
                    </div>
                    {
                        rooms.map((v, index) => (
                            <div key={index} className={styles['info-row']}>
                                <div>{v.roomId}</div>
                                <div>{`${v.users.length} / ${v.maxPlayers}`}</div>
                                <div>
                                    <Button onClick={() => joinToRoomById(v.roomId)}>
                                        Join
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    !!rooms.length &&
                    <Divider/>
                }
                <div>
                    <div style={{display: 'flex', marginTop: '10px'}}>
                        <Input
                            placeholder='Room ID' 
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <Button onClick={() => joinToRoomById(roomId)}>
                            Join
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
     )
}