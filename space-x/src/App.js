import React from 'react';
import './App.css';
import CardsPanel from './components/cardsPanel/CardsPanel';
import Header from './components/header/Header';
import SideBarFilters from './components/sidebar/SideBarFilters';

function App() {
  return (
    <div className="plr-20">
      <Header />
      <div className={`d-flex body-container`}>
        <SideBarFilters />
        <CardsPanel />
      </div>
    </div>
  );
}

export default App;
