import { makePalisade } from "./Cells/palisade.js";
import { makeStomata } from "./Cells/stomata.js";
import { makeSponge } from "./Cells/sponges.js";

import {eventsCenter} from "./eventsCenter.js";


export function cellButtonFunctions(t, game)
{
    //generate new palisade
    t.input.on('pointerup', () => {

        if(t.data.get('create') == 'pallisade' && !t.data.values.cellOverlap && (game.input.activePointer.worldY > (t.epidermisY1 + 40) && game.input.activePointer.worldY < (t.epidermisY2 - 20))){
            makePalisade(game.input.activePointer.worldX, game.input.activePointer.worldY, t);
            t.data.set('create', "none");
            eventsCenter.emit('palisade-finish', true);
        }
    
        if(t.data.get('create') == 'stomata' && !t.data.values.cellOverlap && !t.data.values.stomataOverlap && (game.input.activePointer.worldY < t.epidermisY2 + 10 && game.input.activePointer.worldY > t.epidermisY1 - 10)){
            var yCo = (game.input.activePointer.worldY > (t.epidermisY2 - t.thickness/2)) ? t.epidermisY2 + 5 : t.epidermisY1 + (10);
            makeStomata(game.input.activePointer.worldX, yCo, t);
            t.data.set('create', "none");
            eventsCenter.emit('stomata-finish', true);
        }

        if(t.data.get('create') == 'sponge' && !t.data.values.cellOverlap && (game.input.activePointer.worldY > (t.epidermisY1 + 20) && game.input.activePointer.worldY < (t.epidermisY2-10))){
            makeSponge(game.input.activePointer.worldX, game.input.activePointer.worldY, t);
            t.data.set('create', "none");
            eventsCenter.emit('sponge-finish', true);
        };

        
    })


}








