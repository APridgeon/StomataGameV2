import { initialiseStomata, makeStomata } from "../src/cells/stomata.js";

var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
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

    }

    create () {
        this.background = this.add.rectangle(-10, -10, (isMobile) ? 670 : 620, (isMobile) ? 370 : 620, 0xa0b335, 0.5)
            .setOrigin(0,0)
            .setInteractive();

        this.add.text((isMobile) ? 50 : 50, (isMobile) ? 20 : 70,
         'Take in CO2',
          { fontSize: (isMobile) ? '17px' : '20px', fill: '#423c56' , fontFamily: '"font1"'});
        this.add.text((isMobile) ? 50 : 50, (isMobile) ? 70 : 150,
        'Prevent H2O \nloss',
        { fontSize: (isMobile) ? '17px' : '20px', fill: '#423c56' , fontFamily: '"font1"'});

        //Stomata
        this.stomataButton = this.add.group();
        this.stomataButton.create((isMobile) ? 490 : 430, (isMobile) ? 110 : 150, 'pore').setScale((isMobile) ? 1 : 1.5)
        this.stomataButton.create((isMobile) ? 450 : 375, (isMobile) ? 110 : 150, 'guardcell').setScale((isMobile) ? 1 : 1.5);
        this.stomataButton.create((isMobile) ? 530 : 485, (isMobile) ? 110 : 150, 'guardcell').setScale((isMobile) ? 1 : 1.5).toggleFlipY();

        //molecules
        this.add.image((isMobile) ? 445 : 415, (isMobile) ? 180 : 240, 'h2o').setScale(0.5);
        this.add.image((isMobile) ? 520 : 480, (isMobile) ? 160 : 220, 'h2o').setScale(0.5);
        this.add.image((isMobile) ? 520 : 480, (isMobile) ? 30 : 30, 'co2').setScale(0.5);
        this.add.image((isMobile) ? 420 : 380, (isMobile) ? 50 : 50, 'co2').setScale(0.5);

        //movement
        this.add.text((isMobile) ? 50 : 50, (isMobile) ? 150 : 280, 'Move stomata by pressing \nthe up and down arrow', { fontSize: (isMobile) ? '17px' : '20px', fill: '#423c56' , fontFamily: '"font1"'});

        //photosynthesis
        this.add.image((isMobile) ? 490 : 450, (isMobile) ? 270 : 460, 'palisade').setScale((isMobile) ? 1 : 1.2);
        this.add.text((isMobile) ? 50 : 50, (isMobile) ? 240 : 430, 'Absorb CO2 through \nthe mesophyll cells', { fontSize: (isMobile) ? '17px' : '20px', fill: '#423c56' , fontFamily: '"font1"'});

        //Sound
        this.speaker = this.add.image((isMobile) ? 625 : 575, 25, 'speaker')
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