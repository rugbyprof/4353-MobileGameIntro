## Dungeon Game


### Checklist

Github Username: _____________________

| #       | Item                                                                   | Value   | Earned |
| :------ | :--------------------------------------------------------------------- | ------: | ------ |
| ***1*** | ***General***                                                          | **0**   |        |
| -       | `repository`  exists                                                   |         |        |
| -       | `assignments` folder exists in Repo                                    |         |        |
| -       | `A05` folder exists in `assignments`                                   |         |        |
| -       | Code is commented                                                      |         |        |
|         |                                                                        |         |        |
| ***2*** | ***Levels***                                                           | **0**   |        |
| -       | 5 levels or 3 (self made) levels exist                                 | 0       |        |
| -       | Code for each level is somewhat organized (see below).                 | 0       |        |
|         |                                                                        |         |        |
| ***3*** | ***Portals or Transitions***                                           | **0**   |        |
| -       | Correct number of Portals exist and located properly                   | 0       |        |
| -       | Portals work properly                                                  | 0       |        |
| -       | Portal is some animated sprite.                                        | 0       |        |
|         |                                                                        |         |        |
| ***4*** | ***Coins***                                                            | **0**   |        |
| -       | Animated coins get more points than unanimated.                        | 0       |        |
| -       | Colliding with coins removes them from game and adds points to player. | 0       |        |
| -       | Coins should be randomly distrubuted and not on collision a layer.     | 0       |        |
|         |                                                                        |         |        |
| ***4*** | ***Health***                                                           | **0**   |        |
| -       | Player needs a health bar or health in a HUD.                          | 0       |        |
| -       | Colliding with monsters will decrease health significantly.            | 0       |        |
|         |                                                                        |         |        |
| ***4*** | ***HUD***                                                              | **0**   |        |
| -       | A Heads up display will exist.                                         | 0       |        |
| -       | It will keep track of player health, and coins collected.              | 0       |        |
| -       | It should be easy to read and stay in one game corner.                 | 0       |        |
|         |                                                                        |         |        |
| ***5*** | ***Monsters***                                                         | **0**   |        |
| -       | At least 2 places on a map will spawn some simple monster(s).          | 0       |        |
| -       | The monsters will move toward player.                                  | 0       |        |
| -       | Monsters that use animations will get more points.                     | 0       |        |
|         |                                                                        |         |        |
| ***6*** | ***Finish Line***                                                      | **0**   |        |
| -       | There should be a portal that takes player to finished screen.         | 0       |        |
| -       | It should be a little obvious.                                         | 0       |        |
|         |                                                                        |         |        |
|         | Total:                                                                 | **100** |        |


Explanations:

- **Levels**: 
    - By organized I mean that the logic for each level is not totally intertwined with 

- **Portals or Transitions**: 
    - A working portal is one that takes you to another level. I should be able to go back into the portal, and return to where I was.
    - If the map has a path leading off the game world, there should be a transition at that location. - If there is no path leaving the game world, a portal of some kind shold be visible to let a player leave a level.
    - Portals can be hidden and appear if a player comes into proximity.
    - If your using the maps I obtained, then a minimum of 4 portals should exist on each map.
    - If your using your own maps, then use your discretion on transitioning between levels.
    - Look below for example portal locations

<img src = "https://d3vv6lp55qjaqc.cloudfront.net/items/2a0F403k1x1L3V0E0n3G/%5Bea0530818a838daeb030ef2b0e754e70%5D_Image%2525202018-07-30%252520at%2525206.00.20%252520PM.png?X-CloudApp-Visitor-Id=1094421" width="400">

<img src="https://d3vv6lp55qjaqc.cloudfront.net/items/3U2l2W0H1B0A0B1Z3e07/%5B9da62f1a252fde0932ca7532b2b2c69b%5D_Image%2525202018-07-30%252520at%2525206.06.08%252520PM.png?X-CloudApp-Visitor-Id=1094421" width="400">

- **Coins**:
    - If you use an animated sprite you will get more points than an unanimated one.
    - Randomly distributed means ANYWHERE a player can walk has the chance of coins showing up. Not just in rooms or ends of caves. 