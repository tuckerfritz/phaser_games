import { Button } from "@/components/ui/button";

interface IProps {
  score: number;
  isGameOver: boolean;
  restartGame: () => void;
}

const GameOverMenu = ({ score, isGameOver, restartGame }: IProps) => {
  return (
    <>
      <div className="text-5xl font-semibold text-white justify-self-start ml-2 pointer-events-none">
        {score}
      </div>
      {isGameOver && (
        <Button className="justify-self-center" onClick={restartGame}>
          Start Over
        </Button>
      )}
    </>
  );
};

export default GameOverMenu;
