import { generateBackground, generateFullScreenButton, generateSpeakerButton } from "../src/commonComponents.js";
import {app, auth, provider, signInWithPopup, writeUserData} from "./../src/firebaseInit.js";
import { config } from "./../game.js";


export default class PointsScene extends Phaser.Scene {
    constructor () {
        super('Points')
    }
    init (data) {
        this.waterLost = data.waterLost;
        this.carbonGain = data.carbonGain;
    }

    preload () {
        this.load.image('block', './assets/block.png');
    }

    create () {

        this.cameras.main.setBounds(0, 0, 650, 350);

        generateBackground(this, 0x537c44, 0xf8f644, config.scale.width, config.scale.height);

        this.add.bitmapText(100, 15, 'casualTitle', 'Game over!', 32)
            .setLetterSpacing(17);  
            //.setTint(0x423c56);
        this.add.bitmapText(100, 70, 'casual', 'Total water lost: ' + this.waterLost, 16)
            .setTint(0x423c56)
            .setLetterSpacing(1.12);  
        this.add.bitmapText(100, 102, 'casual', 'Total carbon gain: ' + this.carbonGain, 16)
            .setTint(0x423c56)
            .setLetterSpacing(1.12);  
        this.add.bitmapText(100, 134, 'casual', 'Water Use Efficiency: ' + (this.carbonGain/this.waterLost).toFixed(3), 16)
            .setTint(0x423c56)
            .setLetterSpacing(1.12);  

        this.name = this.add.bitmapText(100, 305, 'casual', 'Name: ', 25)
            .setAlpha(0)
            .setTint(0x423c56);  

        this.tweens.add({
            targets: this.name,
            ease: 'sine',
            alpha: 1, 
            hold: 200,
            yoyo: true,
            duration: 500,
            loop: -1
        })

        //text input
        generateKeyboard(this, 188.5, 185);
        

        //sound and fullscreen
        generateSpeakerButton(this);
        generateFullScreenButton(this);

    }

}


function generateKeyboard(scene, X, Y){

    let chars1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
    let chars2 = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
    let chars3 = ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', ];
    let charObjectArray = []

    for(let i = 0; i < chars1.length; i++){
        let background = scene.add.rectangle((30 * i) + X, Y, 21, 35, 0xff0000)
            .setAlpha(0.4)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        let text = scene.add.bitmapText((30 * i) + X+1.5, Y+8, 'casual', chars1[i], 20)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                text.setTint(0xff0000)
                if(scene.name.text.length < 11){
                    scene.name.text += text.text;
                }
            })
            .on('pointerup', () => {
                text.clearTint()
            })
            .on('pointerover', () => {
                background.setAlpha(0.9)
            })
            .on('pointerout', () => {
                background.setAlpha(0.4)
            })
        charObjectArray.push(text);
    }
    for(let i = 0; i < chars2.length; i++){
        let background = scene.add.rectangle((30 * i) + X, Y+40, 21, 35, 0xff0000)
            .setAlpha(0.4)
            .setOrigin(0.5, 0.5);
        let text = scene.add.bitmapText((30 * i) + X+1.5, Y+48, 'casual', chars2[i], 20)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                text.setTint(0xff0000)
                if(scene.name.text.length < 11){
                    scene.name.text += text.text;
                }
            })
            .on('pointerup', () => {
                text.clearTint()
            })
            .on('pointerover', () => {
                background.setAlpha(0.9)
            })
            .on('pointerout', () => {
                background.setAlpha(0.4)
            })
        charObjectArray.push(text);
    }
    for(let i = 0; i < chars3.length; i++){
        let background = scene.add.rectangle((30 * i) + X, Y+80, 21, 35, 0xff0000)
            .setAlpha(0.4)
            .setOrigin(0.5, 0.5);
        let text = scene.add.bitmapText((30 * i) + X+1.5, Y+88, 'casual', chars3[i], 20)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                text.setTint(0xff0000)
                if(scene.name.text.length < 11){
                    scene.name.text += text.text;
                }
            })
        .on('pointerup', () => {
            text.clearTint()
        })
        .on('pointerover', () => {
            background.setAlpha(0.9)
        })
        .on('pointerout', () => {
            background.setAlpha(0.4)
        })
        charObjectArray.push(text);
    }

    scene.deleteButton = scene.add.rectangle((30 * 8.5) + X, Y+80, 21 * 2.5, 35, 0xff0000)
        .setAlpha(0.4)
        .setOrigin(0.5, 0.5);
    scene.deleteText = scene.add.bitmapText((30 * 8.5) + X+1.5, Y+88, 'casual', 'del',18)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerover', () => {
            scene.deleteButton.setAlpha(0.9)
        })
        .on('pointerout', () => {
            scene.deleteButton.setAlpha(0.4)
        })
        .on('pointerdown', () => {
            scene.deleteText.setTint(0xff0000)
            if(scene.name.text.length > 6){
                scene.name.text = scene.name.text.substring(0, scene.name.text.length - 1)
            }
        })
        .on('pointerup', () => {
            scene.deleteText.clearTint()
        })

    scene.submitButton = scene.add.rectangle(X+381.5, Y+118, 120, 50, 0xff0000)
        .setAlpha(0.4)
        .setInteractive()
        .setOrigin(0.5, 0.5)
        .on('pointerover', () => {
            scene.submitButton.setAlpha(0.9)
        })
        .on('pointerout', () => {
            scene.submitButton.setAlpha(0.4)
        })
        
    
    scene.submitText = scene.add.bitmapText(X+381.5, Y+125, 'casual', 'Submit', 18)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            scene.submitText.setTint(0xff0000)
            let name = scene.name.text.substring(6)
            if(name){
                //writeUserData(100, 100, name);
                writeUserData(scene.waterLost, scene.carbonGain, name);
                scene.scene.stop('Points');
                scene.scene.start('LeaderBoard');
            } else {
                scene.cameras.main.shake(500, 0.01);
            }
        })
        .on('pointerup', () => {
            scene.submitText.clearTint()
        })
        .on('pointerover', () => {
            scene.submitButton.setAlpha(0.9)
        })
        .on('pointerout', () => {
            scene.submitButton.setAlpha(0.4)
        })
        
}
