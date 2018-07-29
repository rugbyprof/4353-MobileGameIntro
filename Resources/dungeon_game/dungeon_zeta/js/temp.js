var game = new Phaser.Game(1800, 1400, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var map;
var layers = [];
var player;

function preload() {
    game.load.tilemap('LevelOne', 'TileMaps/Tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Background', 'Assets/Background.png');
    game.load.image('InterImages', 'Assets/InterImages.png');
    game.load.spritesheet('MainCharacter', 'Assets/MainCharacter.png', 60, 80, 33);
    game.load.spritesheet('StandardEnemyFull', 'Assets/StandardEnemyFull.png');
}

function create() {
    //add tilemap, images and create layers, resize world    
    map = game.add.tilemap('LevelOne');
    map.addTilesetImage('Background', 'Background');
    map.addTilesetImage('Interaction', 'InterImages');
    layers[3] = map.createLayer('Scenery');
    layers[2] = map.createLayer('Activates');
    layers[1] = map.createLayer('Floor');
    //call in physics and assigns gravity    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 900; //assign physics to the layer 'floor'    
    game.physics.arcade.enable(layers[3]);
    map.setCollisionBetween(128, 131, true, layers[3]);
    map.setCollisionBetween(148, 151, true, layers[3]);
    map.setCollisionBetween(168, 171, true, layers[3]);
    map.setCollisionBetween(188, 191, true, layers[3]);
    map.setCollisionBetween(208, 211, true, layers[3]);
    map.setCollisionBetween(228, 231, true, layers[3]);
    map.setCollisionBetween(248, 251, true, layers[3]);
    //add player and enable player physics. Ensure player collides with wall    
    player = game.add.sprite(1040, 1300, 'MainCharacter');
    player.anchor.x = player.anchor.y = 0.5;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
}

function update() {
    game.physics.arcade.collide(player, layers[3]);
}