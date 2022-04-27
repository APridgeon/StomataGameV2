export function initialiseEpidermis(t)
{
    t.epidermis = t.physics.add.staticGroup();
    t.epidermis.create(0, t.epidermisY1, 'epidermis').setOrigin(0,0);
    t.epidermis.create(0, t.epidermisY2, 'epidermis').setOrigin(0,0);
    

    //Setting correct epidermis bounding box
    t.epidermis.getChildren().forEach(child => {
        //child.setScale(0.83, 0.35);
        child.setScale(t.worldWidth/800, 0.35);
        child.setBodySize(t.worldWidth, 16, true);
        child.setOffset(400, 25);

    })
}