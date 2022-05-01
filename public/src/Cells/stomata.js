import eventsCenter from "../eventsCenter.js";


export function initialiseStomata(scene)
{
    scene.stomataPores = scene.physics.add.group();
    scene.guardCellsL = scene.physics.add.group();
    scene.guardCellsR = scene.physics.add.group();
    scene.stomataBoundingBoxes = scene.physics.add.group();

}

export function makeStomata(X, Y, t)
{
    let scale = 0.6;

    let stomaPore = t.stomataPores.create(X, Y,'pore')
        .setScale(scale)
        .setBodySize((2* t.data.get('aperture')),50,true)
        .setInteractive();
    let guardCellL = t.guardCellsL.create(X - ((t.data.get('aperture') + 10) * scale), Y, 'guardcell')
        .setScale(scale)
        .setBodySize(15,50,true)
        .setImmovable(true)
        .setInteractive()
        .on('pointerover', () => {
            t.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            t.data.set('cellOverlap', false);
        });;
    let guardCellR = t.guardCellsR.create(X + ((t.data.get('aperture') + 10) * scale), Y, 'guardcell')
        .toggleFlipY()
        .setScale(scale)
        .setBodySize(15,50,true)
        .setImmovable(true)
        .setInteractive()
        .on('pointerover', () => {
            t.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            t.data.set('cellOverlap', false);
        });;


    //boundingBox
    let boundingBox = t.add.circle(X,Y, 100)
        .setDepth(-1)
        .setVisible(true)
        .setScale(scale)
    console.log(boundingBox);
    t.physics.world.enable(boundingBox);
    boundingBox.body
        .setCircle(100)
    boundingBox
        .setInteractive(new Phaser.Geom.Circle(100, 100, 100), Phaser.Geom.Circle.Contains)
        .on('pointerover', () => {
            t.data.set('cellOverlap', true);
        })
        .on('pointerout', () => {
            t.data.set('cellOverlap', false);
        });
    t.stomataBoundingBoxes.add(boundingBox);


    let newStomata = t.stomataPores.getChildren().length - 1;
    t.H2Ogroup.getChildren().forEach(child => {
        t.physics.add.collider(child, t.guardCellsL.getChildren()[newStomata]);
        t.physics.add.collider(child, t.guardCellsR.getChildren()[newStomata]);
        t.physics.add.overlap(child, t.stomataPores.getChildren()[newStomata], stomaOverlap, null, t);
        t.physics.add.overlap(child, t.stomataBoundingBoxes.getChildren()[newStomata], attractH2O, null, t);
    })
    t.CO2group.getChildren().forEach(child => {
        t.physics.add.collider(child, t.guardCellsL.getChildren()[newStomata]);
        t.physics.add.collider(child, t.guardCellsR.getChildren()[newStomata]);
        t.physics.add.overlap(child, t.stomataPores.getChildren()[newStomata], stomaOverlap, null, t);
        t.physics.add.overlap(child, t.stomataBoundingBoxes.getChildren()[newStomata], attractCO2, null, t);
    })

    //deleting cells
    deleteCells(stomaPore, guardCellL, guardCellR, boundingBox, t);
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
