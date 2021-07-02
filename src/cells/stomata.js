

export function initialiseStomata(t)
{
    t.stomataPores = t.physics.add.group();
    t.guardCellsL = t.physics.add.group();
    t.guardCellsR = t.physics.add.group();

}

export function makeStomata(X, Y, t)
{
    let scale =  (t.isMobile) ? 0.6 : 0.75;

    if(t.data.values.points >= 10){

        let stomaPore = t.stomataPores.create(X, Y,'pore')
            .setScale(scale)
            .setBodySize((2* t.data.get('aperture')),50,true);
        let guardCellL = t.guardCellsL.create(X - ((t.data.get('aperture') + 10) * scale), Y, 'guardcell')
            .setScale(scale)
            .setBodySize(15,50,true)
            .setImmovable(true)
            .setDepth(10);
        let guardCellR = t.guardCellsR.create(X + ((t.data.get('aperture') + 10) * scale), Y, 'guardcell')
            .toggleFlipY()
            .setScale(scale)
            .setBodySize(15,50,true)
            .setImmovable(true)
            .setDepth(10);
    
        let newStomata = t.stomataPores.getChildren().length - 1;
        t.H2Ogroup.getChildren().forEach(child => {
            t.physics.add.collider(child, t.guardCellsL.getChildren()[newStomata]);
            t.physics.add.collider(child, t.guardCellsR.getChildren()[newStomata]);
            t.physics.add.overlap(child, t.stomataPores.getChildren()[newStomata], stomaOverlap, null, t);
        })
        t.CO2group.getChildren().forEach(child => {
            t.physics.add.collider(child, t.guardCellsL.getChildren()[newStomata]);
            t.physics.add.collider(child, t.guardCellsR.getChildren()[newStomata]);
            t.physics.add.overlap(child, t.stomataPores.getChildren()[newStomata], stomaOverlap, null, t);
        })

        //deleting cells
        deleteCells(stomaPore, guardCellL, guardCellR, t);


        t.data.values.points -= 10;
    }
}



export function stomatalMovement(t)
{
    let scale = (t.isMobile) ? 0.6 : 0.75;

    if(t.stomataPores.children.entries.length >0){
        if((t.cursors.up.isDown == true || t.movement == "up") && t.stomataPores.children.entries[0].body.width < (70 * scale) ){
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
        
        if((t.cursors.down.isDown == true || t.movement == "down") && t.stomataPores.children.entries[0].body.width >  (10 * scale)){
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

function deleteCells(object,L,R,  t)
{
    object.setInteractive()
        .on('pointerover', () => {
            object.setTint(0xf00000);
            L.setTint(0xf00000);
            R.setTint(0xf00000);
        })
        .on('pointerout', () => {
            object.clearTint();
            L.clearTint();
            R.clearTint();
        })
        .on('pointerdown', () => {
            object.destroy();
            L.destroy();
            R.destroy();
        })
}
