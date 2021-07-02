
var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title')
    }

    preload () {
        this.load.image('tree','./assets/tree.png');
        this.load.image('leaf','./assets/leaf.png');

        this.load.audio('music', 
            './assets/testPHASER.ogg'
        );
    }

    create () {
        this.add.rectangle(-10, -10, (isMobile) ? 670 : 620, (isMobile) ? 370 : 620, 0xa0b335, 0.5).setOrigin(0,0);

        this.add.text((isMobile) ? 100 : 70, (isMobile) ? 40 : 70, 'You Are a Leaf', { fontSize: '40px', fill: '#423c56' , fontFamily: '"font1"'});
        this.add.text((isMobile) ? 120 : 90, (isMobile) ? 110 : 150, 'Click to begin', { fontSize: '16px', fill: '#423c56' , fontFamily: '"font1"'});

        this.add.image(100, 270,'tree')
        this.add.image((isMobile) ? 550 : 500, 270,'tree')
        this.add.image((isMobile) ? 325 : 300, (isMobile) ? 220 : 450,'leaf').setScale(1.5)


        this.soundTest = this.sound.add('music');
        this.soundTest.play({
            loop: true
        });

        console.log(this.scene)
        this.input.on('pointerdown', () => {
            this.scene.start('Main');
            this.soundTest.stop();
        })
    }

}
