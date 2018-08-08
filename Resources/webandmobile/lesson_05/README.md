### Pre-requisites (things to install)

- `npm i -g cordova`

### Project Setup

- `cordova create projectName`

- `cd www`
- `npm init`
- `npm i --save phaser` (Not doing this)

 #### Add support for running our app in a browser.

 - `cordova platform add browser`


- `cordova plugin add cordova-plugin-browsersync`

#### Starts http server:

- `cordova run browser --live-reload`


- http://localhost:8000/index.html


#### Basic Generated Code

- Remove the `<div id="app">...</div> `
- Also remove the "Content-Security-Policy"

```html
<html>
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <title>Hello World</title>
    </head>
    <body>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
```

#### Changing index.js

```js
document.addEventListener('deviceready', function() {
    var config = {
        type: Phaser.WEBGL,
        parent: 'game',
        scene: {
            preload: preload,
            create: create
        }
    };
    
    var game = new Phaser.Game(config);
    
    function preload() {
    }
    
    function create() {
    }    
});
```

### Building the Game for iOS and Android

- `cordova platform add ios android`

### Running in an Emulator

- `cordova emulate ios`

### App Store and Google Play

- http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/

<sup>Source: https://gamedevacademy.org/creating-mobile-games-with-phaser-3-and-cordova/ </sup>