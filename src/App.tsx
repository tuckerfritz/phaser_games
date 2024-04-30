import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import { LoadingSpinner } from "@/components/ui/spinner";
const Demo = lazy(() => import("./games/demo/Demo"));
const HappyBird = lazy(() => import("./games/happy_bird/HappyBird"));
const Home = lazy(() => import("./Home"));
const Tutorial = lazy(() => import("./games/tutorial/Tutorial"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen w-screen place-items-center">
          <LoadingSpinner size={75} />
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/phaser-demo" component={Demo} />
        <Route path="/phaser-tutorial" component={Tutorial} />
        <Route path="/happy-bird" component={HappyBird} />
        <Route>404</Route>
      </Switch>
    </Suspense>
  );
}

export default App;
