import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route
            path="/"
            exact
            component={ Login }
          />
          <Route
            path="/search"
            exact
            component={ Search }
          />
          <Route
            path="/album/:id"
            exact
            render={ (props) => <Album { ...props } /> }
          />
          <Route
            path="/favorites"
            exact
            component={ Favorites }
          />
          <Route
            path="/profile"
            component={ Profile }
            exact
          />
          <Route
            path="/profile/edit"
            exact
            component={ ProfileEdit }
          />
          <Route
            path="/"
            component={ NotFound }
          />
        </Switch>
      </main>
    );
  }
}

export default App;
