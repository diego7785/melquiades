var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [ StartScene, IntroScene, GameScene ],
  physics:
    {
      default: 'arcade'
    },
  audio: {
      disableWebAudio: true
  }
};

var game = new Phaser.Game(config);