import React from 'react';
import '../assets/styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Users from './pages/Users';
import Operations from './pages/Operations';
import Registration from './pages/Registration';
import Authorization from './pages/Authorization';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          header
        </header>
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/users' component={Users}/>
          <Route path='/operations' component={Operations}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/authorization' component={Authorization}/>
          <Route>
            404 Error
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;