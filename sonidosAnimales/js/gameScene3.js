class gameScene3 extends Phaser.Scene {
    constructor() {
        super("level3");
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
        this.load.image('background3', './assets/img/background3.jpeg');

        this.load.image('PumaO', './assets/img/13O.png');
        this.load.image('LeopardusO', './assets/img/12O.png');
        this.load.image('RupicolaO', './assets/img/14O.png');
        this.load.image('NoctilioO', './assets/img/17O.png');
        this.load.image('PristimantisO', './assets/img/18O.png');
        this.load.image('LeptodactylusO', './assets/img/19O.png');
        this.load.image('DendrosophusO', './assets/img/20O.png');
        this.load.image('LeptodactylusCO', './assets/img/21O.png');


        this.load.image('Puma', './assets/img/13.png');
        this.load.image('Leopardus', './assets/img/12.png');
        this.load.image('Rupicola', './assets/img/14.png');
        this.load.image('Noctilio', './assets/img/17.png');
        this.load.image('Pristimantis', './assets/img/18.png');
        this.load.image('Leptodactylus', './assets/img/19.png');
        this.load.image('Dendrosophus', './assets/img/20.png');
        this.load.image('LeptodactylusC', './assets/img/21.png');


        this.load.audio('PumaA', ['./assets/audios/13.ogg', './assets/audios/13.m4a', './assets/audios/13.mp3']);
        this.load.audio('LeopardusA', ['./assets/audios/12.ogg', './assets/audios/12.m4a', './assets/audios/12.mp3']);
        this.load.audio('RupicolaA', ['./assets/audios/14.ogg', './assets/audios/14.m4a', './assets/audios/14.mp3']);
        this.load.audio('NoctilioA', ['./assets/audios/17.ogg', './assets/audios/17.m4a', './assets/audios/17.mp3']);
        this.load.audio('PristimantisA', ['./assets/audios/18.ogg', './assets/audios/18.m4a', './assets/audios/18.mp3']);
        this.load.audio('LeptodactylusA', ['./assets/audios/19.ogg', './assets/audios/19.m4a', './assets/audios/19.mp3']);
        this.load.audio('DendrosophusA', ['./assets/audios/20.ogg', './assets/audios/20.m4a', './assets/audios/20.mp3']);
        this.load.audio('LeptodactylusCA', ['./assets/audios/21.ogg', './assets/audios/21.m4a', './assets/audios/21.mp3']);

    }

    create() {
        var initial = !this.audio;
        var game = this;
        var unorderedSounds;
        var start = 0;
        var time = 59;
        var interval;
        var noOAnimals = []
        var lastAnimal = 0;

        var add = this.add;
        var or = this.scale.orientation;

        var animalNames = [{
                name: "             Puma concolor\n\n\n             Nombre común:\n                     Puma"
            },
            {
                name: "         Leopardus pardalis\n\n\n            Nombre común:\n                   Tigrillo"
            },
            {
                name: "         Rupicola peruvianus\n\n\n            Nombre común:\n             Gallito de roca"
            },
            {
                name: "         Noctilio albiventris\n\n\n           Nombre común:\n       Murciélago pescador"
            },
            {
                name: "        Pristimantis achatinus\n\n\n            Nombre común:\n     Rana duende del bosque"
            },
            {
                name: "         Leptodactylus fragilis\n\n\n            Nombre común:\n              Rana de pozo"
            },
            {
                name: "  Dendropsophus colombianus\n\n\n             Nombre común:\n               Rana arborea"
            },
            {
                name: "    Leptodactylus colombiensis\n\n\n           Nombre común:\n             Rana de pozo"
            }
        ];

        // Adding resources

        let animalH = (this.height * 0.25) / 265;
        let animalW = (this.height * 0.25) / 300;
        let newAnimalH = animalH * 372;
        let newAnimalW = animalW * 421;

        this.add.image(this.width / 2, this.height / 2, 'background3').setScale(this.width / 1040, this.height / 780);
        var ganaste = this.add.image(this.width/2, this.height/2, 'ganaste');
        ganaste.visible=false;
        var PumaO = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'PumaO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            PumaO.setScale(0.9);

            PumaO.x = this.width / 2 - PumaO.displayWidth / 2 - 10;
            PumaO.y = this.height / 2 - PumaO.displayHeight * 1.1;
        }
        var LeopardusO = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'LeopardusO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            LeopardusO.setScale(0.9);

            LeopardusO.x = this.width / 2 - LeopardusO.displayWidth / 2 - 10;
            LeopardusO.y = PumaO.y + LeopardusO.displayHeight / 1.3 //this.height/2-Oophaga.displayHeight+10;
        }
        var RupicolaO = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'RupicolaO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            RupicolaO.setScale(0.9);

            RupicolaO.x = this.width / 2 + RupicolaO.displayWidth / 2 + 10;
            RupicolaO.y = this.height / 2 - RupicolaO.displayHeight * 1.1 + RupicolaO.displayHeight / 1.3; //this.height/2-rattus.displayHeight+10;
        }
        var NoctilioO = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'NoctilioO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            NoctilioO.setScale(0.9);

            NoctilioO.x = this.width / 2 - NoctilioO.displayWidth / 2 - 10;
            NoctilioO.y = LeopardusO.y + NoctilioO.displayHeight / 1.3;
        }
        var PristimantisO = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'PristimantisO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            PristimantisO.setScale(0.9);

            PristimantisO.x = this.width / 2 + PristimantisO.displayWidth / 2 + 10;
            PristimantisO.y = RupicolaO.y + PristimantisO.displayHeight / 1.3;
        }
        var LeptodactylusO = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'LeptodactylusO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            LeptodactylusO.setScale(0.9);

            LeptodactylusO.x = this.width / 2 + LeptodactylusO.displayWidth / 2 + 10;
            LeptodactylusO.y = /*RupicolaO.y+LeptodactylusO.displayHeight/1.3; */ this.height / 2 - PumaO.displayHeight * 1.1 //this.height/2-LeptodactylusO.displayHeight*1.3;
        }
        var DendrosophusO = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'DendrosophusO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            DendrosophusO.setScale(0.9);

            DendrosophusO.x = this.width / 2 - DendrosophusO.displayWidth / 2 - 10;
            DendrosophusO.y = NoctilioO.y + DendrosophusO.displayHeight / 1.3;
        }
        var LeptodactylusCO = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'LeptodactylusCO').setScale(animalW, animalH);
        if (or === 'portrait-primary') {
            LeptodactylusCO.setScale(0.9);

            LeptodactylusCO.x = this.width / 2 + LeptodactylusO.displayWidth / 2 + 10;
            LeptodactylusCO.y = NoctilioO.y + LeptodactylusCO.displayHeight / 1.3;
        }
        var Puma = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'Puma').setScale(animalW, animalH);
        Puma.visible = false;
        if (or === 'portrait-primary') {
            Puma.setScale(0.9);

            Puma.x = this.width / 2 - Puma.displayWidth / 2 - 10;
            Puma.y = this.height / 2 - Puma.displayHeight * 1.1;
        }
        var Leopardus = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'Leopardus').setScale(animalW, animalH);
        Leopardus.visible = false;
        if (or === 'portrait-primary') {
            Leopardus.setScale(0.9);

            Leopardus.x = this.width / 2 - Leopardus.displayWidth / 2 - 10;
            Leopardus.y = Puma.y + Leopardus.displayHeight / 1.3 //this.height/2-Oophaga.displayHeight+10;
        }
        var Rupicola = this.add.image(this.width / 2 - newAnimalW * 1.5 - 10, this.height / 2 - newAnimalH / 2 - 10, 'Rupicola').setScale(animalW, animalH);
        Rupicola.visible = false;
        if (or === 'portrait-primary') {
            Rupicola.setScale(0.9);

            Rupicola.x = this.width / 2 + Rupicola.displayWidth / 2 + 10;
            Rupicola.y = this.height / 2 - Rupicola.displayHeight * 1.1 + Rupicola.displayHeight / 1.3; //this.height/2-rattus.displayHeight+10;
        }
        var Noctilio = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'Noctilio').setScale(animalW, animalH);
        Noctilio.visible = false;
        if (or === 'portrait-primary') {
            Noctilio.setScale(0.9);

            Noctilio.x = this.width / 2 - Noctilio.displayWidth / 2 - 10;
            Noctilio.y = Leopardus.y + Noctilio.displayHeight / 1.3;
        }
        var Pristimantis = this.add.image(this.width / 2 - newAnimalW * 0.5 - 10, this.height / 2 + newAnimalH / 2 + 10, 'Pristimantis').setScale(animalW, animalH);
        Pristimantis.visible = false;
        if (or === 'portrait-primary') {
            Pristimantis.setScale(0.9);

            Pristimantis.x = this.width / 2 + Pristimantis.displayWidth / 2 + 10;
            Pristimantis.y = RupicolaO.y + PristimantisO.displayHeight / 1.3;
        }
        var Leptodactylus = this.add.image(this.width / 2 + newAnimalW * 0.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'Leptodactylus').setScale(animalW, animalH);
        Leptodactylus.visible = false;
        if (or === 'portrait-primary') {
            Leptodactylus.setScale(0.9);

            Leptodactylus.x = this.width / 2 + Leptodactylus.displayWidth / 2 + 10;
            Leptodactylus.y = this.height / 2 - PumaO.displayHeight * 1.1;
        }
        var Dendrosophus = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 + newAnimalH / 2 + 10, 'Dendrosophus').setScale(animalW, animalH);
        Dendrosophus.visible = false;
        if (or === 'portrait-primary') {
            Dendrosophus.setScale(0.9);

            Dendrosophus.x = this.width / 2 - DendrosophusO.displayWidth / 2 - 10;
            Dendrosophus.y = NoctilioO.y + DendrosophusO.displayHeight / 1.3;
        }
        var LeptodactylusC = this.add.image(this.width / 2 + newAnimalW * 1.5 + 10, this.height / 2 - newAnimalH / 2 - 10, 'LeptodactylusC').setScale(animalW, animalH);
        LeptodactylusC.visible = false;
        if (or === 'portrait-primary') {
            LeptodactylusC.setScale(0.9);

            LeptodactylusC.x = this.width / 2 + LeptodactylusC.displayWidth / 2 + 10;
            LeptodactylusC.y = NoctilioO.y + LeptodactylusCO.displayHeight / 1.3;
        }


        var pause = this.physics.add.sprite(this.width - 130, 50, 'pause');
        pause.setScale(0.4);
        var play = this.physics.add.sprite(this.width - 200, 50, 'play');
        play.setScale(0.4);

        var enable = this.physics.add.sprite(this.width - 300, 140, 'enable') //.disableBody(true,true);
        enable.visible = false;
        var exit = this.add.image(90, 50, 'exit').setScale(0.4);
        var info = this.physics.add.sprite(this.width - 70, 50, 'info').setScale(0.4);
        var cloud = this.physics.add.sprite(info.x, 150, 'cloud').setScale(1.5, 1.5);
        cloud.visible = false;
        cloud.x = info.x - cloud.displayWidth / 2;

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



        var PumaA = this.sound.add('PumaA', {
            loop: true
        });
        var LeopardusA = this.sound.add('LeopardusA', {
            loop: true
        });

        var RupicolaA = this.sound.add('RupicolaA', {
            loop: true
        });
        var NoctilioA = this.sound.add('NoctilioA', {
            loop: true
        });
        var PristimantisA = this.sound.add('PristimantisA', {
            loop: true
        });
        var LeptodactylusA = this.sound.add('LeptodactylusA', {
            loop: true
        });
        var DendrosophusA = this.sound.add('DendrosophusA', {
            loop: true
        });
        var LeptodactylusCA = this.sound.add('LeptodactylusCA', {
            loop: true
        });


        // Adding every animal to the collection
        this.animals.push(PumaO);
        this.animals.push(LeopardusO);
        this.animals.push(RupicolaO);
        this.animals.push(NoctilioO);
        this.animals.push(PristimantisO);
        this.animals.push(LeptodactylusO);
        this.animals.push(DendrosophusO);
        this.animals.push(LeptodactylusCO);


        noOAnimals.push(Puma);
        noOAnimals.push(Leopardus);
        noOAnimals.push(Rupicola);
        noOAnimals.push(Noctilio);
        noOAnimals.push(Pristimantis);
        noOAnimals.push(Leptodactylus);
        noOAnimals.push(Dendrosophus);
        noOAnimals.push(LeptodactylusC);


        // Adding every sound to the collection
        this.sounds.push(PumaA);
        this.sounds.push(LeopardusA);
        this.sounds.push(RupicolaA);
        this.sounds.push(NoctilioA);
        this.sounds.push(PristimantisA);
        this.sounds.push(LeptodactylusA);
        this.sounds.push(DendrosophusA);
        this.sounds.push(LeptodactylusCA);


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
                    lastAnimal = i;
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
            let animalClicked = game.animals[i].texture.key;
            animalClicked = animalClicked.substring(0, animalClicked.length - 1) + "A";
            if (animalClicked === game.inicialSound.key) {
                start += 1;
                if (start < unorderedSounds.length) {
                    game.inicialSound.stop();

                    cloud.visible = true;
                    game.animalInfo.setText(animalNames[i].name);

                    game.animalInfo.depth = 2;
                    game.animals[i].visible = false;
                    game.animals.forEach(an => an.disableInteractive())

                    noOAnimals[i].visible = true;
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
                    }, 4000);
                } else {
                    game.inicialSound.stop();
                    game.win = true;
                    cloud.visible = true;
                    setTimeout(() => {
                      cloud.visible=false;
                      ganaste.visible=true;
                      game.animalInfo.setText("");
                    }, 1700)
                    game.animalInfo.setText(animalNames[i].name);
                }

            } else {
                game.animals[i].setTintFill(0xFF5050);
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
                  Puma.visible=false;
                  Dendrosophus.visible=false;
                  Leopardus.visible=false;
                  Leptodactylus.visible=false;
                  LeptodactylusC.visible=false;
                  Noctilio.visible=false;
                  Pristimantis.visible=false;
                  Rupicola.visible=false;
                  game.textTimer.setX(game.width / 2 - 70);
                  play.disableInteractive(true,true);
                  clearInterval(interval);
                  game.textTimer.setText('');

                }, 900)

                game.animals[lastAnimal].visible = false;
                noOAnimals[lastAnimal].visible = true;

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
