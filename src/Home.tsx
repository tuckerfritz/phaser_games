import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold m-3">Phaser Games</h1>
      <div className="flex flex-wrap gap-2 m-2 min-w-fit">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Phaser Demo</CardTitle>
            <CardDescription>
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
            <Link href="/phaser-demo">Start Game!</Link>
          </CardFooter>
        </Card>
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Phaser Tutorial</CardTitle>
            <CardDescription>
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
            <Link href="phaser-tutorial">Start Game!</Link>
          </CardFooter>
        </Card>
        <Card className="w-72">
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
            <Link href="/happy-bird">Start Game!</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
