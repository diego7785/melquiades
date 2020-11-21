class gameScene extends Phaser.Scene {
  constructor() {
    super("level1");
    this.animals = [];
    this.sounds = [];
    this.soundPos = 0;
    this.pressed = -1;
    this.textTimer;
    this.win = false;
    this.inicialSound;
    this.start = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animalInfo;
    this.timer;
  }

  init(data) {
    this.audio = data.audio;

    var element = document.createElement('style');

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles = '@font-face { font-family: "Nunito"; src: url("assets/Nunito-Italic.ttf") format("opentype"); }\n';

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
      assetText.setText('Cargando elementos: Audios e imágenes');
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // Loading resources
    this.load.image('background1', './assets/img/background2.jpg');

    this.load.image('Alouatta', './assets/img/0.png');
    this.load.image('Oophaga', './assets/img/1.png');
    this.load.image('Megaptera', './assets/img/2.png');
    this.load.image('Lithobates', './assets/img/3.png');
    this.load.image('Henicorhina', './assets/img/4.png');
    this.load.image('Troglodytes', './assets/img/5.png');
    this.load.image('Rattus', './assets/img/15.png');


    this.load.audio('AlouattaA', ['./assets/audios/0.ogg', './assets/audios/0.m4a', './assets/audios/0.mp3']);
    this.load.audio('OophagaA', ['./assets/audios/1.ogg', './assets/audios/1.m4a', './assets/audios/1.mp3']);
    this.load.audio('MegapteraA', ['./assets/audios/2.ogg', './assets/audios/2.m4a', './assets/audios/2.mp3']);
    this.load.audio('LithobatesA', ['./assets/audios/3.ogg', './assets/audios/3.m4a', './assets/audios/3.mp3']);
    this.load.audio('HenicorhinaA', ['./assets/audios/4.ogg', './assets/audios/4.m4a', './assets/audios/4.mp3']);
    this.load.audio('TroglodytesA', ['./assets/audios/5.ogg', './assets/audios/5.m4a', './assets/audios/5.mp3']);
    this.load.audio('RattusA', ['./assets/audios/15.ogg', './assets/audios/15.m4a', './assets/audios/15.mp3']);


    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

  }

  create() {

    if (this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55) {
      this.game.sound.setTouchLock();
      this.game.input.touch.addTouchLockCallback(function() {
        if (this.noAudio || !this.touchLocked || this._unlockSource !== null) {
          return true;
        }
        if (this.usingWebAudio) {
          // Create empty buffer and play it
          // The SoundManager.update loop captures the state of it and then resets touchLocked to false

          var buffer = this.context.createBuffer(1, 1, 22050);
          this._unlockSource = this.context.createBufferSource();
          this._unlockSource.buffer = buffer;
          this._unlockSource.connect(this.context.destination);

          if (this._unlockSource.start === undefined) {
            this._unlockSource.noteOn(0);
          } else {
            this._unlockSource.start(0);
          }

          //Hello Chrome 55!
          if (this._unlockSource.context.state === 'suspended') {
            this._unlockSource.context.resume();
          }
        }

        //  We can remove the event because we've done what we needed (started the unlock sound playing)
        return true;

      }, this.game.sound, true);
    }

    var game = this;
    var start = 0;
    var unorderedSounds;
    var initial = true;
    var time = 119;
    var interval;
    var animalNames = [{
        name: "           Alouatta seniculus\n\n\n             Nombre común:\n              Mono aullador"
      },
      {
        name: "           Rattus norvegicus\n\n\n            Nombre común:\n                Rata común"
      },
      {
        name: "          Oophaga lehmanni\n\n\n            Nombre común:\n   Rana venenosa de Lehmann"
      },
      {
        name: "      Megaptera novaeangliae\n\n\n            Nombre común:\n            Ballena jorobada"
      },
      {
        name: "       Lithobates catesbeianus\n\n\n           Nombre común:\n                Rana toro"
      },
      {
        name: "        Henicorhina leucophrys\n\n\n            Nombre común:\n       Cucarachero pechigrís"
      },
      {
        name: "         Troglodytes aedon\n\n\n             Nombre común:\n               Cucarachero"
      }
    ];

    var add = this.add;
    var or = this.scale.orientation;
    var noInteractives = [];


    // Adding resources
    let animalH = (this.height * 0.25) / 265;
    let animalW = (this.height * 0.25) / 300;
    let newAnimalH = animalH * 372;
    let newAnimalW = animalW * 421;
    this.add.image(this.width / 2, this.height / 2, 'background1').setScale(this.width / 3648, this.height / 2736);
    var ganaste = this.add.image(this.width / 2, this.height / 2, 'ganaste');
    ganaste.visible = false;
    var Alouatta = this.add.image(this.width / 2 - newAnimalW - 10, this.height / 2 - newAnimalH / 2 - 10, 'Alouatta').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Alouatta.setScale(0.9);

      Alouatta.x = this.width / 2 - Alouatta.displayWidth / 2 - 10;
      Alouatta.y = this.height / 2 - Alouatta.displayHeight * 1.1;
    }
    var Oophaga = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'Oophaga').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Oophaga.setScale(0.9);

      Oophaga.x = this.width / 2 - Oophaga.displayWidth / 2 - 10;
      Oophaga.y = Alouatta.y + Oophaga.displayHeight / 2 + 30 //this.height/2-Oophaga.displayHeight+10;
    }
    var rattus = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'Rattus').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      rattus.setScale(0.9);

      rattus.x = this.width / 2 + rattus.displayWidth / 2 + 10;
      rattus.y = this.height / 2 - rattus.displayHeight * 1.1 + rattus.displayHeight / 2 + 30; //this.height/2-rattus.displayHeight+10;
    }
    var Megaptera = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'Megaptera').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Megaptera.setScale(0.9);

      Megaptera.x = this.width / 2 - Megaptera.displayWidth / 2 - 10;
      Megaptera.y = Oophaga.y + Megaptera.displayHeight / 2 + 30;
    }
    var Lithobates = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'Lithobates').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Lithobates.setScale(0.9);

      Lithobates.x = this.width / 2 + Lithobates.displayWidth / 2 + 10;
      Lithobates.y = rattus.y + Lithobates.displayHeight / 2 + 30;
    }
    var Henicorhina = this.add.image(this.width / 2, this.height / 2 - newAnimalH / 2 - 10, 'Henicorhina').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Henicorhina.setScale(0.9);

      Henicorhina.x = this.width / 2 + Henicorhina.displayWidth / 2 + 10;
      Henicorhina.y = this.height / 2 - Henicorhina.displayHeight * 1.1;
    }
    //var Henicorhina = this.add.image(this.width/2,this.height/2-92,'Henicorhina');
    var Troglodytes = this.add.image(this.width / 2 + newAnimalW + 10, this.height / 2 - newAnimalH / 2 - 10, 'Troglodytes').setScale(animalW, animalH);
    if (or === 'portrait-primary') {
      Troglodytes.setScale(0.9);

      Troglodytes.x = this.width / 2;
      Troglodytes.y = Megaptera.y + Troglodytes.displayHeight / 2 + 30;
    }
    var exit = this.add.image(90, 50, 'exit').setScale(0.4);
    var info = this.physics.add.sprite(this.width - 70, 50, 'info').setScale(0.4);
    var cloud = this.physics.add.sprite(info.x, 150, 'cloud').setScale(1.5, 1.5);
    cloud.visible = false;
    cloud.x = info.x - cloud.displayWidth / 2;
    var next = this.physics.add.sprite(this.width / 2, this.height / 2 + ganaste.displayHeight / 2, 'next');
    next.y += next.displayHeight;
    next.setScale(0.8);
    next.visible = false;
    var pause = this.physics.add.sprite(this.width - 130, 50, 'pause');
    pause.setScale(0.4);
    pause.visible = false;
    var play = this.physics.add.sprite(this.width - 200, 50, 'play');
    play.setScale(0.4);

    WebFont.load({
      custom: {
        families: ['Nunito']
      },
      active: function() {
        game.animalInfo = add.text(cloud.x - cloud.displayWidth / 2 + 10, 100, '', {
          fontFamily: 'Nunito',
          fontSize: 20,
          color: '#000000'
        }).setShadow(2, 2, "#ffffff", 2, false, true);
        game.textTimer = add.text(game.width / 2, 40, '120', {
          fontFamily: 'Nunito',
          fontSize: 40,
          color: '#ffffff'
        }).setShadow(2, 2, "#000000", 2, false, true);
      }
    });

    var enable = this.physics.add.sprite(this.width - 300, 140, 'enable');

    var AlouattaA = this.sound.add('AlouattaA', {
      loop: true
    });
    var OophagaA = this.sound.add('OophagaA', {
      loop: true
    });
    var rattusA = this.sound.add('RattusA', {
      loop: true
    });
    var MegapteraA = this.sound.add('MegapteraA', {
      loop: true
    });
    var LithobatesA = this.sound.add('LithobatesA', {
      loop: true
    });
    var HenicorhinaA = this.sound.add('HenicorhinaA', {
      loop: true,
      volume: 500
    });
    var TroglodytesA = this.sound.add('TroglodytesA', {
      loop: true
    })

    // Adding every animal to the collection
    this.animals.push(Alouatta);
    this.animals.push(rattus);
    this.animals.push(Oophaga);
    this.animals.push(Megaptera);
    this.animals.push(Lithobates);
    this.animals.push(Henicorhina);
    this.animals.push(Troglodytes);


    // Adding every sound to the collection
    this.sounds.push(AlouattaA);
    this.sounds.push(rattusA);
    this.sounds.push(OophagaA);
    this.sounds.push(MegapteraA);
    this.sounds.push(LithobatesA);
    this.sounds.push(HenicorhinaA);
    this.sounds.push(TroglodytesA);




    //this.textTimer = this.add.text(330, 30, '',{fontSize: '60px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});



    // Setting interactions
    exit.setInteractive();
    exit.on('pointerover', () => {
      exit.setTint(0x33d1ff)
    });
    exit.on('pointerout', () => {
      exit.clearTint()
    });
    exit.on('pointerdown', () => {
      location.reload();
    });

    pause.setInteractive();
    pause.on('pointerover', () => {
      pause.setTint(0x33d1ff)
    });
    pause.on('pointerout', () => {
      pause.clearTint()
    });
    pause.on('pointerdown', () => {
      game.inicialSound.stop();
      pause.visible = false;
      play.visible = true;
    });

    play.setInteractive();
    play.on('pointerover', () => {
      play.setTint(0x33d1ff)
    });
    play.on('pointerout', () => {
      play.clearTint()
    });
    play.on('pointerdown', () => {
      if (initial) {
        enable.disableBody(true, true);
        play.visible = false;
        pause.visible = true;
        interval = setInterval(() => {
          regresiveCount();
        }, 1000);
        this.start = true;

        startInicialSound();
        setAnimalInteractions();
        initial = false;
      } else {
        game.inicialSound.play();
        play.visible = false;
        pause.visible = true;
      }
    });

    next.setInteractive();
    next.on('pointerover', () => {
      next.setScale(0.9)
    });
    next.on('pointerout', () => {
      next.setScale(0.8)
    });
    next.on('pointerdown', () => {
      this.scene.start('level2', {
        audio: true
      });
    })





    // Functions

    function setAnimalInteractions() {
      game.animals.forEach((animal, i) => {
        animal.setInteractive();
        animal.on('pointerover', () => {
          if (or === 'portrait-primary') {
            animal.setScale(1)
          } else {
            animal.setScale(animalW + 0.1, animalH + 0.1)
          }
        });
        animal.on('pointerout', () => {
          if (or === 'portrait-primary') {
            animal.setScale(0.9)
          } else {
            animal.setScale(animalW, animalH)
          }
        });
        animal.on('pointerdown', () => {
          clickedAnimal(i);
        })
      })
    }

    function startInicialSound() {
      unorderedSounds = shuffle(game.sounds);

      game.inicialSound = unorderedSounds[start];

      game.inicialSound.play({
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      });
    }


    function clickedAnimal(i) {
      let animalClicked = game.animals[i].texture.key + 'A';
      if (animalClicked === game.inicialSound.key) {
        start += 1;
        if (start < unorderedSounds.length) {
          game.inicialSound.stop();

          cloud.visible = true;
          game.animalInfo.setText(animalNames[i].name);

          noInteractives.push(i);

          game.animals[i].setTint(0x00FF0C);
          game.animals.forEach(an => an.disableInteractive())
          noInteractives.forEach(num => {
            game.animals[num].disableInteractive();
          })
          setTimeout(() => {
            cloud.visible = false;
            game.animalInfo.setText("");
            game.inicialSound.stop();
            game.inicialSound = unorderedSounds[start];
            game.inicialSound.play({
              mute: false,
              volume: 1,
              rate: 1,
              detune: 0,
              seek: 0,
              loop: true,
              delay: 0
            });
            game.animals.forEach(an => an.setInteractive())
            game.animals[i].disableInteractive();
            noInteractives.forEach(num => {
              game.animals[num].disableInteractive();
            })
          }, 4000);
        } else {
          game.inicialSound.stop();
          game.win = true;
          cloud.visible = true;
          game.animalInfo.setText(animalNames[i].name);

          game.animals[i].setTint(0x00FF0C);
          game.animals[i].disableInteractive();
          setTimeout(() => {
            cloud.visible = false;
            next.visible = true;
            ganaste.visible = true;
            game.animalInfo.setText('');
          }, 1700)

        }

      } else {
        game.animals[i].setTint(0xFF5050);
        setTimeout(() => {
          game.inicialSound.stop();
          game.animals[i].clearTint();
          game.inicialSound.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
          });
        }, 500);
      }

    }

    function shuffle(arra1) {
      var ctr = arra1.length,
        temp, index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
      }
      return arra1;
    }

    function regresiveCount() {
      if (game.win) {
        setTimeout(() => {
          Alouatta.visible = false;
          Henicorhina.visible = false;
          Troglodytes.visible = false;
          Megaptera.visible = false;
          Lithobates.visible = false;
          rattus.visible = false;
          Oophaga.visible = false;
          game.textTimer.setX(game.width / 2 - 70);
          play.disableInteractive(true, true);
          clearInterval(interval);

          game.textTimer.setText('');
        }, 900)


        game.inicialSound.stop();
        play.visible = true;
        pause.disableInteractive(true, true);
        pause.visible = false;

      } else {
        game.textTimer.setText(time.toString());
        time -= 1;
        if (time === 0) {
          game.inicialSound.stop();
          game.textTimer.setX(game.width / 2 - 70);
          game.textTimer.setText('¡PERDISTE!');
          game.animals.forEach(animal => {
            animal.disableInteractive(true, true);
          });
          game.physics.pause();
          play.visible = false;
          pause.disableInteractive(true, true);
          pause.visible = true;
          clearInterval(interval);
          game.inicialSound.stop();

        }
      }

    }

  }

}
