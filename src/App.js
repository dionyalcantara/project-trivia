import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
