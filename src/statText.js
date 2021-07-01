import {  setGameBackground } from "./gameBackground.js";

export function initialiseStatsText(t)
{
    t.waterLevelText = t.add.text((t.isMobile) ? 5 : 16, (t.isMobile) ? 5 : 20, 'Current water level: 0', { fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'});
    t.waterText = t.add.text((t.isMobile) ? 5 : 15, (t.isMobile) ? 22 : 40, 'Total water lost: 0', { fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'});
    t.carbonText = t.add.text((t.isMobile) ? 5 : 16, (t.isMobile) ? 39 : 60, 'Total carbon gain: 0', { fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'});
    t.pointsText = t.add.text((t.isMobile) ? 530: 480, (t.gameHeight - 200) * 0.05, 'Points: 20', { fontSize: t.fontSize, fill: '#000' , fontFamily: '"font1"'});
}

export function statsTextEvents(t)
{
    t.events.on('changedata-waterLost', () => {
        t.waterText.setText('Total water lost: ' + t.data.get('waterLost'));
    })

    t.events.on('changedata-carbonGain', () => {
        t.carbonText.setText('Total carbon gain: ' + t.data.get('carbonGain'));
    })

    t.events.on('changedata-waterLevel', () => {
        t.waterLevelText.setText('Current water level: ' + t.data.get('waterLevel'));
        setGameBackground(t);
    })

    t.events.on('changedata-points', () => {
        t.pointsText.setText('Points: ' + t.data.get('points'));
    })
}

