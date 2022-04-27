import { initialiseStomata, makeStomata } from "../src/Cells/stomata.js";

let game;

export default class InstructScene extends Phaser.Scene {
    constructor () {
        super('Instruct')
    }
    init (data) {
        game = data.game;
    }

    preload () {
        this.load.image('tree','./assets/tree.png');
        this.load.image('leaf','./assets/leaf.png');
        this.load.image('guardcell','./assets/guardcell.png');
        this.load.image('pore','./assets/pore.png');
        this.load.audio('music', './assets/testPHASER.ogg');
        this.load.image('co2','./assets/co2.png');
        this.load.image('h2o','./assets/h2o.png');
        this.load.image('palisade','./assets/palisade.png');
        this.load.bitmapFont('casual', './fonts/Unnamed.png', './fonts/Unnamed.xml');

    }

    create () {

        this.background = this.add.rectangle(-10, -10, 670, 370, 0xa0b335, 0.5)
            .setOrigin(0,0)
            .setInteractive();

        this.add.bitmapText(50, 20,'casual',  'Take in CO2',18)
          .setTint(0x423c56);

        this.add.bitmapText(50, 70,'casual',  'Prevent water\nloss',18)
        .setTint(0x423c56);
        

        //Stomata
        this.stomataButton = this.add.group();
        this.stomataButton.create(490, 110, 'pore').setScale(1)
        this.stomataButton.create(450, 110, 'guardcell').setScale( 1);
        this.stomataButton.create(530, 110, 'guardcell').setScale(1).toggleFlipY();

        //molecules
        this.add.image(445, 180, 'h2o').setScale(0.5);
        this.add.image(520, 160, 'h2o').setScale(0.5);
        this.add.image(520, 30, 'co2').setScale(0.5);
        this.add.image(420, 50, 'co2').setScale(0.5);

        //movement
        this.add.bitmapText(50, 150,'casual',  'Move stomata by pressing \nthe up and down arrow',18)
            .setTint(0x423c56);

        //photosynthesis
        this.add.image(490, 270, 'palisade').setScale(1);
        this.add.bitmapText(50, 240,'casual',  'Absorb CO2 through \nthe mesophyll cells',18)
            .setTint(0x423c56);


        //Sound
        this.speaker = this.add.image(625, 25, 'speaker')
            .setInteractive();

        if(game.soundPlay == false){
            this.speaker.setTint(0xf00000);
            game.soundTest.pause();
        };

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

        //scene transition
        this.background.on('pointerdown', () => {
            this.scene.start('Main', {game});
        })


    }

}