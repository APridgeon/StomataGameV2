export function initialiseEpidermis(t)
{
    t.epidermis = t.physics.add.staticGroup();
    t.epidermis.create(0, t.epidermisY1, 'epidermis').setOrigin(0,0);
    t.epidermis.create(0, t.epidermisY2, 'epidermis').setOrigin(0,0);
    

    //Setting correct epidermis bounding box
    t.epidermis.getChildren().forEach(child => {
        child.setScale((t.isMobile) ? 0.83 : 0.75, (t.isMobile) ? 0.35 : 0.4);
        child.setBodySize(0,(t.isMobile) ? 16 : 16.75 , true);
        child.setOffset((t.isMobile) ? 325 :300, 25);
    })
}