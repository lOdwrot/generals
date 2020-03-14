import React from 'react';
import 'antd/dist/antd.css'
import io from './socket/socketManager'
import Lobby from './Lobby/Lobby.jsx';
import LiveChat from './LiveChat/LiveChat';
function App() {
  return (
    <div>
      <Lobby/>
      <LiveChat/>
    </div>
  );
}

export default App;
