
var isMobile = true// (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
import game from "../game.js";


export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title')
    }

    preload () {
        this.load.image('tree','./assets/tree.png');
        this.load.image('leaf','./assets/leaf.png');
        this.load.image('speaker','./assets/speaker.png');
        this.load.audio('music', './assets/testPHASER.ogg');
        this.load.bitmapFont('casual', './fonts/Unnamed.png', './fonts/Unnamed.xml');
        this.load.bitmapFont('casualTitle', './fonts/Title.png', './fonts/Title.xml');
        this.load.image('guardcell','./assets/guardcell.png');
        this.load.image('pore','./assets/pore.png');
        this.load.image('co2','./assets/co2.png');
        this.load.image('h2o','./assets/h2o.png');
        this.load.image('palisade','./assets/palisade.png');
        this.load.spritesheet('stomata', './assets/stomataSprite.png', { frameWidth: 25, frameHeight: 25 });
        this.load.image('epidermis','./assets/epidermis.png');
        this.load.image('sponge','./assets/sponge.png');
        this.load.image('screen','./assets/screen.png');
        this.load.image('star', './assets/star.png');
        this.load.image('arrow', './assets/arrow.png');
    }

    create () {
        let mainScene = this.scene.get('Main');
        let uiScene = this.scene.get('UI');
        mainScene.data.reset();
        uiScene.data.reset();

        this.background = this.add.graphics()
            .fillGradientStyle(0x537c44,0x537c44,0xf8f644,0xf8f644, 0.7)
            .fillRect(-1500/2, -1500/2, 1500, 1500)

        this.tweens.add({
            targets: this.background,
            angle:360,
            ease:'linear',
            loop:-1,
            duration: 5000
        })


        let title = this.add.bitmapText(30, 40,'casualTitle', "What's Stomata?",40)
            .setLetterSpacing(10);

        let subtitle = this.add.bitmapText(120, 110,'casual', 'Click to begin',18)
            .setTint(0x423c56);

        this.tweens.add({
            targets: title,
            x: 35,
            duration: 500,
            ease: 'linear',
            yoyo: true,
            loop: -1
        })


        this.add.image(100, 270,'tree')
        this.add.image(550, 270,'tree')
        this.add.image(325, 220,'leaf').setScale(1.5)


        game.soundTest = game.sound.add('music');
        game.soundTest.play({
            loop: true
        });

        game.soundPlay = true;

        this.speaker = this.add.image(625, 25, 'speaker')
            .setInteractive();

        this.speaker.on('pointerdown', () => {
            if(game.soundPlay == false){
                game.soundTest.resume();
                game.soundPlay = true;
                this.speaker.clearTint();
            } else if(game.soundPlay == true){
                game.soundTest.pause();
                game.soundPlay = false;
                this.speaker.setTint(0xf00000);
            }
            
        })


        this.input.on('pointerdown', () => {
            this.scene.start('Orientation', {game});
        })
    }

}