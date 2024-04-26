import { Boot } from "./Boot";
import { Game } from "./Game";
import { GameOver } from "./GameOver";
import { MainMenu } from "./MainMenu";

type PlayableScene = Game | GameOver | MainMenu;

export { Boot, Game, GameOver, MainMenu, type PlayableScene };
