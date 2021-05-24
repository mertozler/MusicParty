import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ConfirmForm from './components/auth/ConfirmForm';
import PrivateRoute from './components/route/PrivateRoute';
import NotFound from './components/layout/NotFound';
import Room from './components/Player/Room';
import Homepage from './components/homepage/Homepage';
import CreateRoom from './components/rooms/CreateRoom';
import Contribute from './components/Contribute/Contribute';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/">
            <Homepage />
          </PrivateRoute>
          <PrivateRoute exact path="/create-room">
            <CreateRoom />
          </PrivateRoute>
          <PrivateRoute exact path="/contribute">
            <Contribute />
          </PrivateRoute>
          <PrivateRoute exact path="/room/:id" children={<Room />} />
            
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/confirm">
            <ConfirmForm />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
