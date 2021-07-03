import  TitleScene  from "./scenes/TitleScene.js";
import  MainScene  from "./scenes/MainScene.js";
import InstructScene from "./scenes/InstructScene.js";
import PointsScene from "./scenes/PointsScene.js";

//testing mobile
var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
var gameWidth = (isMobile) ? 650 : 600;
var gameHeight = (isMobile) ? 350 : 600;

console.log("Mobile: ", isMobile);

var config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    width: gameWidth,
    height: gameHeight,
    pixelArt: true,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [TitleScene, InstructScene, MainScene, PointsScene],
    parent: 'test'
};

var game = new Phaser.Game(config);


export default game;
