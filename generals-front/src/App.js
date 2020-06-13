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
import UserStats from './UserStats/UserStats.jsx';

function App() {
  const playerRole = useSelector(playerRoleSelector)
  useEffect(() => {
    playOpeningMusic()
  }, [])

  return (
    <div>
      <AudioControl/>
      {
        playerRole === 'fighter' &&
        <Abilities/>
      }
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
      <UserStats/>
    </div>
  );
}

export default App;
