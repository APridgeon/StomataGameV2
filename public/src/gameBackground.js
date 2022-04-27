export function setGameBackground(t, waterLevel)
{

    if(waterLevel < 5){
        t.gameBackground.setFillStyle(0x9b2226, 0.2);
    }
    if(waterLevel >= 10 && waterLevel < 15){
        t.gameBackground.setFillStyle(0xbb3e03, 0.2);
    }
    if(waterLevel >= 15 && waterLevel < 20){
        t.gameBackground.setFillStyle(0xee9b00, 0.2);
        t.data.values.gameBegun = true;
    }
    if(waterLevel >= 20 && waterLevel < 25){
        t.gameBackground.setFillStyle(0x89d8a6, 0.2);
    }
    if(waterLevel >= 25 && waterLevel < 30){
        t.gameBackground.setFillStyle(0x94d2bd, 0.2);
    }
    if(waterLevel >= 30 && waterLevel < 35){
        t.gameBackground.setFillStyle(0x0a9396, 0.2);
    }
}