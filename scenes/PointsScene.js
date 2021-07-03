
var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
let game;
let waterLost;
let carbonGain;

export default class PointsScene extends Phaser.Scene {
    constructor () {
        super('Points')
    }
    init (data) {
        game = data.game;
        waterLost = data.waterLost;
        carbonGain = data.carbonGain;
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

        this.add.text((isMobile) ? 100 : 70, (isMobile) ? 40 : 100, 'Game over!', { fontSize: '40px', fill: '#423c56' , fontFamily: '"font1"'});
        this.add.text((isMobile) ? 100 : 70, (isMobile) ? 130 : 210, 'Total water lost: ' + waterLost, { fontSize: '20px', fill: '#423c56' , fontFamily: '"font1"'});
        this.add.text((isMobile) ? 100 : 70, (isMobile) ? 170 : 280, 'Total carbon gain: ' + carbonGain, { fontSize: '20px', fill: '#423c56' , fontFamily: '"font1"'});
        this.add.text((isMobile) ? 100 : 70, (isMobile) ? 210 : 350, 'Water Use Efficiency: ' + (carbonGain/waterLost).toFixed(3), { fontSize: '20px', fill: '#423c56' , fontFamily: '"font1"'});

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
            game.soundTest.stop()
            this.scene.start('Title');
        })
    }

}