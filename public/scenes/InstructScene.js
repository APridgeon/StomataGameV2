import { initialiseStomata, makeStomata } from "../src/Cells/stomata.js";


export default class InstructScene extends Phaser.Scene {
    constructor () {
        super('Instruct')
    }

    preload () {
    }

    create () {

        this.cameras.main.fadeIn(1000, 0,0,0);

        this.background = this.add.graphics()
            .fillGradientStyle(0x537c44,0x537c44,0xf8f644,0xf8f644, 0.7)
            .fillRect(-1500/2, -1500/2, 1500, 1500)
            .setDepth(-2);

        this.tweens.add({
            targets: this.background,
            angle:360,
            ease:'linear',
            loop:-1,
            duration: 5000
        })

        this.skipText = this.add.bitmapText(20, 300, 'casualTitle', 'SKIP?', 28)
            .setOrigin(0,0)
            .setLetterSpacing(15)
            .setAlpha(1)
            .setInteractive()
            .on('pointerover', () => {
                this.skipText.setScale(1.2)
                this.skipText.setTint(0xff0000)
            })
            .on('pointerout', () => {
                this.skipText.setScale(1)
                this.skipText.clearTint()
            })
            .on('pointerdown', () => {
                this.scene.start('Main');
            });
        
        this.leaf = this.add.image(325, 220,'leaf')
            .setScale(1.5)
            .setAlpha(0);

        this.leafText = this.add.bitmapText(50, 50, 'casualTitle', 'Plants are alive!', 28)
            .setLetterSpacing(15)
            .setAlpha(0);

        this.surfaceText = this.add.bitmapText(200, 250, 'casualTitle', 'On the surface \nof leaves...', 28)
            .setLetterSpacing(15)
            .setAlpha(0);
        

        this.anims.create({
            key: 'stom',
            frames: this.anims.generateFrameNumbers('stomata', {start: 0, end: 3}),
            frameRate: 2,
            repeat: -1
        });

        this.stomata = this.add.sprite(500,100,'stomata')
            .setAlpha(0)
            .setScale(3);
        this.stomata.anims.play('stom');

        this.stomataText = this.add.bitmapText(50, 50, 'casualTitle', 'They open and \nclose stomata', 28)
            .setAlpha(0)
            .setLetterSpacing(15);


        this.epidermis = this.add.image(0,200, 'epidermis')
            .setOrigin(0,0)
            .setAlpha(0);
        this.StomataPore = this.add.image(290, 200, 'pore')
            .setOrigin(0,0)
            .setScale(1.2)
            .setAlpha(0);
        this.StomataL = this.add.image(280, 190, 'guardcell')
            .setOrigin(0,0)
            .setScale(1.5)
            .setAlpha(0);
        this.StomataR = this.add.image(320, 190, 'guardcell')
            .setOrigin(0,0)
            .setScale(1.5)
            .setAlpha(0);

        this.CO2Text = this.add.bitmapText(50, 50, 'casualTitle', 'To capture CO2', 28)
            .setAlpha(0)
            .setLetterSpacing(15);

        this.CO2 = this.add.image(320, 100, 'co2')
            .setAlpha(0)
            .setScale(0.5)
            .setOrigin(0,0);

        this.H2OText = this.add.bitmapText(50, 50, 'casualTitle', 'And restrict \nwaterloss', 28)
            .setAlpha(0)
            .setLetterSpacing(15);

        this.H2O = this.add.image(320, 300, 'h2o')
            .setAlpha(0)
            .setScale(0.5)
            .setOrigin(0,0);

        this.fixText = this.add.bitmapText(50, 50, 'casualTitle', 'They then use CO2\nto make sugars', 28)
            .setAlpha(0)
            .setLetterSpacing(15);


        this.photosynthesisText = this.add.bitmapText(45, 250, 'casual', 'Photosynthesis', 50)
            .setTint(0xff0000)
            .setDepth(10)
            .setAlpha(0);
        
        this.palisade = this.add.image(400, 200, 'palisade')
            .setOrigin(0,0)
            .setScale(1)
            .setAlpha(0);

        this.CO2_2 = this.add.image(150, 220, 'co2')
            .setAlpha(0)
            .setScale(0.5)
            .setDepth(-1)
            .setOrigin(0,0);

        this.plantText = this.add.bitmapText(330, 170, 'casualTitle', 'To live their\nbest plant lives', 28, 1)
            .setLetterSpacing(15)
            .setOrigin(0.5,0.5)
            .setDepth(-1)
            .setAlpha(0); 

        this.tree = this.add.image(325, 175, 'tree')
            .setOrigin(0.5, 0.5)
            .setScale(0.01)
            .setAlpha(0);

        this.youText = this.add.bitmapText(330, 170, 'casualTitle', 'How well can you do?', 28, 1)
            .setLetterSpacing(15)
            .setOrigin(0.5,0.5)
            .setDepth(-1)
            .setAlpha(0); 

        this.bottomControls =  this.add.rectangle(0, 280, 650, 350, 0xffffff, 0.5)
            .setOrigin(0,0)
            .setAlpha(0)
            .setDepth(-1);
        
        this.controlText = this.add.bitmapText(330, 150, 'casualTitle', 'Control leaf physiology', 26, 1)
            .setLetterSpacing(15)
            .setOrigin(0.5,0.5)
            .setDepth(-1)
            .setAlpha(0); 

        
        this.buttonsGroup = this.add.group();
        this.buttonsGroup.create(150, 320, 'pore').setScale(0.6)
        this.buttonsGroup.create(130, 320, 'guardcell').setScale(0.6);
        this.buttonsGroup.create(170, 320, 'guardcell').setScale(0.6).toggleFlipY();
        this.palisadeButton = this.add.image(50, 315, 'palisade')
            .setScale(0.6)
            .setInteractive();
        this.spongeButton = this.add.image(260, 320, 'sponge')
            .setScale(0.6);
        this.buttonsGroup.addMultiple([this.palisadeButton, this.spongeButton])
            .setAlpha(0);

        this.controlText2 = this.add.bitmapText(470, 320, 'casualTitle', 'By placing cells', 20, 1)
            .setLetterSpacing(15)
            .setOrigin(0.5,0.5)
            .setDepth(-1)
            .setAlpha(0); 

        this.controlText3 = this.add.bitmapText(220, 320, 'casualTitle', 'and moving stomata', 20, 1)
            .setLetterSpacing(15)
            .setOrigin(0.5,0.5)
            .setDepth(-1)
            .setAlpha(0); 

        this.stomataControls = this.add.group();
        this.open = this.add.bitmapText(450, 330,'casual', 'Open', 10)
            .setTint(0x000000);
        this.upArrow = this.add.image(500, 320, 'arrow')
        this.close = this.add.bitmapText(565, 330,'casual', 'Close', 10)
            .setTint(0x000000);
        this.downArrow = this.add.image(550, 320, 'arrow')
        this.stomataControls.addMultiple([this.open, this.upArrow, this.close, this.downArrow])
            .setAlpha(0);

        this.goodLuck = this.add.bitmapText(325, 175, 'casualTitle', 'Good Luck!!', 38)
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setLetterSpacing(15);

        this.leaf2 = this.add.image(325, 175,'leaf')
            .setOrigin(0.5, 0.5)
            .setDepth(-1)
            .setScale(1.5)
            .setAlpha(0);

        this.cameras.main.once('camerafadeincomplete', () => { 
            this.tweens.add({
                targets: this.leaf,
                alpha: 1,
                duration: 500
            })
            this.tweens.add({
                targets: this.leafText,
                alpha: 1,
                duration: 500,
                delay: 800
            })
            this.tweens.add({
                targets: this.leaf,
                ease: 'linear',
                scale: 5,
                alpha: 0,
                duration: 5000,
                delay:3000
            })
            this.tweens.add({
                targets: this.leafText,
                alpha: 0,
                duration: 500,
                delay: 4500
            })
            this.tweens.add({
                targets: this.surfaceText,
                alpha: 1,
                yoyo: true,
                ease: 'cubic',
                duration: 1500,
                delay: 3500
            })
            this.tweens.add({
                targets: [this.stomata, this.stomataText],
                alpha: 1,
                duration: 1000,
                delay: 6000
            })
            this.tweens.add({
                targets: [this.epidermis, this.StomataPore],
                alpha: 1,
                duration: 1000,
                delay: 7000
            })
            this.tweens.add({
                targets: this.StomataL,
                alpha: 1,
                x: 250,
                duration: 1000,
                delay: 7000
            })
            this.tweens.add({
                targets: this.StomataR,
                alpha: 1,
                x: 350,
                duration: 1000,
                delay: 7000
            })
            this.tweens.add({
                targets: [this.stomata, this.stomataText],
                alpha: 0,
                duration: 1000,
                delay: 8000
            })
            this.tweens.add({
                targets: this.CO2Text,
                alpha: 1,
                duration: 1000,
                delay: 9000
            })
            this.tweens.add({
                targets: this.CO2,
                alpha: 1,
                y: 300,
                duration: 2000,
                delay: 9000
            })
            this.tweens.add({
                targets: [this.CO2Text, this.CO2],
                alpha: 0,
                duration: 1000,
                delay: 11000
            })
            this.tweens.add({
                targets: this.StomataL,
                alpha: 1,
                x: 280,
                duration: 1000,
                delay: 11000
            })
            this.tweens.add({
                targets: this.StomataR,
                alpha: 1,
                x: 320,
                duration: 1000,
                delay: 11000
            })
            this.tweens.add({
                targets: this.H2OText,
                alpha: 1,
                duration: 1000,
                delay: 12000
            })
            this.tweens.add({
                targets: this.H2O,
                alpha: 1,
                y: 240,
                yoyo: true,
                duration: 1000,
                delay: 12000
            })
            this.tweens.add({
                targets: [this.H2O, this.H2OText, this.StomataL, this.StomataR, this.StomataPore, this.epidermis],
                alpha: 0,
                duration: 1000,
                delay: 14000
            })
            this.tweens.add({
                targets: [this.fixText, this.palisade],
                alpha: 1,
                duration: 1000,
                delay: 15000
            })
            this.tweens.add({
                targets: this.CO2_2,
                alpha: 1,
                duration: 500,
                delay: 15000
            })
            this.tweens.add({
                targets: this.CO2_2,
                x:420,
                duration: 2000,
                delay: 15000
            })
            this.tweens.add({
                targets: this.palisade,
                scale: 1.1,
                yoyo: true,
                duration: 100,
                delay: 16900
            })
            this.tweens.add({
                targets: [this.palisade, this.CO2_2, this.fixText],
                alpha: 0,
                duration: 1000,
                delay: 17500
            })

            this.tweens.add({
                targets: this.photosynthesisText,
                alpha: 1,
                yoyo: true,
                duration: 1000,
                delay: 16000
            })

            this.tweens.add({
                targets: this.plantText,
                alpha: 1,
                duration: 1000,
                delay: 19000
            })
            this.tweens.add({
                targets: this.plantText,
                ease: 'linear',
                scale: 10,
                alpha: 0,
                duration: 5000,
                delay: 20000
            })
            this.tweens.add({
                targets: this.tree,
                ease: 'linear',
                alpha: 1,
                duration: 500,
                delay: 22000
            })

            this.tweens.add({
                targets: this.tree,
                ease: 'linear',
                scale: 20,
                angle: 360,
                duration: 5000,
                delay: 22000
            })
            this.tweens.add({
                targets: this.tree,
                ease: 'power2',
                alpha: 0,
                duration: 500,
                delay: 25000
            }) 

            this.tweens.add({
                targets: this.youText,
                alpha: 1,
                yoyo: true,
                duration: 1200,
                delay: 26000
            })

            this.tweens.add({
                targets: this.bottomControls,
                alpha: 1,
                duration: 500,
                delay: 28000
            })

            this.tweens.add({
                targets: this.skipText,
                y: 20,
                duration: 500,
                delay: 28000
            })

            this.tweens.add({
                targets: this.controlText,
                alpha: 1,
                duration: 1000,
                delay: 28500
            })

            this.tweens.add({
                targets: this.buttonsGroup.getChildren().map(function (c) { return c }),
                yoyo: true,
                hold:1000,
                alpha: 1,
                duration: 500,
                delay: 30000
            })
            this.tweens.add({
                targets: this.controlText2,
                yoyo: true,
                hold:1000,
                alpha: 1,
                duration: 500,
                delay: 30000
            })

            this.tweens.add({
                targets: this.controlText3,
                yoyo: true,
                hold:1500,
                alpha: 1,
                duration: 500,
                delay: 32000
            })
            this.tweens.add({
                targets: this.stomataControls.getChildren().map(function (c) { return c }),
                yoyo: true,
                hold:1500,
                alpha: 1,
                duration: 500,
                delay: 32000
            })
            this.tweens.add({
                targets: this.controlText,
                alpha: 0,
                duration: 1000,
                delay: 32500
            })
            this.tweens.add({
                targets: [this.goodLuck, this.leaf2],
                alpha: 1,
                duration: 500,
                delay: 34500
            })

            this.tweens.add({
                targets: [this.goodLuck, this.leaf2],
                ease: 'linear',
                angle: 360,
                scale: 10,
                duration: 3000,
                delay: 35500,
                onComplete: () => {
                    this.cameras.main.fadeOut(1000, 0,0,0);
                    this.cameras.main.once('camerafadeoutcomplete', () => { 
                        this.scene.start('Main');
                    })
                }
            })

        })

        //Sound
        this.speaker = this.add.image(625, 25, 'speaker')
            .setInteractive();

        if(this.sys.game.soundPlay == false){
            this.speaker.setTint(0xf00000);
            this.sys.game.soundTest.pause();
        };

        this.speaker.on('pointerdown', () => {
            if(this.sys.game.soundPlay == false){
                this.sys.game.soundTest.resume();
                this.sys.game.soundPlay = true;
                this.speaker.clearTint();
            } else if(game.soundPlay == true){
                this.sys.game.soundTest.pause();
                this.sys.game.soundPlay = false;
                this.speaker.setTint(0xf00000);
            }
            
        })

    }

}