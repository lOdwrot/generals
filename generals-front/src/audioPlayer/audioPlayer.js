import {sample} from 'lodash'

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


export const playOpeningMusic = () => {
    setTimeout(() => playDialog(WELCOME_DIALOG), 1000)
    setTimeout(() => playMusic(OPENING_MUSIC), 4500)
}
export const playBattleStartMusic = () => playMusic(BATTLE_START_MUSIC)
export const playCaptureCapitolSound = () => playDialog(CAPTURE_CAPITOL_SOUND)

export const playPeacfullBackgoundMusic = () => playMusic(sample(PEACFULL_BACKGROUNDS))
export const playBattleMusic = () => playMusic(BATTLE_MUSIC)

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

var audio
var dialogsAudio
var volume = 0.5

const playMusic = (audioPath) => {
    if(audio) audio.pause()
    audio = new Audio(audioPath)
    audio.volume = volume
    audio.play()
}

const playDialog = (audioPath) => {
    if(dialogsAudio) dialogsAudio.pause()
    dialogsAudio = new Audio(audioPath)
    dialogsAudio.volume = volume
    dialogsAudio.play()
}

export const stopSounds = () => {
    if(audio) audio.pause()
    if(dialogsAudio) dialogsAudio.pause()
}

export const setVolume = (level) => {
    volume = level

    if(audio) audio.volume = volume
    if(dialogsAudio) dialogsAudio.volume = volume
}