import {eventsCenter} from "./../eventsCenter.js";

export function initialiseVeins(scene)
{
    scene.veins = scene.physics.add.group();
};

export function makeVein(X, Y, scene)
{
    let vein = scene.veins.create(X,Y, 'vein')
        .setOrigin(0.5, 0.5)
        .setScale(0.8)
        .setImmovable(true)
        .setDepth(-1)


    vein.H2OSpawn = scene.time.addEvent({
        delay: 1000 * scene.gameSpeed,
        callback: newVeinH2OEvent,
        callbackScope: scene,
        loop: true
    })

    function newVeinH2OEvent(){
        let inactiveH2O = []
        scene.H2Ogroup.getChildren().forEach(child => {
            if(child.active == false){
                inactiveH2O.push(child);
            }
        })

        if(inactiveH2O.length >= 2){

            let angle = Phaser.Math.Between(0, 360);
            let velocities = scene.physics.velocityFromAngle(angle, 75*scene.atomSpeed)

            inactiveH2O[0]
                .setVisible(true)
                .setActive(true)
                .setAlpha(1)
                .setVelocity(velocities.x, velocities.y)
                .setCollideWorldBounds(true)
                .setBounce(1);
            inactiveH2O[0].lifeSpan.paused = false;
            inactiveH2O[0].x = X;
            inactiveH2O[0].y = Y;


            angle = Phaser.Math.Between(-180, 180);
            velocities = scene.physics.velocityFromAngle(angle, 75*scene.atomSpeed)
            // console.log(angle, Math.atan2(velocities.y, velocities.x) * (180/Math.PI));

            

            inactiveH2O[1]
                .setVisible(true)
                .setActive(true)
                .setAlpha(1)
                .setVelocity(velocities.x, velocities.y)
                .setCollideWorldBounds(true)
                .setBounce(1);
            inactiveH2O[1].lifeSpan.paused = false;
            inactiveH2O[1].x = X;
            inactiveH2O[1].y = Y;

        }
    }

    

};

