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
    <div className="flex gap-2 m-2">
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
    </div>
  );
};

export default Home;
