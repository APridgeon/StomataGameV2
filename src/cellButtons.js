import { makePalisade } from "./Cells/palisade.js";
import { makeStomata } from "./Cells/stomata.js";
import { makeSponge } from "./Cells/sponges.js";

export function initialiseCellButtons(t)
{
    //Buttons at the bottom to create new cells

    t.data.set('create', "none");
    t.instructText.text = 'Click to\nselect a cell';

    ///Palisades
    t.palisadeButton = t.add.image((t.isMobile) ? 150 : 150, (t.isMobile) ? 320 : 500, 'palisade');
    t.palisadeButtonPrice = t.add.image((t.isMobile) ? 150 : 150,(t.isMobile) ? 260 : 500, 'star').setOrigin(0,0)
        .setScale((t.isMobile) ? 1.2 : 1.9)
        .setVisible(false);
    t.palisadeButtonText = t.add.text((t.isMobile) ? 170 : 190,(t.isMobile) ? 280 : 535, '20',{ fontSize: t.fontSize, fill: '#fff' , fontFamily: '"font1"'})
        .setVisible(false)
        .setOrigin(0,0);
    
    t.palisadeButton
        .setScale((t.isMobile) ? 0.6 : 0.75)
        .setInteractive()
        .on('pointerdown', () => {
            if(t.data.values.points >= 20){
                t.data.set('create', 'pallisade');
                t.palisadeButton.setTint(0xf00000);
                t.instructText.text = "Click to place\nthe cell"
            }
        })
        .on('pointerover', () => {
            t.palisadeButtonPrice.setVisible(true);
            t.palisadeButtonText.setVisible(true);
        })
        .on('pointerout', () => {
            t.palisadeButtonPrice.setVisible(false);
            t.palisadeButtonText.setVisible(false);
        })

    //Stomata
    t.stomataButton = t.add.group();
    t.stomataButton.create((t.isMobile) ? 250 : 300, (t.isMobile) ? 320 : 500, 'pore').setScale((t.isMobile) ? 0.6 : 0.75)
    t.stomataButton.create((t.isMobile) ? 230 : 280, (t.isMobile) ? 320 : 500, 'guardcell').setScale((t.isMobile) ? 0.6 : 0.75);
    t.stomataButton.create((t.isMobile) ? 270 : 320, (t.isMobile) ? 320 : 500, 'guardcell').setScale((t.isMobile) ? 0.6 : 0.75).toggleFlipY();
    t.stomataButtonPrice = t.add.image((t.isMobile) ? 250 : 300, (t.isMobile) ? 260 : 500, 'star').setOrigin(0,0)
        .setScale((t.isMobile) ? 1.2 : 1.9)
        .setVisible(false);
    t.stomataButtonText = t.add.text((t.isMobile) ? 270 : 335, (t.isMobile) ? 280 : 535, '10',{ fontSize: t.fontSize, fill: '#fff' , fontFamily: '"font1"'})
        .setVisible(false)
        .setOrigin(0,0);

    t.stomataButton.getChildren().forEach(child => {
        child.setInteractive()
            .on('pointerdown', () => {
                if(t.data.values.points >= 10){
                    t.stomataButton.getChildren().forEach(child2 => {
                        child2.setTint(0xf00000);
                    });
                    t.data.set('create', 'stomata')
                    t.instructText.text = "Click to place\nthe cell"
                }
            })
            .on('pointerover', () => {
                t.stomataButtonPrice.setVisible(true);
                t.stomataButtonText.setVisible(true);
            })
            .on('pointerout', () => {
                t.stomataButtonPrice.setVisible(false);
                t.stomataButtonText.setVisible(false);
            })
    })

    //spongey cell
    t.spongeButton = t.add.image((t.isMobile) ? 350 : 450, (t.isMobile) ? 320 : 500, 'sponge');
    t.spongeButtonPrice = t.add.image((t.isMobile) ? 350 : 450, (t.isMobile) ? 260 : 500, 'star').setOrigin(0,0)
        .setScale((t.isMobile) ? 1.2 : 1.9)
        .setVisible(false);
    t.spongeButtonText = t.add.text((t.isMobile) ? 375 : 490, (t.isMobile) ? 280 : 535, '5',{ fontSize: t.fontSize, fill: '#fff' , fontFamily: '"font1"'})
        .setVisible(false)
        .setOrigin(0,0);

    t.spongeButton
        .setScale((t.isMobile) ? 0.6 : 0.75)
        .setInteractive()
        .on('pointerdown', () => {
            if(t.data.values.points >= 5){
                t.data.set('create', 'sponge')
                t.spongeButton.setTint(0xf00000);
                t.instructText.text = "Click to place\nthe cell"
            }
        })
        .on('pointerover', () => {
            t.spongeButtonPrice.setVisible(true);
            t.spongeButtonText.setVisible(true);
        })
        .on('pointerout', () => {
            t.spongeButtonPrice.setVisible(false);
            t.spongeButtonText.setVisible(false);
        })

    //Mobile stomatal movement arrows
    if(t.isMobile == true)
    {
        t.add.text(450, 330,'Open',{ fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'})
        t.upArrow = t.add.image(500, 320, 'arrow')
            .setInteractive()
            .on('pointerover', () => {
                t.upArrow.setTint(0xf00000);
                t.movement = "up";
            })
            .on('pointerout', () => {
                t.upArrow.clearTint();
                t.movement = "none";
            })

        t.add.text(565, 330,'Close',{ fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'})
        t.downArrow = t.add.image(550, 320, 'arrow')
            .setInteractive()
            .toggleFlipY()
            .on('pointerover', () => {
                t.downArrow.setTint(0xf00000);
                t.movement = "down";
            })
            .on('pointerout', () => {
                t.downArrow.clearTint();
                t.movement = "none";
            })
    }

}

export function cellButtonFunctions(t, game)
{
    //generate new palisade
    t.input.on('pointerdown', () => {
        if(t.data.get('create') == 'pallisade' && (game.input.activePointer.y > (t.epidermisY1 + 40) && game.input.activePointer.y < (t.epidermisY2 - 20))){
            makePalisade(game.input.activePointer.x, game.input.activePointer.y, t);
            t.data.set('create', "none");
            t.palisadeButton.clearTint();

        }
    
        if(t.data.get('create') == 'stomata' && game.input.activePointer.y < ((t.isMobile) ? 295 : 420)){
            var yCo = (game.input.activePointer.y > (t.epidermisY2 - t.thickness/2)) ? t.epidermisY2 + 5 : t.epidermisY1 + ((t.isMobile) ? 10 : 15);
            makeStomata(game.input.activePointer.x, yCo, t);
            t.data.set('create', "none");
            t.stomataButton.getChildren().forEach(child2 => {
                child2.clearTint();
            });
        }
        if(t.data.get('create') == 'sponge' && (game.input.activePointer.y > (t.epidermisY1 + 20) && game.input.activePointer.y < (t.epidermisY2-10))){
            makeSponge(game.input.activePointer.x, game.input.activePointer.y, t);
            t.data.set('create', "none");
            t.spongeButton.clearTint();
        };
    })


}








