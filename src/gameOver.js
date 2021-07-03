export function gameOverInit(t, game) {

    //GameOver
    t.gameOverTime = t.time.addEvent({
        delay: 30000,                // ms
        callback: gameOver,//callback,
        args: [],
        callbackScope: t,
        loop: false,
        repeat: -1,
        startAt: 0,
        timeScale: 1,
        paused: true
    });

    t.reachedWaterLevel = false;

    t.waterLimit = t.isMobile ? 20 : 15;

    t.events.on('changedata-waterLevel', () => {
        if(t.data.get('waterLevel') < t.waterLimit && t.gameOverTime.paused == true){
            t.gameOverTime.paused = false;
        }
        if(t.data.get('waterLevel') >= t.waterLimit){
            //tip
            if(!t.reachedWaterLevel){
                let text = t.add.text( 70, 100, "Keep water above " + t.waterLimit + "!", { fontSize: '30px', fill: '#000' , fontFamily: '"font1"'})
                    .setDepth(101)
                let rect = t.add.rectangle(-10, -10, (t.isMobile) ? 670 : 620, (t.isMobile) ? 370 : 620, 0xa0b335, 0.8)
                    .setInteractive()
                    .setDepth(100)
                    .setOrigin(0,0)
                    .on('pointerdown', () => {
                        rect.visible = false;
                        text.visible = false;
                    })
                
            }
            t.reachedWaterLevel = true;
            t.gameOverTime.reset();
            t.gameOverTime.paused = true;
            t.gameOverTime.delay = 30000;
            t.gameOverTime.callback = gameOver
            t.gameOverTime.callbackScope = t;
        }
    });

    //lack of water causes increase in screen red
    t.redScreen = t.add.rectangle(-10, -10, (t.isMobile) ? 670 : 620, (t.isMobile) ? 370 : 620, 0xf00000, 0)
        .setOrigin(0,0)
        .setDepth(200)
    t.events.on('changedata-waterLevel', () => {
        if(t.reachedWaterLevel){
            t.redScreen.fillAlpha = t.gameOverTime.elapsed/30000;
        }
    })
    

    function gameOver(){
        console.log(this.gameOverTime);
        if(!this.reachedWaterLevel){
        } else {
            this.scene.start('Points', {
                game,
                waterLost: this.data.get('waterLost'),
                carbonGain: this.data.get('carbonGain')
            })
        }
        
        this.gameOverTime.paused = true;
    }


}

