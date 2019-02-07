import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from '../history';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={StreamList} exact />
            <Route path="/:id(\d+)" component={StreamShow} exact />
            <Route path="/new" component={StreamCreate} />
            <Route path="/:id/edit" component={StreamEdit} />
            <Route path="/:id/delete" component={StreamDelete} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
