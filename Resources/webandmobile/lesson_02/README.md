## Basic Multiplayer2

### Purpose

Take orignal small chat client and refactor the code organization.

1. Take the script out of the index.html and put into client.js
2. Add a little html styling to show possible layouts on a web page.
3. Use some jquery and grid to add functionality and assist with layout (respectively).

### Viewport Size

If we add a game canvas to most of the screen, we can use other pieces of the web page to display status bars, or consoles to adjust settings (whatever the game needs). Below are some examples of how to get screen sizes as well as maximize your game to existing screen.

- Maximizing game to viewport
    - http://www.html5gamedevs.com/topic/29205-maximising-game-viewport/
- Phaser Viewport Values
    - https://phaser.io/examples/v2/display/viewport

### Html / Css

- Grid is what it sounds like ... arrange things in a grid. Old school html had `block level elements` (entire line left to right) and `inline elements`. Only `inline elements` could be placed next to each other. Initially tables were used to "organize" info on the screen but it was really annoying ... plus: tables are for data not arranging pictures. Bring in css and grid. This lets you define elements as part of an overall "grid" and pick where they go.
- https://css-tricks.com/snippets/css/complete-guide-grid/


### Some Links

https://codepen.io/cardex107/pen/VaPRXo