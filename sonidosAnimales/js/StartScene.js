class StartScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
        this.width=window.innerWidth;
        this.height=window.innerHeight;
        this.infoText;
        this.credits;
    }

    init(data){
        this.level = data.level;
        this.audio = data.audio;

        var element = document.createElement('style');

        document.head.appendChild(element);

        var sheet = element.sheet;

        var styles = '@font-face { font-family: "Nunito"; src: url("assets/Nunito-Regular.ttf") format("opentype"); }\n';

        sheet.insertRule(styles, 0);
    }

    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(this.width/2-165, this.height/2, 320, 50);

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
            x: width / 2-5,
            y: height / 2+25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2-5,
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

            progressBar.fillRect(width/2-160, height/2+10, 300 * value, 30);
        });


        this.load.on('fileprogress', function (file) {
            assetText.setText('Cargando elemento: ' + file.key);

        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });



        // Loading resources
        //this.load.image('carpa', './assets/img/carpa.jpg');
        this.load.spritesheet('carpa', './assets/img/carpa.png', { frameWidth: 690, frameHeight: 388 });

        this.load.image('background', './assets/img/background.png');
        this.load.image('infoButton', './assets/img/info.png');
        this.load.image('backButton', './assets/img/back.png');
        this.load.image('medium', './assets/img/mediumLevel.png');
        this.load.image('mediumL', './assets/img/mediumLevelLetter.png');
        this.load.image('legendary', './assets/img/legendaryLevel.png');
        this.load.image('legendaryL', './assets/img/legendaryLevelLetter.png');
        this.load.image('easy', './assets/img/easyLevel.png');
        this.load.image('easyL', './assets/img/easyLevelLetter.png');
        this.load.image('titulo', './assets/img/titulo.png');


        this.load.image('pause', './assets/img/pause.png');
        this.load.image('play', './assets/img/play.png');
        this.load.image('info', './assets/img/info.png');
        this.load.image('cloud', './assets/img/nube.png');
        this.load.image('enable', './assets/img/textDialogueEnableAudio.png');


        this.load.image('exit', './assets/img/back.png');
        this.load.image('restart', './assets/img/restart.png');
        this.load.image('ganaste', './assets/img/bannerGanaste.png');
        this.load.image('next', './assets/img/next.png');
        this.load.image('uv', './assets/img/uv.png');
        this.load.image('cerrar', './assets/img/cerrar.png');
        this.load.image('inicial', './assets/img/Inicial.png');



        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create(){
        var rect = new Phaser.Geom.Rectangle(0, 0, 10000, 10000);
        rect.depth = 4;
        var graphicsR = this.add.graphics({ fillStyle: { color: 0xffffff } });
        graphicsR.depth = 6;
        graphicsR.fillRectShape(rect);
        this.anims.create({ key: 'carp', frames: this.anims.generateFrameNumbers('carpa', { start: 0, end: 73 }), frameRate: 20, repeat: -1 });

        var carpa = this.add.sprite(this.width/2, this.height/3);
        carpa.depth =7;
        carpa.play('carp');

        var uv = this.add.image(150,this.height-40,'uv').setScale(0.15);
        uv.depth = 6;

        setTimeout(() => {
            rect.visible = false;
            graphicsR.destroy();
            carpa.destroy();
            uv.visible=false;
        }, 4000);


        var cerrar = this.add.sprite(50,50,'cerrar').setScale(0.4).setInteractive();
        cerrar.depth=3;
        cerrar.on('pointerdown', () => {
            window.close();
        })

        // Global variables
        var game = this;

        var add = this.add;
        var infoText;
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                game.infoText = add.text(game.width/4,game.height/4, "Escucha el sonido y escoge el animal \nal que crees que corresponde.", { fontFamily: 'Nunito', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                game.credits = add.text(game.width/46,game.height/1.5,"Créditos de las imágenes y audios: \n- Isabella García Gomez                      - Wilmar Bolivar-García                   - Fundación Yubarta         - Federico Mosquera       - Maria Isabel Herrera\n"+
                "- Katherine Pérez                                 - Paola Montoya                                - Palomino-Vargas L        - Jean Etienne                   - Eliana Barona\n- Panthera                                             - Andrea Bernal                                 - Andres Gómez"+
                "              - Wesley Shimizu             - Jessica Rojas\n- Juan Pablo Sanchez                           - Luis Carlos Mora-Medina              - Shimpei Ishiyama          - Cristian C.Ojeda", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                game.infoText.setVisible(false);
                game.credits.setVisible(false);
                infoText = add.text(1100,610, "*Apto para todo el público.", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                infoText.setY(game.height-infoText.displayHeight-10);
                infoText.setX(game.width-infoText.displayWidth-10);
            }
        });

        // Adding resources
        let buttonH = this.scale.orientation === Phaser.Scale.PORTRAIT ? 0.5 : (this.height*0.15)/155;
        this.add.image(this.width/2,this.height/2, 'background').setScale(this.width/1667,this.height/1251);
        var play = this.add.image(this.width/4,this.height/1.3, 'easy').setScale(0.5, buttonH);
        var playL = this.add.image(this.width/4,this.height/1.3, 'easyL').setScale( 0.5,buttonH);
        var play2 = this.add.image(this.width/2,this.height/1.3, 'medium').setScale( 0.5,buttonH);
        var play2L = this.add.image(this.width/2,this.height/1.3, 'mediumL').setScale( 0.5,buttonH);
        var play3 = this.add.image(this.width/1.33,this.height/1.3, 'legendary').setScale(0.5,buttonH);
        var play3L = this.add.image(this.width/1.33,this.height/1.3, 'legendaryL').setScale(0.5,buttonH);
        var info = this.add.image(this.width-70,50, 'infoButton').setScale(0.4);

        var gameName = this.add.image(this.width/2,this.height/3,'titulo').setScale(0.8);

        // Setting interactions
        info.setInteractive();
        info.on('pointerover', () => {info.setTint(0x33d1ff)});
        info.on('pointerout', () => {info.clearTint()});
        info.on('pointerdown', () => {infoFunction(play,info,this)});

        play.setInteractive();
        play.on('pointerover', () => {play.setTint(0x5C0FB8)});
        play.on('pointerout', () => {play.clearTint()});
        play.on('pointerdown', () => {
            playFunction(this,1);
        });

        play2.setInteractive();
        play2.on('pointerover', () => {play2.setTint(0x5C0FB8)});
        play2.on('pointerout', () => {play2.clearTint()});
        play2.on('pointerdown', () => {playFunction(this,2)});

        play3.setInteractive();
        play3.on('pointerover', () => {play3.setTint(0x5C0FB8)});
        play3.on('pointerout', () => {play3.clearTint()});
        play3.on('pointerdown', () => {playFunction(this,3)});


        // Functions

        function infoFunction(play, info,_this){
            play.visible = false;
            play2.visible = false;
            play3.visible = false;
            playL.visible = false;
            play2L.visible = false;
            play3L.visible = false;
            info.visible = false;
            gameName.visible = false;
            cerrar.visible=false;

            var back = _this.add.image(50,50,'backButton').setScale(0.4);
            game.infoText.setVisible(true);
            game.credits.setVisible(true);


            back.setInteractive();
            back.on('pointerover', () => {back.setTint(0x33d1ff)});
            back.on('pointerdown', () => {
                play.visible = true;
                play2.visible = true;
                play3.visible = true;
                info.visible = true;
                playL.visible = true;
                play2L.visible = true;
                play3L.visible = true;
                gameName.visible = true;
                cerrar.visible=true;

                back.visible = false;
                game.infoText.setVisible(false);
                game.credits.setVisible(false);
            })
            back.on('pointerout', () => {back.clearTint()});

        }

        function playFunction(_this, type){
            _this.scene.start("timerScene",{level: type, audio: false});
        }

    }
}
