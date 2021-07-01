import { CO2palisade } from "./palisade.js";

export function intialiseSponges(t)
{
    t.sponges = t.physics.add.group();
    t.spongeTweens = [];
    t.spongeDelays = [];
}

export function makeSponge(X, Y, t)
{
    if(t.data.values.points >= 5){
        let sponge = t.sponges.create(X,Y,'sponge')
            .setScale((t.isMobile) ? 0.6 : 0.75)
            .setImmovable(true)
            .setBodySize(62,60, true);
        
        sponge.setDataEnabled();
        sponge.data.set('active',true);

        t.H2Ogroup.getChildren().forEach(child => {
            t.physics.add.collider(child, sponge);
        })
        
        t.CO2group.getChildren().forEach(child => {
            t.physics.add.collider(sponge, child, CO2palisade, null, t);
        })

        //this adds the palisade animation + delay
        let spongeDelay = t.time.addEvent({delay: 100000, 
            callback: function() {
                sponge.clearTint();
                sponge.data.set('active', true);
                spongeDelay.paused = true;
            }, callbackScope: t, repeat: -1})

        t.spongeDelays.push(spongeDelay);
                
        t.spongeTweens.push( t.add.tween({
            targets: sponge,
            scaleX: (t.isMobile) ? 0.7 : 0.85,
            scaleY: (t.isMobile) ? 0.7 : 0.85,
            ease: 'Power2',
            duration: 500,
            repeat: 0,
            yoyo: true,
            onComplete: () => {
                sponge.clearTint();
                sponge.setTint(0xf00000);
                sponge.data.set('active', 'false');
                spongeDelay.paused = false;
            }
        }));

        //deleting cells
        sponge.setInteractive()
            .on('pointerover', () => {
                sponge.setTint(0xf00000);
            })
            .on('pointerout', () => {
                if(sponge.data.values.active === true){
                    sponge.clearTint();
                }
            })
            .on('pointerdown', () => {
                if(sponge.data.values.active == true){
                    sponge.destroy();
                }
            })



        t.data.values.points -= 5;
    };
};