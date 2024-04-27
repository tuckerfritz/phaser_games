import { Link, Route, Switch } from "wouter";
import Demo from "./games/demo/Demo";
import Home from "./Home";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/phaser-demo" component={Demo} />
      <Route>404</Route>
    </Switch>
  );
}

export default App;
