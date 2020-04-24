import {sample} from 'lodash'
import store from '../storage/store'
import { playerRoleSelector } from '../storage/game/game.selector'

const BATTLE_START_MUSIC =  `${process.env.PUBLIC_URL}/battleStart1.mp3`
const OPENING_MUSIC =  `${process.env.PUBLIC_URL}/open.mp3`
const WELCOME_DIALOG =  `${process.env.PUBLIC_URL}/dialogs/Welcome.wav`
const CAPTURE_CAPITOL_SOUND = `${process.env.PUBLIC_URL}/cnquest.mp3`

const PEACFULL_MUSIC = `${process.env.PUBLIC_URL}/peacefullMusic.mp3`
const PEACFULL_MUSIC2 = `${process.env.PUBLIC_URL}/peacefullMusic2.mp3`
const PEACFULL_MUSIC3 = `${process.env.PUBLIC_URL}/peacefullMusic3.mp3`
const PEACFULL_MUSIC4 = `${process.env.PUBLIC_URL}/peacefullMusic4.mp3`
const PEACFULL_BACKGROUNDS = [PEACFULL_MUSIC, PEACFULL_MUSIC2, PEACFULL_MUSIC3, PEACFULL_MUSIC4]

const BATTLE_MUSIC = `${process.env.PUBLIC_URL}/battleMusic.mp3`

const LOST_MUSIC = `${process.env.PUBLIC_URL}/lost.mp3`
const WON_MUSIC = `${process.env.PUBLIC_URL}/won.mp3`

export const playStartMusic = () => playMusic(OPENING_MUSIC)
export const playStartDialog = () => playDialog(WELCOME_DIALOG)
export const playOpeningMusic = () => {
    setTimeout(playStartDialog, 1000)
    setTimeout(playStartMusic, 5000)
}
export const playBattleStartMusic = () => playMusic(BATTLE_START_MUSIC)
export const playCaptureCapitolSound = () => playDialog(CAPTURE_CAPITOL_SOUND)

export const playPeacfullBackgoundMusic = () => playMusic(sample(PEACFULL_BACKGROUNDS))
export const playBattleMusic = () => playMusic(BATTLE_MUSIC)

const BATTLE_MUSIC2 = `${process.env.PUBLIC_URL}/battleMusic2.mp3`
export const playBattleMusic2 = () => playMusic(BATTLE_MUSIC2)

export const playLostMusic = () => playMusic(LOST_MUSIC)
export const playWinMusic = () => playMusic(WON_MUSIC)

// commands
const REBORN_DIALOG = `${process.env.PUBLIC_URL}/dialogs/RiseFromAshes.wav`
export const playRebornDialog = () => playDialog(REBORN_DIALOG)

const PLOWING_FIELD1 = `${process.env.PUBLIC_URL}/dialogs/PlowingField1.wav`
const PLOWING_FIELD2 = `${process.env.PUBLIC_URL}/dialogs/PlowingField2.wav`
export const playPlowingFieldConfirmation = () => playDialog(sample([PLOWING_FIELD1, PLOWING_FIELD2]))

const MOVE_CAPITOL = `${process.env.PUBLIC_URL}/dialogs/MoveCapitol.wav`
export const playMoveCapitolConfirmation = () => playDialog(MOVE_CAPITOL)

const UNITE_ARMY = [
    `${process.env.PUBLIC_URL}/dialogs/UniteArmy1.wav`,
    `${process.env.PUBLIC_URL}/dialogs/UniteArmy2.wav`,
    `${process.env.PUBLIC_URL}/dialogs/UniteArmy3.wav`,
    `${process.env.PUBLIC_URL}/dialogs/UniteArmy4.wav`
]
export const playUniteArmyConfirmation = () => playDialog(sample(UNITE_ARMY))

