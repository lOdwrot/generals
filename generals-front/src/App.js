import React from 'react';
import 'antd/dist/antd.css'
import io from './socket/socketManager'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
import Board from './Game/Board';
import Settings from './Settings/Settings';
import { useSelector } from 'react-redux';
import { isBattleModeSelector } from './storage/game/game.selector';
import GameInfo from './GameInfo/GameInfo';
function App() {
  const isBatlletMode = useSelector(isBattleModeSelector)
  return (
    <div>
      <GameInfo/>
      <LiveChat/>
      {
        !isBatlletMode &&
        <>
          <Lobby/>
          <Settings/>
        </>
      }
      {
        isBatlletMode &&
        <Board/>
      }
    </div>
  );
}

export default App;
