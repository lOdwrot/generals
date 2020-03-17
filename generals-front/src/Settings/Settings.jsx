import React from 'react'
import styles from './Settings.module.scss'
import { Slider, Form, Divider, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { gameSettingsSelector } from '../storage/settings/settings.selector'
import { modifyGameSetting } from '../storage/settings/settings.action'
import { userSelector } from '../storage/user/user.selector'

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

export default () => {
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
    } = useSelector(gameSettingsSelector)
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const handleChangeSetting = (settingName, value) => dispatch(modifyGameSetting(settingName, value))

    if(!user.roomId) return null
    
    return (
        <div className={styles['settings-wrapper']}>
            <div className={styles['settings-content-box']}>
                <Divider>Only Host Can Modify This Settings</Divider>
                <Divider>Map Dimmensions</Divider>
                <div>
                    <FormItem help={`Map Width: ${mapWidth}`}>
                        <Slider
                            min={15}
                            max={40}
                            value={mapWidth}
                            onChange={(v) => handleChangeSetting('mapWidth', v)}
                        />
                    </FormItem>
                    <FormItem help={`Map Height: ${mapHeight}`}>
                        <Slider
                            min={15}
                            max={40}
                            value={mapHeight}
                            onChange={(v) => handleChangeSetting('mapHeight', v)}
                        />
                    </FormItem>
                </div>
                <Divider>Game Rules</Divider>
                    <FormItem help='Game Mode'>
                        <Select
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
                            min={0}
                            max={1}
                            step={0.1}
                            value={castlesDensity}
                            onChange={(v) => handleChangeSetting('castlesDensity', v)}
                        />
                    </FormItem>
                    <FormItem help={`Mountains Density: ${mountainDensity}`}>
                        <Slider
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
                            min={1}
                            max={60}
                            step={1}
                            value={castleProduction}
                            onChange={(v) => handleChangeSetting('castleProduction', v)}
                        />
                    </FormItem>
                    <FormItem help={`Field Units Production Time: ${fieldProduction}`}>
                        <Slider
                            min={1}
                            max={60}
                            step={1}
                            value={fieldProduction}
                            onChange={(v) => handleChangeSetting('fieldProduction', v)}
                        />
                    </FormItem>
                    <FormItem help={`Turn Duration: ${turnDuration} ms`}>
                        <Slider
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
    )
}