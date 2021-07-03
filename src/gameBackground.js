export function setGameBackground(t)
{
    if(t.data.values.waterLevel < 5){
        t.gameBackground.setFillStyle(0x9b2226, 0.2);
    }
    if(t.data.values.waterLevel >= 10 && t.data.values.waterLevel < 15){
        t.gameBackground.setFillStyle(0xbb3e03, 0.2);
    }
    if(t.data.values.waterLevel >= 15 && t.data.values.waterLevel < 20){
        t.gameBackground.setFillStyle(0xee9b00, 0.2);
        t.data.values.gameBegun = true;
    }
    if(t.data.values.waterLevel >= 20 && t.data.values.waterLevel < 25){
        t.gameBackground.setFillStyle(0x89d8a6, 0.2);
    }
    if(t.data.values.waterLevel >= 25 && t.data.values.waterLevel < 30){
        t.gameBackground.setFillStyle(0x94d2bd, 0.2);
    }
    if(t.data.values.waterLevel >= 30 && t.data.values.waterLevel < 35){
        t.gameBackground.setFillStyle(0x0a9396, 0.2);
    }
}