## dungeon_02

- This code adds on to `dungeon_01`
- It adds a game level which just has a single sprite that walks around showing debug info.
- Files added to:
    - **preLoad** : added all the sprite info
    - **level_01**: entire file added implementing walking knight

### Necessary Fixes
    - If walking left or right, if the up or down arrow is pressed the knight will correctly start moving at an angle, however when the up or down arrow is released (while still holding the left or right keys) he will not stop moving at an angle. 

### Necessary Additions

    - The addition of these animations:
    - Run
    - Die
    - Attack
    - Jump
    - Jump Attack

