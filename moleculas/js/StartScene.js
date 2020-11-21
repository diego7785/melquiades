class StartScene extends Phaser.Scene {
    constructor() {
        // Scene name
        super("bootGame");
        this.atoms = [];
        this.once = 0;
        this.rotate;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
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
        this.load.spritesheet('carpa', './assets/img/carpa.png', { frameWidth: 690, frameHeight: 388 });

        this.load.image("background", "./assets/img/background.png");
        this.load.image('start', './assets/img/buttonPlay.png');
        this.load.image('play', './assets/img/play.png');
        this.load.image('info', './assets/img/info.png');
        this.load.image('atom', './assets/img/atomStart.png');
        this.load.image('howTo', './assets/img/howToPlay.png');
        this.load.image('gameName', './assets/img/gameName.png');
        this.load.image('uv', './assets/img/uv.png');
        this.load.image('cerrar', './assets/img/cerrar.png');
        this.load.image('watch', './assets/img/watchVideo.png');


        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create() {
        var game = this;

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
        cerrar.on('pointerdown', () => {
            window.close();
        })

        var add = this.add;
        var infoText;
        var watchVideo;
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                infoText = add.text(1100,610, "*Edad recomendada \na partir de los 8 años.", { fontFamily: 'Nunito', fontSize: 15, color: '#000000' }).setShadow(2, 2, "#ffffff", 2, false, true);
                infoText.setY(game.height-infoText.displayHeight-10);
                infoText.setX(game.width-infoText.displayWidth-10);

                watchVideo = add.text(100, 70, "Explorar más", { fontFamily: 'Nunito', fontSize: 15, color: '#000000' }).setShadow(2, 2, "#ffffff", 2, false, true);
                watchVideo.visible=false;
            }
        });

        var background = this.add.image(this.width / 2, this.height / 2, 'background').setScale(this.width / 2000, this.height / 2000);
        background.depth = -2;

        var howTo = this.physics.add.sprite(((this.width * 95) / 100) - 160, ((this.height * 10) / 100) + 140, 'howTo')
            .setScale(0.4);
        howTo.visible = false;
        var play = this.add.image(this.width / 2, this.height / 1.3, 'start')
            .setScale(0.8);
        play.depth = 3;
        var playText = this.add.image(this.width / 2, this.height / 1.3, 'play')
            .setScale(0.8);
        playText.depth = 4;
        var info = this.add.image((this.width * 95) / 100, 50, 'info').setScale(0.4);
        info.depth = 3;
        var watch = this.add.image(info.x, 53, 'watch').setScale(0.1).setInteractive();
        watch.x = info.x - info.displayWidth/2 - watch.displayWidth/2 - 10;
        watch.depth = 3;

        var gameName = this.physics.add.sprite(this.width / 2, this.height / 3, 'gameName')
            .setScale(0.6, 1);
        gameName.depth = 4;


        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 6; j++) {
                let x = Math.random() * this.width + 50;
                let y = Math.random() * this.height + 50;
                if (x < (this.width / 2) + 200 && x > (this.width / 2) - 200 && y > (this.height / 3) - 100 && y < (this.height / 3) + 100) {
                    continue;
                }
                let atom = this.physics.add.sprite(x, y, 'atom');
                atom.setScale(Math.random() * 1.5);
                this.atoms.push(atom);
            }
        }
        // Adding interactions

        info.setInteractive();
        info.on('pointerover', () => { info.setTint(0xE7C806); infoFunction(true, this) });
        info.on('pointerdown', () => { info.setTint(0xE7C806); infoFunction(true, this) });
        info.on('pointerout', () => { info.clearTint(); infoFunction(false, this) });
        info.on('pointerup', () => { info.clearTint(); infoFunction(false, this) });

        play.setInteractive();
        play.on('pointerover', () => { play.setTint(0x0080FF) });
        play.on('pointerout', () => { play.clearTint() });
        play.on('pointerdown', () => { playFunction(this) });

        watch.on('pointerover', () => {
          watchVideo.x = watch.x-43;
          watchVideo.visible=true;
        })

        watch.on('pointerdown', () => {
          watch.setTint(0xB60000);
          window.open('https://youtu.be/IVhyT6V9hi4');
          setTimeout( () => {
            watch.clearTint();
          }, 500)
        })

        watch.on('pointerout', () => {
          watchVideo.visible=false;
        })

        // Functions

        function infoFunction(flag, _this) {
            howTo.depth = 5;
            howTo.visible = flag;
        }

        function playFunction(_this) {
            _this.scene.start("tutoScene");
        }
        //}
    }




    update() {
        /*if(window.innerHeight < window.innerWidth){
            this.rotate.depth = -5;
            this.rect.depth = -5;
            this.graphicsR.depth = -5;
            this.once += 1;
            this.create();*/
        this.atoms.forEach(a => {

            a.rotation += 0.03;
        });
        /*
    }  else {
        this.rotate.depth = 6;
        this.rect.depth = 5;
        this.graphicsR.depth = 5;
    }*/

    }

}
