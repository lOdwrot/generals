import React, { useEffect } from 'react'
import styles from './AudioControl.module.scss'
import { Button, Slider } from 'antd'
import { SoundOutlined, CommentOutlined } from '@ant-design/icons'
import * as ap from '../audioPlayer/audioPlayer'
import useLocalStorage from './../hooks/useLocalStorage';

export default () => {
    const [volumeLevel, setVolumeLevel] = useLocalStorage('volume1', 50)
    const [volumeLevel2, setVolumeLevel2] = useLocalStorage('volume2', 100)
    useEffect(
        () => {
            ap.setVolume(volumeLevel / 100)
            ap.setVolume2(volumeLevel2 / 100)
        }, [volumeLevel, volumeLevel2]
    )

    return (
        <div className={styles['audio-panel']}>
            <div className={styles['controller']}>
                <Button
                    onClick={() => setVolumeLevel2(volumeLevel2 ? 0 : 100)}
                    icon={<CommentOutlined />}
                />
                <div className={styles['slider-wrapper']}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={setVolumeLevel2}
                        value={volumeLevel2}
                    />
                </div>
            </div>
            <div className={styles['controller']}>
                <Button
                    onClick={() => setVolumeLevel(volumeLevel ? 0 : 100)}
                    icon={<SoundOutlined />}
                />
                <div className={styles['slider-wrapper']}>
                    <Slider
                        min={0}
                        max={100}
                        onChange={setVolumeLevel}
                        value={volumeLevel}
                    />
                </div>
            </div>
        </div>
    )
}