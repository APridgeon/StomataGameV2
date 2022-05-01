import eventsCenter from "../eventsCenter.js";


export function initialiseStomata(scene)
{
    scene.stomataPores = scene.physics.add.group();
    scene.guardCellsL = scene.physics.add.group();
    scene.guardCellsR = scene.physics.add.group();
    scene.stomataBoundingBoxes = scene.physics.add.group();

}

export function makeStomata(X, Y, scene)
{
    let scale = 0.6;

    let stomaPore = scene.stomataPores.create(X, Y,'pore')
        .setScale(scale)
        .setBodySize((2* scene.data.get('aperture')),50,true)
        .setInteractive();
    let guardCellL = scene.guardCellsL.create(X - ((scene.data.get('aperture') + 10) * scale), Y, 'guardcell')
        .setScale(scale)
        .setBodySize(15,50,true)
        .setImmovable(true)
        .setInteractive()
        .on('pointerover', () => {
            scene.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            scene.data.set('cellOverlap', false);
        });;
    let guardCellR = scene.guardCellsR.create(X + ((scene.data.get('aperture') + 10) * scale), Y, 'guardcell')
        .toggleFlipY()
        .setScale(scale)
        .setBodySize(15,50,true)
        .setImmovable(true)
        .setInteractive()
        .on('pointerover', () => {
            scene.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            scene.data.set('cellOverlap', false);
        });;


    //boundingBox
    let boundingBox = scene.add.circle(X,Y, 100)
        .setDepth(-1)
        .setVisible(true)
        .setScale(scale)
    scene.physics.world.enable(boundingBox);
    boundingBox.body
        .setCircle(100)
    boundingBox
        .setInteractive(new Phaser.Geom.Circle(100, 100, 100), Phaser.Geom.Circle.Contains)
        .on('pointerover', () => {
            scene.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            scene.data.set('cellOverlap', false);
        });
    scene.stomataBoundingBoxes.add(boundingBox);


    let newStomata = scene.stomataPores.getChildren().length - 1;
    scene.H2Ogroup.getChildren().forEach(child => {
        scene.physics.add.collider(child, scene.guardCellsL.getChildren()[newStomata]);
        scene.physics.add.collider(child, scene.guardCellsR.getChildren()[newStomata]);
        scene.physics.add.overlap(child, scene.stomataPores.getChildren()[newStomata], stomaOverlap, null, scene);
        scene.physics.add.overlap(child, scene.stomataBoundingBoxes.getChildren()[newStomata], attractH2O, null, scene);
    })
    scene.CO2group.getChildren().forEach(child => {
        scene.physics.add.collider(child, scene.guardCellsL.getChildren()[newStomata]);
        scene.physics.add.collider(child, scene.guardCellsR.getChildren()[newStomata]);
        scene.physics.add.overlap(child, scene.stomataPores.getChildren()[newStomata], stomaOverlap, null, scene);
        scene.physics.add.overlap(child, scene.stomataBoundingBoxes.getChildren()[newStomata], attractCO2, null, scene);
    })

    //deleting cells
    deleteCells(stomaPore, guardCellL, guardCellR, boundingBox, scene);
}



export function stomatalMovement(t)
{
    let scale = 0.6;

    if(t.stomataPores.children.entries.length >0){
        if((t.cursors.up.isDown == true || t.movement == "open") && t.stomataPores.children.entries[0].body.width < (70 * scale) ){
            let aperture = t.data.get('aperture');
            t.guardCellsL.getChildren().forEach(child => {
                child.x -= (1 * t.stomataSpeed) * scale;
            })
            t.guardCellsR.getChildren().forEach(child => {
                child.x += (1 * t.stomataSpeed) * scale;
            })
            t.stomataPores.getChildren().forEach(child => {
                child.setBodySize((2* aperture), 50, true);
            })
            t.data.set('aperture', aperture + (1* t.stomataSpeed))
        }   
        
        if((t.cursors.down.isDown == true || t.movement == "close") && t.stomataPores.children.entries[0].body.width >  (10 * scale)){
            let aperture2 = t.data.get('aperture');
            t.guardCellsL.getChildren().forEach(child => {
                child.x += (1 * t.stomataSpeed) * scale;
            })
            t.guardCellsR.getChildren().forEach(child => {
                child.x -= (1 * t.stomataSpeed) * scale;
            })
            t.stomataPores.getChildren().forEach(child => {
                child.setBodySize((2 * aperture2), 50, true);
            })
            let aperture = t.data.get('aperture');
            t.data.set('aperture', aperture2 - (1*t.stomataSpeed))
        }
    }

}


function stomaOverlap(sprite1)
{
    if(sprite1.body.velocity.y > 0){
        sprite1.y = sprite1.y + 25;
        //this.sound.play('leaving')
    }
    if(sprite1.body.velocity.y < 0){
        sprite1.y = sprite1.y - 25;
        //this.sound.play('entering')
    }

}

function attractH2O(sprite1, sprite2){

    if(sprite1.y > this.epidermisY1 + 50 && sprite1.y < this.epidermisY2 -50){
        this.physics.accelerateToObject(sprite1, sprite2, 30, 100, 100);
    }
}
function attractCO2(sprite1, sprite2){

    if(sprite1.y < this.epidermisY1 + 50 || sprite1.y > this.epidermisY2 -50){
        this.physics.accelerateToObject(sprite1, sprite2, 60, 100, 100);
    }
}

function deleteCells(object,L,R, boundingBox, t)
{
    object
        .on('pointerover', () => {
            t.data.set('stomataOverlap', true);
            object.setTint(0xf00000);
            L.setTint(0xf00000);
            R.setTint(0xf00000);
        })
        .on('pointerout', () => {
            t.data.set('stomataOverlap', false);
            object.clearTint();
            L.clearTint();
            R.clearTint();
        })
        .on('pointerdown', () => {
            if(t.data.values.create === "none"){
                object.destroy();
                L.destroy();
                R.destroy();
                boundingBox.destroy();
            }
        })
}
