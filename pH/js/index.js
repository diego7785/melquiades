var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade'
    },
    scene: 
      [ StartScene, IntroScene, GameScene ],
    /*callbacks: {
      postBoot: function (game) {
        // In v3.15, you have to override Phaser's default styles
        game.canvas.style.width = '100%';
        game.canvas.style.height = '100%';
      }
    }*/
  };
  
  var game = new Phaser.Game(config);