import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/User/Login'
import Register from './containers/User/Register';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import MainPage from "./containers/MainPage";


const App = () => {

  const user = useSelector(state => state.user.user);

  return (
      <>
        <Header user={user} />
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
      </>
  )
};

export default App;