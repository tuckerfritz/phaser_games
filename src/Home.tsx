import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
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
          <Link href="/phaser-demo">Click Me!</Link>
        </CardContent>
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
          <Link href="/phaser-tutorial">Click Me!</Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
