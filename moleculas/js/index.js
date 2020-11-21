var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [ StartScene, TutoScene, GameScene ],
    physics: {
        default: 'arcade',
    },
    audio: {
        disableWebAudio: true
    },
    /*scale: {
        orientation: 'LANDSCAPE'
    }*/
};

var game = new Phaser.Game(config);

