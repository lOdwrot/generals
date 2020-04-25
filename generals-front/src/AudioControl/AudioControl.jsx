import React, { useState } from 'react'
import styles from './AudioControl.module.scss'
import { Button, Slider } from 'antd'
import { SoundOutlined, CommentOutlined } from '@ant-design/icons'
import { setVolume } from '../audioPlayer/audioPlayer'
import * as ap from '../audioPlayer/audioPlayer'

export default () => {
    const [vloumeLevel, setVloumeLevel] = useState(50)
    const [vloumeLevel2, setVloumeLevel2] = useState(50)

    const handleSetVolumeLevel = (level) => {
        setVloumeLevel(level)
        setVolume(level / 100)
    } 

    const handleSetVolumeLevel2 = (level) => {
        setVloumeLevel2(level)
        ap.setVolume2(level / 100)
    } 

    return (
        <div className={styles['audio-panel']}>
            <div className={styles['controller']}>
                <Button
                    onClick={() => handleSetVolumeLevel(vloumeLevel ? 0 : 100)}
                    icon={<SoundOutlined />}
                />
                <div className={styles['slider-wrapper']}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={handleSetVolumeLevel}
                        value={vloumeLevel}
                    />
                </div>
            </div>
            <div className={styles['controller']}>
                <Button
                    onClick={() => handleSetVolumeLevel2(vloumeLevel2 ? 0 : 100)}
                    icon={<CommentOutlined />}
                />
                <div className={styles['slider-wrapper']}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={handleSetVolumeLevel2}
                        value={vloumeLevel2}
                    />
                </div>
            </div>
            {/* <div>
                <Button onClick={() => ap.playArcheriesReady()}>playBattleMusic2</Button>
                <Button onClick={() => ap.playPlowingFieldConfirmation()}>playPlowingFieldConfirmation</Button>
                <Button onClick={() => ap.playCrownFinder()}>playCrownFinder</Button>
            </div> */}
        </div>
    )
}