import React from 'react'
import styles from './Settings.module.scss'
import { Slider, Form, Divider, Select, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { gameSettingsSelector } from '../storage/settings/settings.selector'
import { modifyGameSetting } from '../storage/settings/settings.action'
import { userSelector } from '../storage/user/user.selector'
import {debounce} from 'lodash'
import { setRoomSettings, startGame } from '../socket/socketManager'
import store from '../storage/store'
import { playersSelector } from '../storage/game/game.selector'

const FormItem = Form.Item
const Option = Select.Option

const AVAILABLE_GAME_MODES = [
    {name: 'Conquest', description: 'Capture all opponent capitols'}
]
const DISABLED_GAME_MODES = [
    {name: 'Units Collector', descroption: 'Gather the biggest army in whole state'}, 
    {name: 'King of Castles', descroption: 'Capture the castles around the whole world'}, 
    {name: 'Territory Wars', descroption: 'Rule the whole world'}, 
]

const notifySettingsChange = debounce(
    (settings) =>  setRoomSettings(settings),
    500
)

export default () => {
    const settings = useSelector(gameSettingsSelector)
    const user = useSelector(userSelector)
    const players = useSelector(playersSelector)
    const dispatch = useDispatch()
    const isHost = user.socketId === players[0]?.socketId

    const {
        mapWidth,
        mapHeight,
        gameMode,
        nonAggression,
        castlesDensity,
        mountainDensity,
        castleProduction,
        fieldProduction,
        turnDuration,
    } = settings

    const handleChangeSetting = (settingName, value) => {
        dispatch(modifyGameSetting(settingName, value))
        notifySettingsChange(gameSettingsSelector(store.getState()))
    }

    const handleStartBattle = () => startGame(settings)

    if(!user.roomId) return null

    return (
        <div className={styles['settings-wrapper']}>
            <div className={styles['settings-content-box']}>
                <Button
                    onClick={() => handleStartBattle()}
                    type={"primary"}
                    style={{width: '300px', marginTop: '10px'}}
                    disabled={!isHost}
                >
                    Battle!
                </Button>
                <div className={styles['settings-list']}>
                    <Divider>Only Host Can Modify This Settings</Divider>
                    <Divider>Map Dimmensions</Divider>
                    <div>
                        <FormItem help={`Map Width: ${mapWidth}`}>
                            <Slider
                                disabled={!isHost}
                                min={15}
                                max={45}
                                value={mapWidth}
                                onChange={(v) => handleChangeSetting('mapWidth', v)}
                            />
                        </FormItem>
                        <FormItem help={`Map Height: ${mapHeight}`}>
                            <Slider
                                disabled={!isHost}
                                min={15}
                                max={45}
                                value={mapHeight}
                                onChange={(v) => handleChangeSetting('mapHeight', v)}
                            />
                        </FormItem>
                    </div>
                    <Divider>Game Rules</Divider>
                        <FormItem help='Game Mode'>
                            <Select
                                disabled={!isHost}
                                value={gameMode}
                                onChange={(v) => handleChangeSetting('gameMode', v)}
                            >
                                {
                                    AVAILABLE_GAME_MODES.map(v => <Option value={v.name} key={v.name}>{v.name}</Option>)
                                }
                                {
                                    DISABLED_GAME_MODES.map(v => <Option value={v.name} key={v.name} disabled={true}>{v.name}</Option>)
                                }
                            </Select>
                        </FormItem>
                        <FormItem help={`Duration Of Non-Aggression Pact: ${nonAggression}`}>
                            <Slider
                                disabled={!isHost}
                                min={0}
                                max={300}
                                step={10}
                                value={nonAggression}
                                onChange={(v) => handleChangeSetting('nonAggression', v)}
                            />
                        </FormItem>
                    <Divider>Map Objects</Divider>
                    <div>
                        <FormItem help={`Castles Density: ${castlesDensity}`}>
                            <Slider
                                disabled={!isHost}
                                min={0}
                                max={1}
                                step={0.1}
                                value={castlesDensity}
                                onChange={(v) => handleChangeSetting('castlesDensity', v)}
                            />
                        </FormItem>
                        <FormItem help={`Mountains Density: ${mountainDensity}`}>
                            <Slider
                                disabled={!isHost}
                                min={0}
                                max={1}
                                step={0.1}
                                value={mountainDensity}
                                onChange={(v) => handleChangeSetting('mountainDensity', v)}
                            />
                        </FormItem>
                    </div>
                    <Divider>Other</Divider>
                    <div>
                        <FormItem help={`Castles Units Production Time: ${castleProduction}`}>
                            <Slider
                                disabled={!isHost}
                                min={1}
                                max={60}
                                step={1}
                                value={castleProduction}
                                onChange={(v) => handleChangeSetting('castleProduction', v)}
                            />
                        </FormItem>
                        <FormItem help={`Field Units Production Time: ${fieldProduction}`}>
                            <Slider
                                disabled={!isHost}
                                min={1}
                                max={60}
                                step={1}
                                value={fieldProduction}
                                onChange={(v) => handleChangeSetting('fieldProduction', v)}
                            />
                        </FormItem>
                        <FormItem help={`Resp Turn Duration: ${turnDuration} ms`}>
                            <Slider
                                disabled={!isHost}
                                min={250}
                                max={3000}
                                step={250}
                                value={turnDuration}
                                onChange={(v) => handleChangeSetting('turnDuration', v)}
                            />
                        </FormItem>
                    </div>
                </div>
            </div>
        </div>
    )
}