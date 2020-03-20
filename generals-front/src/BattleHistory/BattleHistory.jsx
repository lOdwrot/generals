import React, { useState } from 'react'
import { historySelector, historyUserColorsSelector } from '../storage/history/history.selector'
import { useSelector } from 'react-redux'
import styles from './BattleHistory.module.scss'
import Board from '../Game/Board'
import { Slider, Button } from 'antd'
import useRefState from '../hooks/useRefState'

export default () => {
    const history = useSelector(historySelector)
    const historyUserColors = useSelector(historyUserColorsSelector)
    const [tourIndex, tourIndexRef, setTourIndex] = useRefState(0)
    const [board, setBoard] = useState(history[0])
    const [speed, speedRef, setSpeed] = useState(5)
    const [isAutoPlay, setIsAutoPlay] = useState(false)

    const incrementBoard = () => {
        const nextBoard = history[tourIndexRef.current + 1]
        if(!nextBoard) return false
        setBoard(nextBoard)
        setTourIndex(tourIndexRef.current + 1)
        return true
    }

    const autoFrma = () => {
        if(incrementBoard()) setTimeout(() => {
            autoFrma()
        }, 1/speedRef.current)
    }

    return (
        <>
            <div className={styles['speed-slider']}>
                <Slider
                    max={10}
                    step={1}
                    value={speed}
                    onChange={setSpeed}
                />
                <div>
                    Speed x {speed}
                </div>
                <Button
                    disabled={isAutoPlay}
                    onClick={() => {
                        setIsAutoPlay(true)
                        autoFrma()
                    }}
                >
                    Auto Play
                </Button>
            </div>
            {
                board &&
                <Board
                    overridedBoard={board}
                    overridedUserColors={historyUserColors}
                />
            }
        </>
    )
}