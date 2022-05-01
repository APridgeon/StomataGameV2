import { generateFullScreenButton, generateSpeakerButton } from "../src/commonComponents.js";
import eventsCenter from "./../src/eventsCenter.js";

export default class UIScene extends Phaser.Scene {
    constructor () {
        super('UI')
    }


    preload () {
    }

    create () {

        this.add.rectangle(0, 0, 650, 60, 0xffffff, 0.5).setOrigin(0,0);
        this.add.rectangle(0, 280, 650, 350, 0xffffff, 0.5).setOrigin(0,0);

        //parameters
        this.fontSize = 10;
        this.startingPoints = 80;

        //points system
        this.startingPoints = 80;
        this.data.set('waterLost', 0);
        this.data.set('carbonGain', 0);
        this.data.set('waterLevel', 0);
        this.data.set('points', this.startingPoints);

       //stats events
        eventsCenter.on('calculate-waterLevel', (waterLevel) => {
            this.data.set('waterLevel', waterLevel);
        })
        eventsCenter.on('increment-waterLost', () => {
            this.data.values.waterLost += 1;
        })
        eventsCenter.on('increment-carbonGain', () => {
            this.data.values.carbonGain += 1;
        })
        eventsCenter.on('increment-points', (points) => {
            this.data.values.points += points;
        })

        //music speakers
        generateSpeakerButton(this);
        generateFullScreenButton(this);

        //Water and CO2 states
        this.waterLevelText = this.add.bitmapText(5, 5,'casual',  'Current water level: 0', this.fontSize)
            .setTint(0x000000);
        this.waterText = this.add.bitmapText(5, 22,'casual', 'Total water lost: 0', this.fontSize)
            .setTint(0x000000);
        this.carbonText = this.add.bitmapText(5, 39,'casual', 'Total carbon gain: 0', this.fontSize)
            .setTint(0x000000);
        this.pointsText = this.add.bitmapText(450, 15,'casual', 'Points: ' + this.startingPoints, this.fontSize)
            .setTint(0x000000);


        //stat events listening for text
        this.events.on('changedata-waterLost', () => {
            this.waterText.text =  'Total water lost: ' + this.data.get('waterLost')
        })
        this.events.on('changedata-waterLevel', () => {
            this.waterLevelText.text =  'Current water level: ' +  this.data.get('waterLevel')
        })
        this.events.on('changedata-carbonGain', () => {
            this.carbonText.text =  'Total carbon gain: ' +  this.data.get('carbonGain')
        })
        this.events.on('changedata-points', () => {
            this.pointsText.text =  'Points: ' + this.data.get('points')
        })

 
        //Building cells
        this.instructText = this.add.bitmapText(10, 290,'casual', 'Click to\nselect a cell', this.fontSize)
            .setTint(0x423c56);

        //palisade cells
        this.palisadeButton = this.add.image(150, 315, 'palisade')
            .setScale(0.6)
            .setInteractive();
        this.palisadeButtonPrice = this.add.image(150, 260, 'star')
            .setOrigin(0,0)
            .setScale(1.2)
            .setVisible(false);
        this.palisadeButtonText = this.add.bitmapText(170, 280,'casual', '20', this.fontSize)
            .setTint(0xffffff)
            .setVisible(false)
            .setOrigin(0,0);
        
        this.palisadeButton
            .on('pointerdown', () => {
                if(this.data.values.points >= 20){
                    this.palisadeButton.setTint(0xf00000);
                    this.instructText.text = "Click to place\nthe cell";
                    eventsCenter.emit('create-pallisade');
                }
            })
            .on('pointerover', () => {
                this.palisadeButtonPrice.setVisible(true);
                this.palisadeButtonText.setVisible(true);
            })
            .on('pointerout', () => {
                this.palisadeButtonPrice.setVisible(false);
                this.palisadeButtonText.setVisible(false);
            })
        
 
        eventsCenter.on('palisade-finish', (answer) => {
            this.instructText.text = 'Click to\nselect a cell';
            this.palisadeButton.clearTint();
            this.data.values.points -= 20;
        })

        //stomata

        this.stomataButton = this.add.group();
        this.stomataButton.create(250, 320, 'pore').setScale(0.6)
        this.stomataButton.create(230, 320, 'guardcell').setScale(0.6);
        this.stomataButton.create(270, 320, 'guardcell').setScale(0.6).toggleFlipY();
        this.stomataButtonPrice = this.add.image(250, 260, 'star').setOrigin(0,0)
            .setScale(1.2)
            .setVisible(false);
        this.stomataButtonText  = this.add.bitmapText(270, 280,'casual', '10', this.fontSize)
            .setTint(0xffffff)
            .setVisible(false)
            .setOrigin(0,0);

        this.stomataButton.getChildren().forEach(child => {
            child.setInteractive()
                .on('pointerdown', () => {
                    if(this.data.values.points >= 10){
                        this.stomataButton.getChildren().forEach(child2 => {
                            child2.setTint(0xf00000);
                        });
                        this.instructText.text = "Click to place\nthe cell"
                        eventsCenter.emit('create-stomata');
                    }
                })
                .on('pointerover', () => {
                    this.stomataButtonPrice.setVisible(true);
                    this.stomataButtonText.setVisible(true);
                })
                .on('pointerout', () => {
                    this.stomataButtonPrice.setVisible(false);
                    this.stomataButtonText.setVisible(false);
                })
        })

        eventsCenter.on('stomata-finish', (answer) => {
            this.instructText.text = 'Click to\nselect a cell';
            this.stomataButton.getChildren().forEach(child2 => {
                child2.clearTint();
            });
            this.data.values.points -= 10;
        })

        //spongey cell
        this.spongeButton = this.add.image(350, 320, 'sponge');
        this.spongeButtonPrice = this.add.image(350, 260, 'star').setOrigin(0,0)
            .setScale(1.2)
            .setVisible(false);
        this.spongeButtonText  = this.add.bitmapText(375, 280,'casual', '5', this.fontSize)
            .setTint(0xffffff)
            .setVisible(false)
            .setOrigin(0,0);

        this.spongeButton
            .setScale(0.6)
            .setInteractive()
            .on('pointerdown', () => {
                if(this.data.values.points >= 5){
                    this.spongeButton.setTint(0xf00000);
                    this.instructText.text = "Click to place\nthe cell";
                    eventsCenter.emit('create-sponge');
                }
            })
            .on('pointerover', () => {
                this.spongeButtonPrice.setVisible(true);
                this.spongeButtonText.setVisible(true);
            })
            .on('pointerout', () => {
                this.spongeButtonPrice.setVisible(false);
                this.spongeButtonText.setVisible(false);
            })

        eventsCenter.on('sponge-finish', (answer) => {
            this.instructText.text = 'Click to\nselect a cell';
            this.spongeButton.clearTint();
            this.data.values.points -= 5;
        })

        //stomatal movement buttons

        this.add.bitmapText(450, 330,'casual', 'Open', this.fontSize)
            .setTint(0x000000);

        this.upArrow = this.add.image(500, 320, 'arrow')
            .setInteractive()
            .on('pointerover', () => {
                this.upArrow.setTint(0xf00000);
                eventsCenter.emit("stomatal-movement", "open");
            })
            .on('pointerout', () => {
                this.upArrow.clearTint();
                eventsCenter.emit("stomatal-movement", "none");
            })
        
        this.add.bitmapText(565, 330,'casual', 'Close', this.fontSize)
            .setTint(0x000000);

        this.downArrow = this.add.image(550, 320, 'arrow')
            .setInteractive()
            .toggleFlipY()
            .on('pointerover', () => {
                this.downArrow.setTint(0xf00000);
                eventsCenter.emit("stomatal-movement", "close");
            })
            .on('pointerout', () => {
                this.downArrow.clearTint();
                eventsCenter.emit("stomatal-movement", "none");
            })


        //Game events

        //GameOver
        this.gameOverTime = this.time.addEvent({
            delay: 30000,                // ms
            callback: gameOver,//callback,
            args: [],
            callbackScope: this,
            loop: false,
            repeat: -1,
            startAt: 0,
            timeScale: 1,
            paused: true
        });

        this.reachedWaterLevel = false;
        this.waterLimit = 20;

        this.events.on('changedata-waterLevel', () => {
            if(this.data.get('waterLevel') < this.waterLimit && this.gameOverTime.paused == true){
                this.gameOverTime.paused = false;
            }
            if(this.data.get('waterLevel') >= this.waterLimit){
                //tip
                if(!this.reachedWaterLevel){
                    let text = this.add.bitmapText(70, 100,'casual', "Keep water above " + this.waterLimit + "!", 30)
                        .setTint(0x000000)
                        .setDepth(101);
                    let rect = this.add.rectangle(-10, -10, 670, 370, 0xa0b335, 0.8)
                        .setInteractive()
                        .setDepth(100)
                        .setOrigin(0,0)
                        .on('pointerdown', () => {
                            rect.visible = false;
                            text.visible = false;
                        })
                    
                }
                this.reachedWaterLevel = true;
                this.gameOverTime.reset();
                this.gameOverTime.paused = true;
                this.gameOverTime.delay = 30000;
                this.gameOverTime.callback = gameOver
                this.gameOverTime.callbackScope = this;
            }
        });

        //lack of water causes increase in screen red
        this.redScreen = this.add.rectangle(-10, -10, 670, 370, 0xf00000, 0)
            .setOrigin(0,0)
            .setDepth(200)
        this.events.on('changedata-waterLevel', () => {
            if(this.reachedWaterLevel){
                this.redScreen.fillAlpha = this.gameOverTime.elapsed/30000;
            }
        })


        function gameOver(){
            if(!this.reachedWaterLevel){
            } else {
                eventsCenter.emit('endScene');
                this.scene.stop('UI');
                this.scene.start('Points', {
                    waterLost: this.data.get('waterLost'),
                    carbonGain: this.data.get('carbonGain')
                })
            }
    
            this.gameOverTime.paused = true;
        }


    }

}