import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      Home
      <Link to="/1">1</Link>
      <Link to="/2">2</Link>
    </div>
  );
};

const PageOne = () => {
  return (
    <div>
      Page one
      <Link to="/">Home</Link>
      <Link to="/2">2</Link>
    </div>
  );
};

const PageTwo = () => {
  return (
    <div>
      Page two
      <Link to="/">Home</Link>
      <Link to="/1">1</Link>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/1" component={PageOne} />
          <Route path="/2" component={PageTwo} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
