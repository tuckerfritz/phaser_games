import { Button } from "@/components/ui/button";

interface IProps {
  startGame: () => void;
}

const StartMenu = ({ startGame }: IProps) => {
  return (
    <Button className="place-self-center" onClick={startGame}>
      Play
    </Button>
  );
};

export default StartMenu;
