## First Game
- **Due**: Jul 16<sup>th</sup> by classtime.
- **Late Projects:** Will NOT be graded. 

### Guidelines
- Projects that are not on github, will not be graded. 
- Projects that do not run, will not be graded.
- You can work in groups of 2-3 not 4. Don't ask.
- All work is expected to be done solely by the individuals in the group. Any collaboration with other groups will result in a grade of 0 (zero) on the assignment.
- Each project will also contain a references file called `references.md` in which all websites in which your group obtianed example code from will be listed in a numbered list.
- Your program will be commented, and again, any help obtained should be cited in the comments.

### Important
- Each member of the group will have a copy of the code in their repository and on their server. 
- The poor member who doesn't have a copy will get a zero. So don't do that to your self.
- To finalize your submission, your group (only one person needs to do this) will send me an email with the following information:
- **Subject:** 2D Program 1
- The body of your email will contain everyone's name, a link to the game on their server, and a link to their github repo.
- Example email below:

> **Subject:** 2D Program 1<br><br>
> Here are the names and links for my group:<br>
John Smith<br>
Roster #11<br>
  http://120.34.43.111/Mwsu-2D-Gaming-Smith/Program-1<br>
  http://github.com/smittyville/Mwsu-2D-Gaming-Smith/<br><br>
  Jane Doe<br>
  Roster # 6<br>
  http://171.55.43.23/Mwsu-2D-Gaming-Doe/Program-1<br>
  http://github.com/doedoebird/Mwsu-2D-Gaming-Doe/<br>  

            

### Starter Code
The starter code is available [here](./02_first_game_v2.zip)


Using the starter code provided above, program the following additions:
- Change the sprite for the gold star and make it random items (like gems, mushrooms, coins).
- Change the sprite for the player and make it some monster or person.
- Instead of re-starting the game every time the player dies, add a death counter and simply count the deaths. 
    - Place the death counter at the bottom right hand side of the game, using the same font as the score.
- Since we never restart the game, lets add a timer to stop the game after X minutes. 
    - Place this timer at the top right of the game and have it counting down from X in miniutes:seconds. 
- If the player dies (hitting a bomb) reset the score to zero.