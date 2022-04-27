import { CO2palisade } from "./palisade.js";

export function intialiseSponges(t)
{
    t.sponges = t.physics.add.group();
    t.spongeTweens = [];
    t.spongeDelays = [];
}

export function makeSponge(X, Y, t)
{
    let sponge = t.sponges.create(X,Y,'sponge')
        .setScale( 0.6)
        .setImmovable(true)
        .setBodySize(62,60, true)
        .setInteractive()
        .on('pointerover', () => {
            sponge.setTint(0xf00000);
            t.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            if(sponge.data.values.active === true){
                sponge.clearTint();
            }
            t.data.set('cellOverlap', false);
        })
        .on('pointerdown', () => {
            if(sponge.data.values.active == true && t.data.values.create === "none"){
                sponge.destroy();
                boundingBox.destroy();
            }
        });

    //boundingBox
    let boundingBox = t.add.zone(X,Y, 200, 200)
        .setDepth(-2)
        .setVisible(true)
        .setScale(0.6)
        .setInteractive()
        .on('pointerover', () => {
            t.data.set('stomataOverlap', true);
        })
        .on('pointerout', () => {
            t.data.set('stomataOverlap', false);
        });
    t.physics.world.enable(boundingBox);
    
    sponge.setDataEnabled();
    sponge.data.set('active',true);

    t.H2Ogroup.getChildren().forEach(child => {
        t.physics.add.collider(child, sponge);
    })
    
    t.CO2group.getChildren().forEach(child => {
        t.physics.add.collider(sponge, child, CO2palisade, null, t);
    })

    //this adds the palisade animation + delay
    let spongeDelay = t.time.addEvent({delay: 10000, 
        callback: function() {
            sponge.clearTint();
            sponge.data.set('active', true);
            spongeDelay.paused = true;
        }, callbackScope: t, repeat: -1})

    t.spongeDelays.push(spongeDelay);
            
    t.spongeTweens.push( t.add.tween({
        targets: sponge,
        scaleX: 0.7,
        scaleY: 0.7,
        ease: 'Power2',
        duration: 500,
        repeat: 0,
        yoyo: true,
        onComplete: () => {
            sponge.clearTint();
            sponge.setTint(0xf00000);
            sponge.data.set('active', false);
            spongeDelay.paused = false;
        }
    }));

};