import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/Project_Trivia_Game" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/Ranking" component={ Ranking } />
          <Route component={ NotFound } />
        </Switch>
      </header>
    </div>
  );
}
