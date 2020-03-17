import React from 'react';
import 'antd/dist/antd.css'
import io from './socket/socketManager'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
import Board from './Game/Board';
import Settings from './Settings/Settings';
function App() {
  return (
    <div>
      <LiveChat/>
      <Lobby/>
      <Settings/>
      <Board/>
    </div>
  );
}

export default App;
