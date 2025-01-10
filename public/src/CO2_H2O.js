import {calculateWaterLevel} from "./../scenes/MainScene.js"

let bounce = 0.99;

export function initialiseMolecules(t)
{
    t.CO2group = t.physics.add.group();
    for (let step = 0; step < 10; step++){
        createCO2atom(t);
    }

    t.H2OtimedEvents = [];
    t.H2Ogroup = t.physics.add.group();
    for (let step = 0; step < 50; step++){
        createH2Oatom(t);
    }

}

export function moleculeTimedEvents(t)
{
    t.timedEvent = t.time.addEvent({
        delay:50 * t.gameSpeed,
        callback: newCO2event,
        callbackScope: t,
        loop: true
    });

    // t.timedEvent2 = t.time.addEvent({
    //     delay:1000 * t.gameSpeed,
    //     callback: newH2Oevent,
    //     callbackScope: t,
    //     loop: true
    // })
}
    

///instead of constantly creating atoms I want to have a constant pool of ~500 that can activated and inactivated
function createCO2atom(t)
{
    //creating the atom
    let atom = t.CO2group.create(-100, -100,'co2')
        .setScale(0.15);
    atom.setActive(false);
    atom.setVisible(false);


    //adding interactions
    t.epidermis.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    });

    t.CO2group.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    })

    t.leafborders.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    });

    atom.body.onWorldBounds = true;

}

function createH2Oatom(t)
{
    //creating the atom
    let atom = t.H2Ogroup.create(-100, -100,'h2o')
        .setScale(0.15)
    
    atom.setActive(false);
    atom.setVisible(false);


    //Adding interactions
    t.epidermis.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    });

    t.leafborders.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    });

    t.H2Ogroup.getChildren().forEach(child => {
        t.physics.add.collider(child, atom);
    })

    atom.body.onWorldBounds = true;

    //Adding lifespan for H2O atom

    atom.lifeSpan = t.time.addEvent({
        args: atom,
        delay: Phaser.Math.Between(5000,15000),
        paused: true,
        callback: () => {
            console.log("GONE");
            atom.setDepth(-3);
            atom.setActive(false);
            atom.lifeSpan.paused = true;
            calculateWaterLevel(t);
        }
    , callbackScope: t, repeat: -1});

}


// The events which activate CO2 and H2O molecules
function newCO2event()
{
    let inactiveCO2 = []
    this.CO2group.getChildren().forEach(child => {
        if(child.active == false){
            inactiveCO2.push(child);
        }
    })
    
    if(inactiveCO2.length >= 2){
        inactiveCO2[0].setVisible(true);
        inactiveCO2[0].setActive(true);
        inactiveCO2[0].x = Math.random() * this.worldWidth;
        inactiveCO2[0].y = 10;
        inactiveCO2[0]
            .setVelocityY(100 * this.atomSpeed)
            .setVelocityX((Math.random() * (100 * this.atomSpeed)) - ((100 * this.atomSpeed)/2))
            .setBounce(bounce)
            .setCollideWorldBounds(true);
    
        inactiveCO2[1].setVisible(true);
        inactiveCO2[1].setActive(true);
    
        inactiveCO2[1].x = Math.random() * this.worldWidth;
        inactiveCO2[1].y = this.worldHeight - 10;
        inactiveCO2[1]
            .setVelocityY(-(100* this.atomSpeed))
            .setVelocityX((Math.random() * (100 * this.atomSpeed)) - ((100 * this.atomSpeed)/2))
            .setBounce(bounce)
            .setCollideWorldBounds(true);
    }
    
}

function newH2Oevent()
{
    let inactiveH2O = []
    this.H2Ogroup.getChildren().forEach(child => {
        if(child.active == false){
            inactiveH2O.push(child);
        }
    })

    if(inactiveH2O.length >= 2){
        inactiveH2O[0].setVisible(true);
        inactiveH2O[0].setActive(true);
        inactiveH2O[0].x = 10;
        inactiveH2O[0].y = (Math.random() * (this.thickness-50)) + this.epidermisY1 + (25);
        inactiveH2O[0]
            .setVelocityY(50 * this.atomSpeed)
            .setVelocityX((Math.random() * (150 * this.atomSpeed)) - ((150 * this.atomSpeed)/2))
            .setBounce(bounce)
            .setCollideWorldBounds(true);
        
        inactiveH2O[1].setVisible(true);
        inactiveH2O[1].setActive(true);
        inactiveH2O[1].x = this.worldWidth - 10;
        inactiveH2O[1].y = (Math.random() * (this.thickness-50)) + this.epidermisY1 + (25);
        inactiveH2O[1]
            .setVelocityY(50 * this.atomSpeed)
            .setVelocityX((Math.random() * (150 * this.atomSpeed)) - ((150 * this.atomSpeed)/2))
            .setBounce(bounce)
            .setCollideWorldBounds(true);
    }

}




