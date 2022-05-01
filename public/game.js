import  TitleScene  from "./scenes/TitleScene.js";
import  MainScene  from "./scenes/MainScene.js";
import InstructScene from "./scenes/InstructScene.js";
import PointsScene from "./scenes/PointsScene.js";
import OrientationScene from "./scenes/OrientationScene.js";
import UIScene from "./scenes/UIScene.js";
import LeaderBoardScene from "./scenes/LeaderBoard.js";


var gameWidth = 650;
var gameHeight = 350;



var config = {
    scale: {
        parent: 'test',
        fullscreenTarget: 'test',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameWidth,
        height: gameHeight,
    },
    type: Phaser.AUTO,
    
    pixelArt: true,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [TitleScene, OrientationScene, InstructScene, MainScene, UIScene, PointsScene, LeaderBoardScene],
};



var game = new Phaser.Game(config);
game.canvas.id = "game";


export {config};
