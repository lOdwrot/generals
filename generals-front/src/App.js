import React, { useEffect } from 'react';
import 'antd/dist/antd.css'
import io from './socket/socketManager'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
import Board from './Game/Board';
import Settings from './Settings/Settings';
import { useSelector } from 'react-redux';
import GameInfo from './GameInfo/GameInfo';
import { playerRoleSelector } from './storage/game/game.selector';
import { Button } from 'antd';
import { playOpeningMusic } from './audioPlayer/audioPlayer';

function App() {
  const playerRole = useSelector(playerRoleSelector)
  useEffect(() => {
    playOpeningMusic()
  }, [])

  return (
    <div>
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
    </div>
  );
}

export default App;
