## dungeon_03

### Purpose

- Shows a simple way for a NPC (Non Player Character) to "chase" a player sprite

- This code adds on to `dungeon_02`
- It added an enemy sprite that moves toward player in a simple way
- Files added to:
    - level_01: 
        - Added animations
        - Added function `chasePlayer` to move enemy toward a player
        - 
### Necessary Fixes

    - The enemy is not moving with animation, add appropriate animation calls to enemy sprite.
    - The chase is plain.

### Necessary Additions

    - A better function controlling enemy to attack needs written to make enemy attack using appropriate animations.
    - Collision detection and event handler to decide what happens.
    - Death animation needs played when player or enemy dies.
    - How do we decide who dies?