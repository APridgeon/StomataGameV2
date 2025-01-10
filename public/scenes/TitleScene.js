import { generateBackground, generateSpeakerButton, generateFullScreenButton} from "../src/commonComponents.js";
import { config } from "./../game.js";

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title')
    }


    preload () {
        //this.load.audio('music', './assets/Game_music.mp3' );
        this.load.audio('music', './assets/testPHASER.mp3' );
        this.load.image('tree','./assets/tree.png');
        this.load.image('leaf','./assets/leaf.png');
        this.load.image('speaker','./assets/speaker.png');
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
        this.load.image('vein', './assets/vein.png');
    }

    create () {
        let mainScene = this.scene.get('Main');
        let uiScene = this.scene.get('UI');
        mainScene.data.reset();
        uiScene.data.reset();

        generateBackground(this, 0x537c44, 0xf8f644, config.scale.width, config.scale.height);

        let title = this.add.bitmapText(30, 50,'casualTitle', "What's Stomata?",40)
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

        // //setting up sound
        this.sys.game.soundTest = this.sys.game.sound.add('music');
        this.sys.game.soundTest.play({
            loop: true
        });
        this.sys.game.soundPlay = true;

        generateSpeakerButton(this);
        generateFullScreenButton(this);

        this.input.on('pointerdown', () => {
            this.scene.stop('Title');
            this.scene.start('Orientation');
        })
    }

}