const DEFENDER = [
    `${process.env.PUBLIC_URL}/dialogs/Defender1.wav`,
    `${process.env.PUBLIC_URL}/dialogs/Defender2.wav`,
    `${process.env.PUBLIC_URL}/dialogs/Defender3.wav`,
    `${process.env.PUBLIC_URL}/dialogs/Defender4.wav`,
]
export const playDefenderConfirmation = () => playDialog(sample(DEFENDER))

const CONQUER_CAPITOL = `${process.env.PUBLIC_URL}/dialogs/ConquerCapitol.wav`
export const playConquerCapitol = () => playDialog(CONQUER_CAPITOL)

const LOST_CAPITOL = `${process.env.PUBLIC_URL}/dialogs/LostCapitol.wav`
export const playLostCapitol = () => playDialog(LOST_CAPITOL)

const CONQUER_CASTLE = [
    `${process.env.PUBLIC_URL}/dialogs/ConquerCastle.wav`,
    `${process.env.PUBLIC_URL}/dialogs/ConquerCastle2.wav`
]
export const playConquerCastle = () => playDialog(sample(CONQUER_CASTLE))

const ARCHERY_SELECT = [
    `${process.env.PUBLIC_URL}/dialogs/ArchPrepare1.wav`,
    `${process.env.PUBLIC_URL}/dialogs/ArchPrepare2.wav`,
]
export const playArcheriesReady = () => playDialog2(sample(ARCHERY_SELECT))

const AUTUMN_SELECT = [
    `${process.env.PUBLIC_URL}/dialogs/5gSelect.wav`,
    `${process.env.PUBLIC_URL}/dialogs/5gSelect2.wav`
]
export const playAutumnSelect = () => playDialog2(sample(AUTUMN_SELECT))

const AUTUMN_EFFECT = `${process.env.PUBLIC_URL}/dialogs/5gEffect.mp3`
export const playAutumnEffect = () => playDialog(AUTUMN_EFFECT)

const CROWN_FINDER = `${process.env.PUBLIC_URL}/dialogs/FindCapitol.wav`
export const playCrownFinder = () => playDialog(CROWN_FINDER)

const ARCHERY_SHOOTED = [
    `${process.env.PUBLIC_URL}/dialogs/ArchShooted1.wav`,
    `${process.env.PUBLIC_URL}/dialogs/ArchShooted2.wav`,
    `${process.env.PUBLIC_URL}/dialogs/ArchShooted3.wav`,
    `${process.env.PUBLIC_URL}/dialogs/ArchShooted4.wav`,
]
export const playArcheryShooted = () => playDialog(sample(ARCHERY_SHOOTED))

var audio
var dialogsAudio
var dialogsAudio2
var volume = 0.5

const playMusic = (audioPath) => {
    if(!audio) {
        audio = new Audio()
        audio.onended = () => playerRoleSelector(store.getState()) === 'fighter' && playBattleMusic2()
    }
    audio.pause()
    audio.src = audioPath
    audio.load()
    audio.volume = volume
    audio.play()
}

const playDialog = (audioPath) => {
    console.log('Playing: ', audioPath)
    if(!dialogsAudio) dialogsAudio = new Audio()
    dialogsAudio.pause()
    dialogsAudio.src = audioPath
    dialogsAudio.load()
    dialogsAudio.volume = volume
    dialogsAudio.play()
}

const playDialog2 = (audioPath) => {
    console.log('Playing2: ', audioPath)
    if(!dialogsAudio2) dialogsAudio2 = new Audio()
    dialogsAudio2.pause()
    dialogsAudio2.src = audioPath
    dialogsAudio2.load()
    dialogsAudio2.volume = volume
    dialogsAudio2.play()
}

export const stopSounds = () => {
    if(audio) audio.pause()
    if(dialogsAudio) dialogsAudio.pause()
    if(dialogsAudio2) dialogsAudio2.pause()
}

export const setVolume = (level) => {
    volume = level

    if(audio) audio.volume = volume
    if(dialogsAudio) dialogsAudio.volume = volume
    if(dialogsAudio2) dialogsAudio2.volume = volume
}