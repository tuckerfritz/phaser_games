# Phaser Games
This project is based on [Phaser's React Template](https://github.com/phaserjs/template-react)

Currently, there are three games implemented in this project.
1) The demo that comes with the Phaser React template
2) The [tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game/part1) that is hosted on Phaser's website
3) A clone of the game "Flappy Bird"

The purpose of this project was mainly to have fun building games
within React and to see how I could best implement a game's UI using
only React while avoiding creating it within the HTML5 canvas. This is done with Phaser's "EventBus" which allows you to dispatch events
from within a React component and handle the event within Phaser's
scenes (and vice versa).

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm install`   | Install project dependencies                   |
| `npm run dev`   | Launch a development web server                |
| `npm run build` | Create a production build in the `dist` folder |

## Acknowledgements
Thanks to
* the Phaser team for providing the [initial template](https://github.com/phaserjs/template-react) for this project
* Dong Nguyen for the "Flappy Bird" concept
* Megacrash for his [asset pack](https://megacrash.itch.io/flappy-bird-assets) that was inspired by "Flappy Bird"
* Kenney from [kenney.nl](https://kenney.nl/) for the [Onscreen Controls](https://www.kenney.nl/assets/onscreen-controls) UI pack
