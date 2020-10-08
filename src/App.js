import React from 'react';
import './App.css';
import Feed from './Feed';
import LiveOrders from './LiveOrders';
import Sidebar from './Sidebar';


function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <Feed></Feed>
      <LiveOrders></LiveOrders>
    </div>
  );
}

export default App;
