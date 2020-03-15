import React from 'react';
import 'antd/dist/antd.css'
import io from './socket/socketManager'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
import Board from './Game/Board';
import logo from './logo.svg'
function App() {
  return (
    <div>
      <Lobby/>
      <LiveChat/>
      <Board/>
    </div>
  );
}

export default App;
