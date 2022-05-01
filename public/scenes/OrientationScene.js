import { generateBackground, generateFullScreenButton, generateSpeakerButton } from "../src/commonComponents.js"

export default class OrientationScene extends Phaser.Scene {
    constructor () {
        super('Orientation')
    }

    preload () {
    }

    create () {

        if(this.scale.orientation === Phaser.Scale.PORTRAIT){
            generateBackground(this, 0xe76f51, 0xff0000);
        } else {
            generateBackground(this, 0x537c44, 0xf8f644);
        }

        generateSpeakerButton(this);
        generateFullScreenButton(this);

        this.orientationText = this.add.bitmapText(100, 80,'casualTitle', (this.scale.orientation === Phaser.Scale.PORTRAIT) ? 'This works\nbest\nin landscape!' : 'Click \nto continue!',40, 1)
            .setLetterSpacing(10);

        this.tweens.add({
            targets: this.orientationText,
            x: 105,
            duration: 500,
            ease: 'linear',
            yoyo: true,
            loop: -1
        })

        this.input.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.scene.stop('Orientation');
            this.scene.start('Instruct');
        })
    }

}