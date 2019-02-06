import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={StreamList} exact />
            <Route path="/show" component={StreamShow} />
            <Route path="/new" component={StreamCreate} />
            <Route path="/edit" component={StreamEdit} />
            <Route path="/delete" component={StreamDelete} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
