import React, { useEffect } from 'react';
import 'antd/dist/antd.css'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
import Board from './Game/Board';
import Settings from './Settings/Settings';
import { useSelector } from 'react-redux';
import GameInfo from './GameInfo/GameInfo';
import { playerRoleSelector } from './storage/game/game.selector';
import { playOpeningMusic } from './audioPlayer/audioPlayer';
import AudioControl from './AudioControl/AudioControl';
import './App.css'
import BattleHistory from './BattleHistory/BattleHistory';
import Abilities from './Abilities/Abilities';

function App() {
  const playerRole = useSelector(playerRoleSelector)
  useEffect(() => {
    playOpeningMusic()
  }, [])

  return (
    <div>
      <AudioControl/>
      <Abilities/>
      <GameInfo/>
      <LiveChat/>
      {
        playerRole ==='lobby' &&
        <>
          <Lobby/>
          <Settings/>
        </>
      }
      {
        (playerRole === 'fighter' || playerRole === 'spectator') &&
        <Board/>
      }
      {
        playerRole === 'historySpectator' &&
        <BattleHistory/>
      }
    </div>
  );
}

export default App;
