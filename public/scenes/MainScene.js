import { initialiseEpidermis } from "../src/epidermis.js";
import { initialiseMolecules, moleculeTimedEvents } from "../src/CO2_H2O.js";
import { initialiseStomata, makeStomata, stomatalMovement } from "../src/Cells/stomata.js";
import { initialiseVeins, makeVein} from "../src/Cells/vein.js";
import { cellButtonFunctions } from "../src/cellButtons.js";
import { initialisePalisades, makePalisade } from "../src/Cells/palisade.js";
import { intialiseSponges } from "../src/Cells/sponges.js";
import {eventsCenter} from "../src/eventsCenter.js";
import { generateBackground } from "../src/commonComponents.js";

export default class MainScene extends Phaser.Scene {
    constructor () {
        super('Main')
    }

    preload (){
        this.load.image('epidermis','./assets/epidermis.png');
        this.load.image('co2','./assets/co2.png');
        this.load.image('h2o','./assets/h2o.png');
        this.load.image('guardcell','./assets/guardcell.png');
        this.load.image('pore','./assets/pore.png');
        this.load.image('palisade','./assets/palisade.png');
        this.load.image('sponge','./assets/sponge.png');
        this.load.image('screen','./assets/screen.png');
        this.load.image('star', './assets/star.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.bitmapFont('casual', './fonts/Unnamed.png', './fonts/Unnamed.xml');
    }

    create (){
        
        //game settings
        this.gameSpeed = 1;
        this.atomSpeed = 0.8;
        this.stomataSpeed = 1;

        this.gameWidth = 650;
        this.gameHeight = 350;
        this.worldWidth = 700;
        this.worldHeight = 500;

        this.fontSize = 7.2 * 1.5;

        this.epidermisY1 = 120;
        this.epidermisY2 = 320;
        this.thickness = this.epidermisY2 - this.epidermisY1;
        this.carbonPoints = 2;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.movement = "none";

        //UI
        this.scene.run('UI');

        //camera
        const cam = this.cameras.main
            .setBounds(0, 0, this.worldWidth, this.worldHeight)
            .setZoom(1)
            .centerOn(this.worldWidth/2, this.worldHeight/2);

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });


        //Setting up world
        this.physics.world.setBounds(-5,-5, this.worldWidth + 5, this.worldHeight + 5);
        this.physics.world.on('worldbounds', (item1) => destroyOutOfBounds(item1, this));

        //Game background
        generateBackground(this, 0x262156, 0x87d1c7, this.worldWidth, this.worldHeight, 3000);

        //Leaf background
        this.add.rectangle(0, this.epidermisY1 + 5, this.worldWidth, this.thickness, 0xa0b335, 0.6)
            .setOrigin(0,0)
            .setDepth(-1);

        initialiseEpidermis(this);

        //Make the CO2 and H2O molecules

        initialiseMolecules(this);
        moleculeTimedEvents(this);

        this.time.addEvent({
            delay:1000,
            callback: calculateWaterLevel,
            args: [this],
            callbackScope: this,
            loop: true
        })

        //Make the guard cells and palisade cells

        this.data.set('aperture', 15);

        initialiseVeins(this);
        initialiseStomata(this);
        initialisePalisades(this);
        intialiseSponges(this);

        makePalisade((this.worldWidth * 0.6), (this.worldHeight * 0.25) + 50, this);
        makeStomata((this.worldWidth * 0.3) , this.epidermisY1 + 10, this);
        makeVein(this.worldWidth * 0.5, 250, this);
        //makeVein(this.worldWidth * 0.5 + 100, 250, this);


        //Buttons at the bottom to create new cells

        cellButtonFunctions(this, this.sys.game);

        this.data.set('create', "none");
        this.data.set('cellOverlap', false);
        this.data.set('stomataOverlap', false);

        eventsCenter.on('create-pallisade', () => {
            this.data.set('create', 'pallisade');
        })

        eventsCenter.on('create-stomata', () => {
            this.data.set('create', 'stomata');
        })

        eventsCenter.on('create-sponge', () => {
            this.data.set('create', 'sponge');
        })

        this.events.on('changedata-create', () => {
            if(this.data.values.create !== "none"){
                this.stomataBoundingBoxes.children.each(child => {
                    child.setFillStyle(0xff0000, 0.3)
                })
                if(this.data.values.create === "stomata"){
                    this.spongeStomataBoundingBoxes.children.each(child => {
                        child.setFillStyle(0xff0000, 0.3)
                    })
                    this.palisadeBoundingBoxes.children.each(child => {
                        child.setFillStyle(0xff0000, 0.3);
                    })
                }
            } else {
                this.stomataBoundingBoxes.children.each(child => {
                    child.setFillStyle(0xff0000, 0)
                })
                this.spongeStomataBoundingBoxes.children.each(child => {
                    child.setFillStyle(0xff0000, 0)
                })
                this.palisadeBoundingBoxes.children.each(child => {
                    child.setFillStyle(0xff0000, 0);
                })
            }
        })

        //stomatal movements
        eventsCenter.on('stomatal-movement', (value) => {
            this.movement = value;
        })


        //end scene on game over
        eventsCenter.on('endScene', () => {
            this.scene.stop();
        })
            
    }

    update(time, delta){   

        //Moving the stomatal pore
        stomatalMovement(this);

    }

}

function destroyOutOfBounds(item1, t)
{
    
    if(item1.gameObject.texture.key === "h2o"){
        if(item1.gameObject.visible && (item1.gameObject.y > t.epidermisY2 + 20 || item1.gameObject.y < t.epidermisY1 - 20) && (item1.gameObject.x > 2 || item1.gameObject.x < t.worldWidth) - 2){
            eventsCenter.emit('increment-waterLost', 1);
        }
    }

    item1.gameObject.setActive(false);
    item1.gameObject.setVisible(false);
}


export function calculateWaterLevel(scene) 
{
    let withinLeaf = [];

    scene.H2Ogroup.getChildren().forEach(child => {
        if( child.y < scene.epidermisY2 && child.y > scene.epidermisY1 && child.active){
            withinLeaf.push(child);
        };
    });

    eventsCenter.emit('calculate-waterLevel', withinLeaf.length);
    //setBackground(this, withinLeaf.length);
};



