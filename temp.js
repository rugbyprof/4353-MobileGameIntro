// just concept

var animationChain = [];

animationChain.push(anim1);
animationChain.push(anim2);
animationChain.push(anim3);

update: function () {

    if(!this.playerAnimationLocked){
        current = animationChain.shift();
        this.animations.play(current);
    }

}

//Wrong
this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFTKEY);

//Correct
this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);