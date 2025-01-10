import {eventsCenter} from "./../eventsCenter.js";

export function initialisePalisades(scene)
{
    scene.palisades = scene.physics.add.group();
    scene.palisadeBoundingBoxes = scene.physics.add.group();
}

export function makePalisade(X, Y, t)
{

    let palisade = t.palisades.create(X,Y,'palisade')
        .setScale(0.6)
        .setImmovable(true)
        .setBodySize(50,90, true)
        .setDepth(5)
        .setInteractive()
        .on('pointerover', () => {
            palisade.setTint(0xf00000);
            t.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            if(palisade.data.values.active){
                palisade.clearTint();
            }
            t.data.set('cellOverlap', false);
        })
        .on('pointerdown', () => {
            if(palisade.data.values.active && t.data.values.create === "none"){
                palisade.destroy();
                boundingBox.destroy();
            }
        });

    //boundingBox
    let boundingBox = t.add.circle(X, Y, 100)
        .setDepth(-1)
        .setVisible(true)
        .setScale(0.6);

    t.physics.world.enable(boundingBox);
    boundingBox.body
        .setCircle(100)
        .debugBodyColor = 0xff0000;
    boundingBox
        .setInteractive(new Phaser.Geom.Circle(100, 100, 100), Phaser.Geom.Circle.Contains)
        .on('pointerover', () => {
            t.data.set('stomataOverlap', true);
        })
        .on('pointerout', () => {
            t.data.set('stomataOverlap', false);
        });
    t.palisadeBoundingBoxes.add(boundingBox);

    palisade.setDataEnabled();
    palisade.data.set('active',false);

    t.H2Ogroup.getChildren().forEach(child => {
        t.physics.add.collider(child, palisade);
    })
    
    t.CO2group.getChildren().forEach(child => {
        t.physics.add.collider(palisade, child, CO2palisade, null, t);
    })

    //this adds the palisade animation + delay
    palisade.Delay = t.time.addEvent({delay: 5000, 
        callback: function() {
            palisade.clearTint();
            palisade.data.set('active', true);
            palisade.Delay.paused = true;
        }, callbackScope: t, repeat: -1})

            
    palisade.Tweens = t.add.tween({
        targets: palisade,
        scaleX: 0.7,
        scaleY: 0.7,
        ease: 'Power2',
        duration: 500,
        repeat: 0,
        yoyo: true,
        onComplete: () => {
            palisade.clearTint();
            palisade.setTint(0xf00000);
            palisade.data.set('active', false);
            palisade.Delay.paused = false;
        }
    });


}


export function CO2palisade(object1, object2)
{
    if(object1.data.get('active')){
        object2.x = -10
        object2.y = -10
        object2.setActive(false);
        object2.setVisible(false);
        eventsCenter.emit('increment-carbonGain',1);
        eventsCenter.emit('increment-points', this.carbonPoints);
        object1.Tweens.play();

    }
};
