class StartScene extends Phaser.Scene {
  constructor() {
    super('bootGame');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  init(data) {
    this.level = data.level;
    this.audio = data.audio;

    var element = document.createElement('style');

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles = '@font-face { font-family: "Nunito"; src: url("assets/Nunito-Regular.ttf") format("opentype"); }\n';

    sheet.insertRule(styles, 0);
  }

  preload() {

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.width / 2 - 165, this.height / 2, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 70,
      text: 'Cargando...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2 - 5,
      y: height / 2 + 25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2 - 5,
      y: height / 2 + 70,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);

      progressBar.fillRect(width / 2 - 160, height / 2 + 10, 300 * value, 30);
    });


    this.load.on('fileprogress', function(file) {
      assetText.setText('Cargando elemento: ' + file.key);
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.spritesheet('carpa', './assets/img/carpa.png', {
      frameWidth: 690,
      frameHeight: 388
    });

    this.load.image('background', './assets/img/backgroundS.jpg');
    this.load.image('play', './assets/img/buttonPlay.png');
    this.load.image('startL', './assets/img/buttonPlayLetter.png');
    this.load.image('title', './assets/img/title.png');
    this.load.image('info', './assets/img/info.png');

    this.load.image('gotero', './assets/img/Gotero.png');
    this.load.image('beaker', './assets/img/beakerPrueba1.png');
    this.load.image('restart', './assets/img/restart.png');
    this.load.image('liquidoG', './assets/img/liquidoGotero.png');
    this.load.image('NaOH', './assets/img/NaOH.png');
    this.load.image('HCl', './assets/img/HCl.png');
    this.load.image('liquido', './assets/img/liquido.png');
    this.load.image('graph', './assets/img/graph.png');
    this.load.image('graph1', './assets/img/graph1.png');
    this.load.image('liquidoBeaker', './assets/img/liquidoBaker.png');
    this.load.image('resultado', './assets/img/resultado.png');
    this.load.image('vol', './assets/img/vol.png');
    this.load.image('conc', './assets/img/concentracion.png');
    this.load.image('NaOHButton', './assets/img/NaOHButton.png');
    this.load.image('H3PO4Button', './assets/img/H3PO4Button.png');
    this.load.image('selectSus', './assets/img/selectSus.png');
    this.load.image('H3PO4', './assets/img/H3PO4.png');

    this.load.image('omitir', './assets/img/omitir.png');
    this.load.image('bannerIntro', './assets/img/bannerIntro.png');
    this.load.image('bannerValorarH3PO4', './assets/img/bannerValorarH3PO4.png');
    this.load.image('bannerValorar', './assets/img/bannerValorar.png');
    this.load.image('bannerBoard', './assets/img/bannerBoard.png');
    this.load.image('next', './assets/img/next.png');
    this.load.image('end', './assets/img/end.png');
    this.load.image('bannerGotero', './assets/img/bannerGotero.png');
    this.load.image('bannerHCl', './assets/img/bannerHCl.png');
    this.load.image('bannerNaOH', './assets/img/bannerNaOH.png');
    this.load.image('bannerConcetracion', './assets/img/bannerConcentracion.png');
    this.load.image('bannerReset', './assets/img/bannerReset.png');
    this.load.image('uv', './assets/img/uv.png');
    this.load.image('cerrar', './assets/img/cerrar.png');
    this.load.image('watch', './assets/img/watchVideo.png');

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

  }

  create() {

    var rect = new Phaser.Geom.Rectangle(0, 0, 10000, 10000);
    rect.depth = 4;
    var graphicsR = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });
    graphicsR.depth = 6;
    graphicsR.fillRectShape(rect);
    this.anims.create({
      key: 'carp',
      frames: this.anims.generateFrameNumbers('carpa', {
        start: 0,
        end: 73
      }),
      frameRate: 20,
      repeat: -1
    });

    var carpa = this.add.sprite(this.width / 2, this.height / 3);
    carpa.depth = 7;
    carpa.play('carp');

    var uv = this.add.image(150, this.height - 40, 'uv').setScale(0.15);
    uv.depth = 6;

    var game = this;
    var add = this.add;
    var infoText;
    var watchVideo;
    WebFont.load({
      custom: {
        families: ['Nunito']
      },
      active: function() {
        infoText = add.text(1100, 610, "*Recomendado para estudiantes \nde 11° grado en adelante.", {
          fontFamily: 'Nunito',
          fontSize: 15,
          color: '#ffffff'
        }).setShadow(2, 2, "#000000", 2, false, true);
        infoText.setY(game.height - infoText.displayHeight - 10);
        infoText.setX(game.width - infoText.displayWidth - 10);

      }
    });

    setTimeout(() => {
      rect.visible = false;
      graphicsR.destroy();
      carpa.destroy();
      uv.visible = false;
    }, 4000);

    var cerrar = this.add.sprite(50, 50, 'cerrar').setScale(0.4).setInteractive();
    cerrar.depth = 3;
    cerrar.on('pointerdown', () => {
      window.close();
    })


    this.physics.add.sprite(this.width / 2, this.height / 2, 'background').setScale(this.width / 3334, this.height / 2501);
    var play = this.physics.add.sprite(this.width / 2, this.height / 1.3, 'play').setScale(0.7);

    this.add.image(this.width / 2, this.height / 1.3, 'startL').setScale(0.7);
    this.add.image(this.width / 2, this.height / 3, 'title');

    play.setInteractive();
    //play1.setInteractive();

    // Setting interactions
    play.on('pointerover', () => {
      play.setTint(0xCF711E)
    });
    play.on('pointerout', () => {
      play.clearTint()
    });
    play.on('pointerdown', () => {
      this.scene.start("introScene")
    });


  }
}
