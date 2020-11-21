class gameScene2 extends Phaser.Scene {
    constructor() {
        super("level2");
        this.animals = [];
        this.sounds = [];
        this.soundPos = 0;
        this.pressed = -1;
        this.textTimer = 0;
        this.win = false;
        this.inicialSound;
        this.audio;
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

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);

            progressBar.fillRect(width / 2 - 160, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Cargando elementos: Audios e imágenes');
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        // Loading resources
        this.load.image('background2', './assets/img/background1.JPG');

        //this.load.image('Leucostethus', './assets/img/4.JPG');
        this.load.image('Cebus', './assets/img/6.png');
        this.load.image('Myadestes', './assets/img/7.png');
        this.load.image('Panthera', './assets/img/8.png');
        this.load.image('Syndactyla', './assets/img/9.png');
        this.load.image('Lophotriccus', './assets/img/10.png');
        this.load.image('Leucostethus', './assets/img/11.png');
        this.load.image('Diasporus', './assets/img/16.png');


        //this.load.audio('LeucostethusA', './assets/audios/4.wav');
        this.load.audio('PantheraA', ['./assets/audios/8.ogg', './assets/audios/8.m4a', './assets/audios/8.mp3']);
        this.load.audio('CebusA', ['./assets/audios/6.ogg', './assets/audios/6.m4a', './assets/audios/6.mp3']);
        this.load.audio('MyadestesA', ['./assets/audios/7.ogg', './assets/audios/7.m4a', './assets/audios/7.mp3']);
        this.load.audio('SyndactylaA', ['./assets/audios/9.ogg', './assets/audios/9.m4a', './assets/audios/9.mp3']);
        this.load.audio('LophotriccusA', ['./assets/audios/10.ogg', './assets/audios/10.m4a', './assets/audios/10.mp3']);
        this.load.audio('LeucostethusA', ['./assets/audios/11.ogg', './assets/audios/11.m4a', './assets/audios/11.mp3']);
        this.load.audio('DiasporusA', ['./assets/audios/16.ogg', './assets/audios/16.m4a', './assets/audios/16.mp3']);
    }

    create() {

        var initial = !this.audio;
        var game = this;
        var unorderedSounds;
        var start = 0;
        var time = 79;
        var interval;
        var animalNames = [{
                name: "             Panthera onca\n\n\n            Nombre común:\n                   Jaguar"
            },
            {
                name: "         Cebus capucinus\n\n             Nombre común:\n             Mono capuchino\n           o Mono cariblanco"
            },
            {
                name: "         Myadestes ralloides\n\n\n             Nombre común:\n             Solitario andino"
            },
            {
                name: "         Syndactyla subalaris\n\n\n            Nombre común:\n         Hojarasquero listado"
            },
            {
                name: "         Lophotriccus pileatus\n\n\n             Nombre común:\n           Tiranuelo pileado"
            },
            {
                name: "           Diasporus gularis\n\n\n            Nombre común:\n     Rana duende de bosque"
            },
            {
                name: "     Leucostethus fraterdanieli\n\n\n            Nombre común:\n               Rana cohete"
            },

        ];

        var add = this.add;
        var or = this.scale.orientation;
        var noInteractives = [];

        // Adding resources
        this.add.image(this.width / 2, this.height / 2, 'background2').setScale(this.width / 2592, this.height / 1456);

        let animalH = (this.height * 0.25) / 265;
        let animalW = (this.height * 0.25) / 300;
        let newAnimalH = animalH * 372;
        let newAnimalW = animalW * 421;
        var ganaste = this.add.image(this.width/2, this.height/2, 'ganaste');
        ganaste.visible=false;
        var Panthera = this.add.image(this.width / 2 - newAnimalW - 10, this.height / 2 + newAnimalH / 2 + 10, 'Panthera').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Panthera.setScale(0.9);

            Panthera.x = this.width / 2 - Panthera.displayWidth / 2 - 10;
            Panthera.y = this.height / 2 - Panthera.displayHeight * 1.1;
        }
        var Cebus = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'Cebus').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Cebus.setScale(0.9);

            Cebus.x = this.width / 2 - Cebus.displayWidth / 2 - 10;
            Cebus.y = Panthera.y + Cebus.displayHeight / 2 + 30 //this.height/2-Oophaga.displayHeight+10;
        }
        var Myadestes = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'Myadestes').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Myadestes.setScale(0.9);

            Myadestes.x = this.width / 2 + Myadestes.displayWidth / 2 + 10;
            Myadestes.y = this.height / 2 - Myadestes.displayHeight * 1.1 + Myadestes.displayHeight / 2 + 30; //this.height/2-rattus.displayHeight+10;
        }
        var Syndactyla = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'Syndactyla').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Syndactyla.setScale(0.9);

            Syndactyla.x = this.width / 2 - Syndactyla.displayWidth / 2 - 10;
            Syndactyla.y = Cebus.y + Syndactyla.displayHeight / 2 + 30;
        }
        var Lophotriccus = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'Lophotriccus').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Lophotriccus.setScale(0.9);

            Lophotriccus.x = this.width / 2 + Lophotriccus.displayWidth / 2 + 10;
            Lophotriccus.y = Myadestes.y + Lophotriccus.displayHeight / 2 + 30;
        }
        var Diasporus = this.add.image(this.width / 2, this.height / 2 + newAnimalH / 2 + 10, 'Diasporus').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Diasporus.setScale(0.9);

            Diasporus.x = this.width / 2 + Diasporus.displayWidth / 2 + 10;
            Diasporus.y = this.height / 2 - Diasporus.displayHeight * 1.1;
        }
        var Leucostethus = this.add.image(this.width / 2 + newAnimalW + 10, this.height / 2 + newAnimalH / 2 + 10, 'Leucostethus').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            Leucostethus.setScale(0.9);

            Leucostethus.x = this.width / 2;
            Leucostethus.y = Syndactyla.y + Syndactyla.displayHeight/2 + 30;
        }
        var exit = this.add.image(90, 50, 'exit').setScale(0.4);
        var info = this.physics.add.sprite(this.width - 70, 50, 'info').setScale(0.4);
        var cloud = this.physics.add.sprite(info.x, 150, 'cloud').setScale(1.5, 1.5);
        cloud.visible = false;
        cloud.x = info.x - cloud.displayWidth / 2;
        var next = this.physics.add.sprite(this.width/2, this.height/2+ganaste.displayHeight/2, 'next');
        next.y += next.displayHeight;
        next.setScale(0.8);
        next.visible = false;
        var pause = this.physics.add.sprite(this.width - 130, 50, 'pause');
        pause.setScale(0.4);
        var play = this.physics.add.sprite(this.width - 200, 50, 'play');
        play.setScale(0.4);

        WebFont.load({
            custom: {
                families: ['Nunito']
            },
            active: function () {
                game.animalInfo = add.text(cloud.x - cloud.displayWidth / 2 + 10, 100, '', {
                    fontFamily: 'Nunito',
                    fontSize: 20,
                    color: '#000000'
                }).setShadow(2, 2, "#ffffff", 2, false, true);
                game.textTimer = add.text(game.width / 2, 40, '80', {
                    fontFamily: 'Nunito',
                    fontSize: 40,
                    color: '#ffffff'
                }).setShadow(2, 2, "#000000", 2, false, true);
            }
        });

        var enable = this.physics.add.sprite(this.width - 300, 140, 'enable') //.disableBody(true,true);
        enable.visible = false;
        //this.timer = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 82, startAt: 0 });
        //this.timer.paused = true;


        //var LeucostethusA = this.sound.add('LeucostethusA', { loop: false });
        var PantheraA = this.sound.add('PantheraA', {
            loop: true
        });
        var CebusA = this.sound.add('CebusA', {
            loop: true
        });
        var MyadestesA = this.sound.add('MyadestesA', {
            loop: true
        });
        var LophotriccusA = this.sound.add('LophotriccusA', {
            loop: true
        });
        var SyndactylaA = this.sound.add('SyndactylaA', {
            loop: true
        });
        var DiasporusA = this.sound.add('DiasporusA', {
            loop: true
        });
        var LeucostethusA = this.sound.add('LeucostethusA', {
            loop: true
        });

        // Adding every animal to the collection
        //this.animals.push(Leucostethus);
        this.animals.push(Panthera);
        this.animals.push(Cebus);
        this.animals.push(Myadestes);
        this.animals.push(Syndactyla);
        this.animals.push(Lophotriccus);
        this.animals.push(Diasporus);
        this.animals.push(Leucostethus);

        // Adding every sound to the collection
        //this.sounds.push(LeucostethusA);
        this.sounds.push(PantheraA);
        this.sounds.push(CebusA);
        this.sounds.push(MyadestesA);
        this.sounds.push(SyndactylaA);
        this.sounds.push(LophotriccusA);
        this.sounds.push(DiasporusA);
        this.sounds.push(LeucostethusA);

        //this.textTimer = this.add.text(330, 30, '',{fontSize: '60px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

        if (initial) {
            //enable.enableBody(true,550,149,true,true);
            enable.visible = true;
            //pause.disableBody(true,true);
            pause.visible = false;
        } else {
            //play.disableBody(true,true);
            play.visible = false;
            startInicialSound();
            setAnimalInteractions();
            this.start = true;
            interval = setInterval(() => {
                regresiveCount();
            }, 1000);
        }

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
            this.inicialSound.stop();
            //pause.disableBody(true,true);
            pause.visible = false;
            //play.enableBody(true,650,50,true,true);
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
                //enable.disableBody(true,true);
                enable.visible = false;
                //play.disableBody(true,true);
                play.visible = false;
                //pause.enableBody(true,700,50,true,true);
                pause.visible = true;
                //this.timer.paused = false;
                interval = setInterval(() => {
                    regresiveCount();
                }, 1000);
                this.start = true;
                startInicialSound();
                setAnimalInteractions();
                initial = false;
            } else {
                game.inicialSound.play();
                //play.disableBody(true,true);
                play.visible = false;
                //pause.enableBody(true,700,50,true,true);
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
            this.scene.start('level3', {
                audio: true
            });
        });



        // Functions

        function setAnimalInteractions() {
            game.animals.forEach((animal, i) => {
                animal.setInteractive();
                animal.on('pointerover', () => () => {
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
                    if (or === 'portrait-primary') {
                        animal.setScale(1)
                    } else {
                        animal.setScale(animalW + 0.1, animalH + 0.1)
                    }
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
                // If animal is right and game isn't over yet
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
                      cloud.visible=false;
                      next.visible=true;
                      ganaste.visible=true;
                      game.animalInfo.setText("");
                    }, 1700)
                }


            } else {
                // Animal isn't right
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
                Syndactyla.visible=false;
                Myadestes.visible=false;
                Leucostethus.visible=false;
                Lophotriccus.visible=false;
                Cebus.visible=false;
                Panthera.visible=false;
                Diasporus.visible=false;
                game.textTimer.setX(game.width / 2 - 70);
                play.disableInteractive(true,true);
                clearInterval(interval);
                game.textTimer.setText('');
              }, 900)

                game.inicialSound.stop();
                play.visible = false;
                pause.disableInteractive(true, true);
                pause.visible = true;

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
                }
            }
        }
    }

}
