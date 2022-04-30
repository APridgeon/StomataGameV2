import {app, auth, provider, signInWithPopup, writeUserData} from "./../src/firebaseInit.js";


var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
let waterLost;
let carbonGain;


export default class PointsScene extends Phaser.Scene {
    constructor () {
        super('Points')
    }
    init (data) {
        waterLost = data.waterLost;
        carbonGain = data.carbonGain;
    }

    preload () {
        this.load.image('block', './assets/block.png');
    }

    create () {

        this.cameras.main.setBounds(0, 0, 650, 350);

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


        this.add.bitmapText(100, 15, 'casual', 'Game over!', 30)
            .setTint(0x423c56);
        this.add.bitmapText(100, 70, 'casual', 'Total water lost: ' + waterLost, 15)
            .setTint(0x423c56);  
        this.add.bitmapText(100, 100, 'casual', 'Total carbon gain: ' + carbonGain, 15)
                .setTint(0x423c56);  
        this.add.bitmapText(100, 130, 'casual', 'Water Use Efficiency: ' + (carbonGain/waterLost).toFixed(3), 15)
                .setTint(0x423c56);  

        this.name = this.add.bitmapText(100, 305, 'casual', 'Name: ', 25)
            .setAlpha(0)
            .setTint(0x423c56);  

        this.tweens.add({
            targets: this.name,
            ease: 'sine',
            alpha: 1, 
            hold: 200,
            yoyo: true,
            duration: 500,
            loop: -1
        })

        //text input

        let chars1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
        let chars2 = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
        let chars3 = ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', ];
        let charObjectArray = []

        for(let i = 0; i < chars1.length; i++){
            let background = this.add.rectangle((30 * i) + 188.5, 192, 21, 35, 0xff0000)
                .setAlpha(0.4)
                .setOrigin(0.5, 0.5)
                .setInteractive();

            let text = this.add.bitmapText((30 * i) + 190, 190, 'casual', chars1[i], 20)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    text.setTint(0xff0000)
                    if(this.name.text.length < 11){
                        this.name.text += text.text;
                    }
                })
                .on('pointerup', () => {
                    text.clearTint()
                })
                .on('pointerover', () => {
                    background.setAlpha(0.9)
                })
                .on('pointerout', () => {
                    background.setAlpha(0.4)
                })
            charObjectArray.push(text);
        }
        for(let i = 0; i < chars2.length; i++){
            let background = this.add.rectangle((30 * i) + 188.5, 232, 21, 35, 0xff0000)
                .setAlpha(0.4)
                .setOrigin(0.5, 0.5);
            let text = this.add.bitmapText((30 * i) + 190, 230, 'casual', chars2[i], 20)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    text.setTint(0xff0000)
                    if(this.name.text.length < 11){
                        this.name.text += text.text;
                    }
                })
                .on('pointerup', () => {
                    text.clearTint()
                })
                .on('pointerover', () => {
                    background.setAlpha(0.9)
                })
                .on('pointerout', () => {
                    background.setAlpha(0.4)
                })
            charObjectArray.push(text);
        }
        for(let i = 0; i < chars3.length; i++){
            let background = this.add.rectangle((30 * i) + 188.5, 272, 21, 35, 0xff0000)
                .setAlpha(0.4)
                .setOrigin(0.5, 0.5);
            let text = this.add.bitmapText((30 * i) + 190, 270, 'casual', chars3[i], 20)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                text.setTint(0xff0000)
                if(this.name.text.length < 11){
                    this.name.text += text.text;
                }
            })
            .on('pointerup', () => {
                text.clearTint()
            })
            .on('pointerover', () => {
                background.setAlpha(0.9)
            })
            .on('pointerout', () => {
                background.setAlpha(0.4)
            })
            charObjectArray.push(text);
        }

        this.deleteButton = this.add.rectangle((30 * 8.5) + 188.5, 272, 21 * 2.5, 35, 0xff0000)
            .setAlpha(0.4)
            .setOrigin(0.5, 0.5);
        this.deleteText = this.add.bitmapText((30 * 8.5) + 190, 272, 'casual', 'del',18)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => {
                this.deleteButton.setAlpha(0.9)
            })
            .on('pointerout', () => {
                this.deleteButton.setAlpha(0.4)
            })
            .on('pointerdown', () => {
                this.deleteText.setTint(0xff0000)
                if(this.name.text.length > 6){
                    this.name.text = this.name.text.substring(0, this.name.text.length - 1)
                }
            })
            .on('pointerup', () => {
                this.deleteText.clearTint()
            })

        this.submitButton = this.add.rectangle(570, 300, 120, 50, 0xff0000)
            .setAlpha(0.4)
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .on('pointerover', () => {
                this.submitButton.setAlpha(0.9)
            })
            .on('pointerout', () => {
                this.submitButton.setAlpha(0.4)
            })
            
        
        this.submitText = this.add.bitmapText(570, 300, 'casual', 'Submit', 18)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.submitText.setTint(0xff0000)
                let name = this.name.text.substring(6)
                if(name){
                    signInWithPopup(auth, provider)
                        .then(result => {
                            writeUserData(122, 3044, name);
                            this.scene.start('LeaderBoard');
                        });
                } else {
                    this.cameras.main.shake(500, 0.01);
                }
            })
            .on('pointerup', () => {
                this.submitText.clearTint()
            })
            .on('pointerover', () => {
                this.submitButton.setAlpha(0.9)
            })
            .on('pointerout', () => {
                this.submitButton.setAlpha(0.4)
            })
            
        
        //http://phaser.io/examples/v3/view/input/keyboard/retro-leaderboard

        //Sound
        this.speaker = this.add.image((isMobile) ? 625 : 575, 25, 'speaker')
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
            } else if(this.sys.game.soundPlay == true){
                this.sys.game.soundTest.pause();
                this.sys.game.soundPlay = false;
                this.speaker.setTint(0xf00000);
            }
            
        })

    }

}

