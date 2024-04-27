import { Route, Switch } from "wouter";
import Demo from "./games/demo/Demo";
import Home from "./Home";
import Tutorial from "./games/tutorial/Tutorial";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/phaser-demo" component={Demo} />
      <Route path="/phaser-tutorial" component={Tutorial} />
      <Route>404</Route>
    </Switch>
  );
}

export default App;
