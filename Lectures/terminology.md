## Terminology

- **2D graphics**
  - Graphic rendering technique in a two-dimensional perspective, often using sprites.
- **2.5D or Psuedo 3D**
  - This perspective is typcially a 2D graphical projection used to cause images or scenes to simulate the appearance of being three-dimensional (3D).
- **Sprite**
  - Use of the term sprite has expanded to refer to any two-dimensional bitmap used as part of a graphics display, even if drawn into a frame buffer (by either software or a GPU) instead of being composited on-the-fly at display time.
  - The act of creating sprites is a form of pixel art. It is sometimes referred to as spriting, especially in the hobbyist community.
  - When multiple smaller images are combined into a single bitmap to save memory, the resulting image is called a sprite sheet or texture atlas.
- **Tilemap**
  - A tile-based video game is a type of video or video game where the playing area consists of small square (or, much less often, rectangular, parallelogram, or hexagonal) graphic images referred to as tiles laid out in a grid. That the screen is made of such tiles is a technical distinction, and may not be obvious to people playing the game. The complete set of tiles available for use in a playing area is called a tileset. Tile-based games usually simulate a top-down, side view, or 2.5D view of the playing area, and are almost always two-dimensional.
- **Phaser Physics**
  - The Physics Manager is responsible for looking after all of the running physics systems.
  - Phaser supports 4 physics systems: Arcade Physics, P2, Ninja Physics and Box2D via a commercial plugin.
  - Game Objects (such as Sprites) can only belong to 1 physics system, but you can have multiple systems active in a single game.
  - For example you could have P2 managing a polygon-built terrain landscape that an vehicle drives over, while it could be firing bullets that use the faster (due to being much simpler) Arcade Physics system.

- https://en.wikipedia.org/wiki/Sprite_(computer_graphics)
- https://en.wikipedia.org/wiki/Glossary_of_video_game_terms
- https://en.wikipedia.org/wiki/2.5D
- https://phaser.io/docs/2.6.2/Phaser.Physics.html 
