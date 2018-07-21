## dungeon_03

- This code adds on to `dungeon_02`
- It added an enemy sprite that moves toward player in a simple way
- Files added to:
    - level_01: 
        - Added animations
        - Added function `chasePlayer` to move enemy toward a player
        - 
### Necessary Fixes

    - The enemy is not moving with animation.
    - The chase function is only fired when the space bar is hit. Function call to chase should be moved into the update loop.

### Necessary Additions

    - A function controlling enemy to attack needs written to make enemy attack using appropriate animations.