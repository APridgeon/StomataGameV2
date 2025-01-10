import { generateBackground, generateFullScreenButton, generateSpeakerButton } from "../src/commonComponents.js"
import { config } from "./../game.js";
import { uid, signInWithPopup, auth, provider, onAuthStateChanged, signOut } from "../src/firebaseInit.js";

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

        this.signedInButton = this.add.rectangle(config.scale.width/2 -75, 270, 450, 90, 0xff0000)
            .setOrigin(0.5, 0.5)
            .setAlpha(0.4)
            .setVisible(false);
        
        this.signedInText = this.add.bitmapText(config.scale.width/2 - 75, 275, 'casual', 'Hello: ', 18, 1)
            .setOrigin(0.5, 0.5)
            .setVisible(false);

        this.signOutButton = this.add.rectangle(config.scale.width/2 + 225, 270, 100, 90, 0xff0000)
            .setOrigin(0.5, 0.5)
            .setAlpha(0.4)
            .setVisible(false);
        
        this.signOutText = this.add.bitmapText(config.scale.width/2 + 225, 275, 'casual', 'Sign\nOut!', 18, 1)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.signOutText.setTint(0xff0000)
                signOut(auth);
            })
            .on('pointerup', () => {
            })
            .on('pointerover', () => {
                this.signOutButton.setAlpha(0.9)
            })
            .on('pointerout', () => {
                this.signOutButton.setAlpha(0.4)
                this.signOutText.clearTint()
            })
            .setVisible(false);
        


            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.signedInText
                        .setText("Hello: " + user.displayName)
                        .setVisible(true);
                    this.signedInButton
                        .setVisible(true);
                    this.signOutButton
                        .setVisible(true);
                    this.signOutText
                        .setVisible(true);
                    this.signInText
                        .setVisible(false);
                    this.signInButton
                        .setVisible(false);
                    console.log("Logged In");
                } else {
                    this.signedInText
                        .setVisible(false);
                    this.signedInButton
                        .setVisible(false);
                    this.signOutButton
                        .setVisible(false);
                    this.signOutText
                        .setVisible(false);
                    this.signInText
                        .setVisible(true);
                    this.signInButton
                        .setVisible(true);
                    console.log("Logged Out");
                }
              });

    }

}