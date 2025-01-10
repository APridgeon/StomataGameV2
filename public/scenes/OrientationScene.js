import { generateBackground, generateFullScreenButton, generateSpeakerButton } from "../src/commonComponents.js"
import { config } from "./../game.js";
import { uid, signInWithPopup, auth, provider, onAuthStateChanged } from "../src/firebaseInit.js";

export default class OrientationScene extends Phaser.Scene {
    constructor () {
        super('Orientation')
    }

    preload () {
    }

    create () {


        if(this.scale.orientation === Phaser.Scale.PORTRAIT){
            generateBackground(this, 0xe76f51, 0xff0000, config.scale.width, config.scale.height);
        } else {
            generateBackground(this, 0x537c44, 0xf8f644, config.scale.width, config.scale.height);
        }

        generateSpeakerButton(this);
        generateFullScreenButton(this);

        this.orientationText = this.add.bitmapText(config.scale.width/2 - 20, 120,'casualTitle', (this.scale.orientation === Phaser.Scale.PORTRAIT) ? 'This works best\nin landscape!' : 'Click \nto continue!',40, 1)
            .setOrigin(0.5, 0.5)
            .setLetterSpacing(10)
            .setInteractive()
            .on('pointerdown', () => {
                this.scale.startFullscreen();
                this.scene.stop('Orientation');
                this.scene.start('Instruct');
            })

        this.tweens.add({
            targets: this.orientationText,
            x: config.scale.width/2 + 20,
            duration: 500,
            ease: 'linear',
            yoyo: true,
            loop: -1
        })

        this.signInButton = this.add.rectangle(config.scale.width/2, 270, 600, 90, 0xff0000)
            .setAlpha(0.4)
            .setOrigin(0.5, 0.5);
        this.signInText = this.add.bitmapText(config.scale.width/2, 275, 'casual', 'Sign in to score on the leaderboard! \n (allow popups)', 18, 1)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.signInText.setTint(0xff0000)
                signInWithPopup(auth, provider)
            })
            .on('pointerup', () => {
            })
            .on('pointerover', () => {
                this.signInButton.setAlpha(0.9)
            })
            .on('pointerout', () => {
                this.signInButton.setAlpha(0.4)
                this.signInText.clearTint()
            })

            onAuthStateChanged(auth, (user) => {
                if (user) {
                  this.signInText.text = "You are signed in as: " + user.displayName;
                } else {
                  uid = null;
                }
              });

    }

}