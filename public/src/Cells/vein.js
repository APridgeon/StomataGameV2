import eventsCenter from "./../eventsCenter.js";

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


    scene.time.addEvent({
        delay: 5000 * scene.gameSpeed,
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
            inactiveH2O[0].setVisible(true);
            inactiveH2O[0].setActive(true);
            inactiveH2O[0].x = X;
            inactiveH2O[0].y = Y;
            inactiveH2O[0]
                .setVelocityY(50 * this.atomSpeed)
                .setVelocityX((Math.random() * (150 * scene.atomSpeed)) - ((150 * scene.atomSpeed)/2))
                .setBounce(1)
                .setCollideWorldBounds(true);
            
            inactiveH2O[1].setVisible(true);
            inactiveH2O[1].setActive(true);
            inactiveH2O[1].x = X;
            inactiveH2O[1].y = Y;
            inactiveH2O[1]
                .setVelocityY(50 * scene.atomSpeed)
                .setVelocityX((Math.random() * (150 * scene.atomSpeed)) - ((150 * scene.atomSpeed)/2))
                .setBounce(1)
                .setCollideWorldBounds(true);
        }
    }

    

};

