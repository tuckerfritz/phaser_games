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
      <Card>
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
    </div>
  );
};

export default Home;
