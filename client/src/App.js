import './App.css';

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Register';
import Profile from './Profile';
import StartPage from './StartPage';
import ProjectPage from './ProjectPage';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Navbar from './components/Navbar/Navbar';

function App() {
  const userSesion = React.useState(null)

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar userSesion={userSesion}/>
        <Switch>
          <Route path="/users/signup">
            <Register />
          </Route>
          <Route path="/users/:id">
            <Profile />
          </Route>
          <Route path="/login">
            <LogIn userSesion={userSesion}/>
          </Route>
          <Route path="/logout">
            <LogOut userSesion={userSesion}/>
          </Route>
          <Route path="/projects/:id">
            <ProjectPage />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
      </div>
	  </BrowserRouter>
  );
}

export default App;
