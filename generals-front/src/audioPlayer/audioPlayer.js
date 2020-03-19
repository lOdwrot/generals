import {sample} from 'lodash'

const BATTLE_START_MUSIC =  `${process.env.PUBLIC_URL}/battleStart1.mp3`
const OPENING_MUSIC =  `${process.env.PUBLIC_URL}/open.mp3`
const CAPTURE_CAPITOL_SOUND = `${process.env.PUBLIC_URL}/cnquest.mp3`

const PEACFULL_MUSIC = `${process.env.PUBLIC_URL}/peacefullMusic.mp3`
const PEACFULL_MUSIC2 = `${process.env.PUBLIC_URL}/peacefullMusic2.mp3`
const PEACFULL_MUSIC3 = `${process.env.PUBLIC_URL}/peacefullMusic3.mp3`
const PEACFULL_MUSIC4 = `${process.env.PUBLIC_URL}/peacefullMusic4.mp3`
const PEACFULL_BACKGROUNDS = [PEACFULL_MUSIC, PEACFULL_MUSIC2, PEACFULL_MUSIC3, PEACFULL_MUSIC4]

const BATTLE_MUSIC = `${process.env.PUBLIC_URL}/battleMusic.mp3`

const LOST_MUSIC = `${process.env.PUBLIC_URL}/lost.mp3`
const WON_MUSIC = `${process.env.PUBLIC_URL}/won.mp3`


export const playOpeningMusic = () => playMusic(OPENING_MUSIC)
export const playBattleStartMusic = () => playMusic(BATTLE_START_MUSIC)
export const playCaptureCapitolSound = () => playDialog(CAPTURE_CAPITOL_SOUND)

export const playPeacfullBackgoundMusic = () => playMusic(sample(PEACFULL_BACKGROUNDS))
export const playBattleMusic = () => playMusic(BATTLE_MUSIC)

export const playLostMusic = () => playDialog(LOST_MUSIC)
export const playWinMusic = () => playMusic(WON_MUSIC)


var audio
var dialogsAudio

const playMusic = (audioPath) => {
    if(audio) audio.pause()
    audio = new Audio(audioPath)
    audio.play()
}

const playDialog = (audioPath) => {
    if(dialogsAudio) dialogsAudio.pause()
    dialogsAudio = new Audio(audioPath)
    dialogsAudio.play()
}

export const stopSounds = () => {
    if(audio) audio.pause()
    if(dialogsAudio) dialogsAudio.pause()
}