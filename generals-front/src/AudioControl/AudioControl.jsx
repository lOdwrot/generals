import React, { useState } from 'react'
import styles from './AudioControl.module.scss'
import { Button, Slider } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
import { setVolume } from '../audioPlayer/audioPlayer'
import * as ap from '../audioPlayer/audioPlayer'

export default () => {
    const [vloumeLevel, setVloumeLevel] = useState(50)

    const handleSetVolumeLevel = (level) => {
        setVloumeLevel(level)
        setVolume(level / 100)
    } 

    return (
        <div className={styles['audio-panel']}>
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
            {/* <div>
                <Button onClick={() => ap.playArcheriesReady()}>playBattleMusic2</Button>
                <Button onClick={() => ap.playPlowingFieldConfirmation()}>playPlowingFieldConfirmation</Button>
                <Button onClick={() => ap.playCrownFinder()}>playCrownFinder</Button>
            </div> */}
        </div>
    )
}