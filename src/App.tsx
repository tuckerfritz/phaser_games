import { Link, Route, Switch } from "wouter";
import Demo from "./games/demo/Demo";
import Home from "./Home";

function App() {
  return (
    <div id="app">
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/phaser-demo" component={Demo}/>
        <Route>404</Route>
      </Switch>
    </div>
  )
}

export default App;
