import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold m-3">Phaser Games</h1>
      <div className="flex flex-wrap gap-2 m-2 min-w-fit">
        <Card className="w-72">
          <Link
            href="/phaser-demo"
            aria-labelledby="phaser-demo--title"
            aria-describedby="phaser-demo--description"
          >
            <CardHeader>
              <CardTitle id="phaser-demo--title">Phaser Demo</CardTitle>
              <CardDescription id="phaser-demo--description">
                The phaser demo that comes with the Phaser-React template.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="assets/demo/phaser_demo-preview.png"
                alt="phaser demo preview"
              />
            </CardContent>
            <CardFooter>
              <Button>Start Game!</Button>
            </CardFooter>
          </Link>
        </Card>
        <Card className="w-72">
          <Link
            href="phaser-tutorial"
            aria-labelledby="phaser-tutorial--label"
            aria-describedby="phaser-tutorial--description"
          >
            <CardHeader>
              <CardTitle id="phaser-tutorial--label">Phaser Tutorial</CardTitle>
              <CardDescription id="phaser-tutorial--description">
                The&nbsp;
                <a href="https://phaser.io/tutorials/making-your-first-phaser-3-game/part1">
                  phaser tutorial
                </a>
                &nbsp; hosted on phaser&apos;s website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="assets/tutorial/phaser_tutorial-preview.png"
                alt="phaser tutorial preview"
              />
            </CardContent>
            <CardFooter>
              <Button>Start Game!</Button>
            </CardFooter>
          </Link>
        </Card>
        <Card className="w-72">
          <Link
            href="happy-bird"
            aria-labelledby="happy-bird--title"
            aria-describedby="happy-bird--description"
          >
            <CardHeader>
              <CardTitle>Happy Bird</CardTitle>
              <CardDescription>
                A clone of the game &quot;Flappy Bird&quot;.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="assets/happy_bird/happy_bird-preview.png"
                alt="happy bird preview"
              />
            </CardContent>
            <CardFooter>
              <Button>Start Game!</Button>
            </CardFooter>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Home;
