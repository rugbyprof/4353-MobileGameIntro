## dungeon_04

### Purpose

- Show how to load a tile map, and add collision detection between tiles and player

- This code adds on to `dungeon_03`
- Added an actual game level with a map!
- Files added to:
    - **level_01**: 
        - Added map data and tile resources
        - Added necessary logic to allow players to collide with correct map tiles / layers
- Folders added:
    - **assets/tiled**
    - This folder contains a TON of game data that I obtained from here: 
    - https://github.com/paulserafim/stendhalgame
    - Were not trying to make money, so I feel ok about using thier graphics.
    - Otherwise you guys would spend hours (well some of you would) creating your own.

### Necessary Fixes
    - The enemy does not collide with correct tiles, it doesn't have collision turned on.

### Necessary Additions
    - A function to have enemy attack trigger when specific tiles or objects are encountered.