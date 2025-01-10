//Generating rotating shaded background
function generateBackground (scene, colour1, colour2, width, height) {
    scene.background = scene.add.graphics({x: width/2, y: height/2})
        .fillGradientStyle(colour1, colour1, colour2, colour2, 0.7)
        .fillRect(-(width*1.5)/2, -(width*1.5)/2, width*1.5, width*1.5)
        .setDepth(-2);

    scene.backgroundTween = scene.tweens.add({
        targets: scene.background,
        angle:360,
        ease:'linear',
        loop:-1,
        duration: 3000
    });
};


//speaker button that controls game audio
function generateSpeakerButton(scene) {

    scene.speaker = scene.add.image( 625, 25, 'speaker')
        .setScale(0.75)
        .setInteractive();

    if(!scene.sys.game.soundPlay){
        scene.speaker.setTint(0xf00000);
    }

    scene.speaker
        .on('pointerdown', () => {
            if(scene.sys.game.soundPlay == false){
                scene.sys.game.soundTest.resume();
                scene.sys.game.soundPlay = true;
                scene.speaker.clearTint();
            } else if(scene.sys.game.soundPlay == true){
                scene.sys.game.soundTest.pause();
                scene.sys.game.soundPlay = false;
                scene.speaker.setTint(0xf00000);
            }
        })
        .on("pointerover", () => {
            scene.speaker.setTint(0xf00000);
        })
        .on("pointerout", () => {
            if(scene.sys.game.soundPlay){
                scene.speaker.clearTint();
            }
        })
};

//
function generateFullScreenButton(scene) {
    scene.fullscreen = scene.add.image(575, 25, 'screen')
        .setScale(0.75)
        .setInteractive()
        .on("pointerup", () => {
            if(scene.scale.isFullscreen){
                scene.scale.stopFullscreen();
            } else{
                scene.scale.startFullscreen();
            }
        })
        .on("pointerover", () => {
            scene.fullscreen.setTint(0xf00000);
        })
        .on("pointerout", () => {
            scene.fullscreen.clearTint();
        })
}








export {generateBackground, generateSpeakerButton, generateFullScreenButton}
