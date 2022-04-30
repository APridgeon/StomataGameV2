

export default class OrientationScene extends Phaser.Scene {
    constructor () {
        super('Orientation')
    }

    preload () {
    }

    create () {

        this.background = this.add.graphics()
            .fillRect(-1500/2, -1500/2, 1500, 1500)

        if(this.scale.orientation === Phaser.Scale.PORTRAIT){
            this.background
                .fillGradientStyle(0xe76f51,0xe76f51,0xff0000,0xff0000, 0.7)
        } else {
            this.background
                .fillGradientStyle(0x537c44,0x537c44,0xf8f644,0xf8f644, 0.7)
        }

        this.tweens.add({
            targets: this.background,
            angle:360,
            ease:'linear',
            loop:-1,
            duration: 5000
        })

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

        this.speaker = this.add.image( 625, 25, 'speaker')
            .setInteractive();

        this.speaker.on('pointerdown', () => {
            if(this.sys.game.soundPlay == false){
                this.sys.game.soundTest.resume();
                this.sys.game.soundPlay = true;
                this.speaker.clearTint();
            } else if(this.sys.game.soundPlay == true){
                this.sys.game.soundTest.pause();
                this.sys.game.soundPlay = false;
                this.speaker.setTint(0xf00000);
            }
            
        })

        this.input.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.scene.start('Instruct');
        })
    }

}