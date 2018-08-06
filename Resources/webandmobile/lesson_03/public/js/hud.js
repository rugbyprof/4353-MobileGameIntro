/**
 * 
 * @param {object} game : phaser game object
 * @param {int} width : width of hud
 * @param {int} height : height of hud
 * @param {string} title : title of hud
 * @param {string} location : ['upper_left','upper_right','lower_left','lower_right']
 */
var Hud = function (game, width,height,title=null,location=null) {
    this.game = game; // reference to the phaser game
    this.base_x = 0; // base x of where to draw hud
    this.base_y = 0; // base y of where to draw hud
    this.hud_width = width; // size of hud on screen
    this.hud_height = height;
    this.hud = game.add.graphics(0, 0); // a graphics object that represents the hud (rectangle really)
    this.title_text = "HUD"; // title text 
    this.font_size = 16; // default font size
    this.hud_objs = []; // array of objects so we can delete them and re-create when the game camera moves.
    this.items = [];

    // Need font for the text
    this.game.load.bitmapFont('mainFont', 'assets/fonts/ganonwhite/font.png', 'assets/fonts/ganonwhite/font.xml');
    
    // Default location is upper left
    if(location == null){
        location = 'upper_left';
    }

    // Get things going
    this.addTitle(title);
    this._createHud();
    this.displayHud();
};

/**
 * Displaying the HUD means re-drawing it over and over again. So
 * the first thing this method does is destroy the old text objects
 * so we don't leave them on the screen. It then calls appropriate
 * functions so we can redraw everything
 */
Hud.prototype.displayHud = function(){
    
    for(i=0;i<this.hud_objs.length;i++){
        this.hud_objs[i].destroy();
    }
    this.hud_objs = [];
    this._createHud();
    this.addTitle();
    this.printItems();
}

/**
 * Does the printing of the text.
 */
Hud.prototype.printItems = function(){
    for(i=0;i<this.items.length;i++){
        temp = this.items[i];
        key = temp.key;
        if(temp.data){
            value = temp.player.data[key];
        }else{
            value = temp.player[key];
        }
        item = this.game.add.text(0, 0, key + ":" + value, this._getStyle("#FFF",14));
        item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        item.setTextBounds(this.game.camera.x, this.game.camera.y + ((i+1)*20), this.hud_width, this.hud_height);
        this.hud_objs.push(item);
    }
}

/**
 * This method lets you track a player value. 
 * @param {object} player - object reference to a player
 * @param {string} key - the key to lookup the value with (e.g. player.health , health = the key)
 * @param {bool} data - this is a flag to tell HUD if this item to be tracked is in the "data" array in the player.
 * @param {object} img - not sure about what this should be, probably a sprite reference or image path
 */
Hud.prototype.trackValue = function(player,key,data=false,img=null){
    this.items.push({'player':player,'key':key,'img':img,'data':data});
}

/**
 * 
 * @param {string} title - title of the HUD
 */
Hud.prototype.addTitle = function(title=null){

    if(title != null){
        this.title_text = title;
    }
    // Create the text object to be placed in the hud
    title = this.game.add.text(0, 0, this.title_text, this._getStyle("#FFF",this.font_size,true));
    title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    title.setTextBounds(this.game.camera.x, this.game.camera.y, this.hud_width, this.hud_height);

    // Push that object onto the array of objects to get drawn
    this.hud_objs.push(title);

}

/**
 * This draws the "box" thats a little see through that works as our HUD.
 */
Hud.prototype._createHud = function(){
    hud = game.add.graphics(0, 0);
    hud.lineStyle(2, 0x000000, 1);
    hud.beginFill(0x000000, .4);
    hud.drawRect(this.game.camera.x+1, this.game.camera.y+1, this.hud_width, this.hud_height);
    hud.endFill();
    this.hud_objs.push(hud);
}

/**
 * 
 * @param {string} fill : e.g. #FFF or #FAFAFA
 * @param {int} font_size 
 * @param {bool} bold : make text bold or not
 */
Hud.prototype._getStyle = function(fill,font_size,bold=false){
    if(bold){
        bold = "bold ";
    }else{
        bold = "";
    }
    return  { font: bold+font_size+"px Arial", fill: fill, boundsAlignH: "center", boundsAlignV: "top" }

}
