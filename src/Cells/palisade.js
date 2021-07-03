
export function initialisePalisades(t)
{
    t.palisades = t.physics.add.group();
    t.palisadeDelays = [];
    t.palisadeTweens = [];
}

export function makePalisade(X, Y, t)
{
    if(t.data.values.points >= 20){

        let palisade = t.palisades.create(X,Y,'palisade')
            .setScale((t.isMobile) ? 0.6 : 0.75)
            .setImmovable(true)
            .setBodySize(50,90, true)
            .setDepth(5);
    
        palisade.setDataEnabled();
        palisade.data.set('active',false);
    
        t.H2Ogroup.getChildren().forEach(child => {
            t.physics.add.collider(child, palisade);
        })
        
        t.CO2group.getChildren().forEach(child => {
            t.physics.add.collider(palisade, child, CO2palisade, null, t);
        })
    
        //this adds the palisade animation + delay
        let palisadeDelay = t.time.addEvent({delay: 5000, 
            callback: function() {
                palisade.clearTint();
                palisade.data.set('active', true);
                palisadeDelay.paused = true;
            }, callbackScope: t, repeat: -1})
    
        t.palisadeDelays.push(palisadeDelay );
                
        t.palisadeTweens.push( t.add.tween({
            targets: palisade,
            scaleX: (t.isMobile) ? 0.7 : 0.85,
            scaleY: (t.isMobile) ? 0.7 : 0.85,
            ease: 'Power2',
            duration: 500,
            repeat: 0,
            yoyo: true,
            onComplete: () => {
                palisade.clearTint();
                palisade.setTint(0xf00000);
                palisade.data.set('active', 'false');
                palisadeDelay.paused = false;
            }
        }));

        //deleting cells
        palisade.setInteractive()
            .on('pointerover', () => {
                palisade.setTint(0xf00000);
            })
            .on('pointerout', () => {
                if(palisade.data.values.active === true){
                    palisade.clearTint();
                }
            })
            .on('pointerdown', () => {
                if(palisade.data.values.active == true){
                    palisade.destroy();
                }
            })



        t.data.values.points -= 20;

    }
}


export function CO2palisade(object1, object2)
{
    if(object1.data.get('active') == true){
        object2.x = -10
        object2.y = -10
        object2.setActive(false);
        object2.setVisible(false);
        //this.sound.play('photosynthesis')
        this.data.values.carbonGain += 1;
        this.data.values.points += this.carbonPoints;
        this.palisadeTweens.forEach(child => {
            if(object1 === child.targets[0]) {
                object1.setTint(0xfff000);
                child.play();
            };
        });
        this.spongeTweens.forEach(child => {
            if(object1 === child.targets[0]) {
                object1.setTint(0xfff000);
                child.play();
            };
        });

    }
};
