import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyAojsdPJiHhyYDpO7ikD0zdPxpGmq99qAY",
    authDomain: "youarealeaf-56830.firebaseapp.com",
    databaseURL: "https://youarealeaf-56830-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "youarealeaf-56830",
    storageBucket: "youarealeaf-56830.appspot.com",
    messagingSenderId: "279688498101",
    appId: "1:279688498101:web:e2ea4c02d0f5c133e0e7fc",
    measurementId: "G-SEBT3591D8"
  };
  


const app = initializeApp(firebaseConfig);



var isMobile = (window.innerWidth < 500 || window.innerHeight < 500) ? true : false;
let game;
let waterLost;
let carbonGain;



function writeUserData(waterLost, carbonGain) {
    const db = getDatabase();
    push(ref(db, 'Leaderboard/'), {
      waterloss: waterLost,
      carbonGain: carbonGain,
      WUE: (carbonGain/waterLost).toFixed(3)
    });
  }




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
        this.load.image('block', './assets/block.png');
    }

    create () {

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
            let background = this.add.rectangle((30 * i) + 188.5, 192, 21, 35, 0xff0000, 0.4)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .on("pointerover", () => {
                    this.alpha = 0.9
                });
            let text = this.add.bitmapText((30 * i) + 190, 190, 'casual', chars1[i], 20)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    text.setTint(0xff0000)
                    this.name.text += text.text;
                })
                .on('pointerup', () => {
                    text.clearTint()
                })
            charObjectArray.push(text);
        }
        for(let i = 0; i < chars2.length; i++){
            let background = this.add.rectangle((30 * i) + 188.5, 232, 21, 35, 0xff0000, 0.4)
                .setOrigin(0.5, 0.5);
            let text = this.add.bitmapText((30 * i) + 190, 230, 'casual', chars2[i], 20)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    text.setTint(0xff0000)
                    this.name.text += text.text;
                })
                .on('pointerup', () => {
                    text.clearTint()
                })
            charObjectArray.push(text);
        }
        for(let i = 0; i < chars3.length; i++){
            let background = this.add.rectangle((30 * i) + 188.5, 272, 21, 35, 0xff0000, 0.4)
                .setOrigin(0.5, 0.5);
            let text = this.add.bitmapText((30 * i) + 190, 270, 'casual', chars3[i], 20)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                text.setTint(0xff0000)
                this.name.text += text.text;
            })
            .on('pointerup', () => {
                text.clearTint()
            })
            charObjectArray.push(text);
        }

        this.add.rectangle(500, 300, 50, 50, 0xff0000, 0.4)
            .setInteractive()
            .on('pointerdown', () => {
                console.log(this.name.text)
            });
        
        //http://phaser.io/examples/v3/view/input/keyboard/retro-leaderboard

        //Sound
        this.speaker = this.add.image((isMobile) ? 625 : 575, 25, 'speaker')
            .setInteractive();

        if(game.soundPlay == false){
            this.speaker.setTint(0xf00000);
            game.soundTest.pause();
        };

        this.speaker.on('pointerdown', () => {
            writeUserData(122, 344);
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