class StartScene extends Phaser.Scene{
    constructor(){
        super("bootGame");
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

        this.load.spritesheet('carpa', './assets/img/carpa.png', { frameWidth: 690, frameHeight: 388 });
        this.load.image("background", "./assets/img/background.jpg");

        this.load.image("buttonPlay","./assets/img/buttonPlay.jpg");
        this.load.image("title", "./assets/img/title.png");
        this.load.image("infoButton", "./assets/img/infoButton.png");
        this.load.image("infoText", "./assets/img/infoText.png");

        this.load.audio("8000Hz", [ "./assets/audios/8000Hz.ogg", "./assets/audios/8000Hz.m4a", "./assets/audios/8000Hz.mp3"]);
        this.load.audio("12000Hz", ["./assets/audios/12000Hz.ogg", "./assets/audios/12000Hz.m4a", "./assets/audios/12000Hz.mp3"]);
        this.load.audio("15000Hz", ["./assets/audios/15000Hz.ogg", "./assets/audios/15000Hz.m4a", "./assets/audios/15000Hz.mp3"]);
        this.load.audio("16000Hz", ["./assets/audios/16000Hz.ogg", "./assets/audios/16000Hz.m4a", "./assets/audios/16000Hz.mp3"]);
        this.load.audio("18000Hz", ["./assets/audios/18000Hz.ogg", "./assets/audios/18000Hz.m4a", "./assets/audios/18000Hz.mp3"]);
        this.load.audio("20000Hz", ["./assets/audios/20000Hz.ogg", "./assets/audios/20000Hz.m4a", "./assets/audios/20000Hz.mp3"]);
        this.load.image('uv', './assets/img/uv.png');
        this.load.image('cerrar', './assets/img/cerrar.png');
        this.load.image('video', './assets/img/watchVideo.png');

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

        var cerrar = this.add.sprite(50,50,'cerrar').setScale(0.5).setInteractive();
        cerrar.depth=3;
        cerrar.on('pointerdown', () =>{
        	window.close();
        })

        var game = this;
        var add = this.add;
        var infoTextI;
        var watchVideo;
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                infoTextI = add.text(1100,610, "*Edad recomendada \na partir de los 8 años.", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                infoTextI.setY(game.height-infoTextI.displayHeight-10);
                infoTextI.setX(game.width-infoTextI.displayWidth-10);

                watchVideo = add.text(100, 70, "Explorar más", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                watchVideo.visible=false;
            }
        });

        // Scale of width and height
        var fEscalaW = this.width/1360;
        var fEscalaH = this.height/639;
        if(this.scale.orientation === "portrait-primary"){
            fEscalaW=this.width/639;
            fEscalaH=this.height/1360;
        }

        this.physics.add.sprite(this.width/2, this.height/2, "background").setScale(this.width/2535, this.height/1308);
        var play = this.physics.add.sprite(this.width/2, this.height/1.3, "buttonPlay").setScale(fEscalaW, fEscalaW).setInteractive();
        this.physics.add.sprite(this.width/2, this.height/3, "title").setScale(0.7, 0.8);
        var infoButton = this.physics.add.sprite((this.width * 95) / 100, 50, "infoButton").setInteractive().setScale(0.4);
        var watch = this.physics.add.sprite(infoButton.x - infoButton.displayWidth/2,50, 'video').setScale(0.12).setInteractive();
        watch.x -= watch.displayHeight;
        var infoText = this.physics.add.sprite(((this.width * 95) / 100) - 160, ((this.height * 10) / 100) + 160, "infoText").setScale(0.4);
        infoText.visible=false;

        // Setting Interactions
        infoButton.on('pointerover', () => {
            infoButton.setScale(0.5);
        });

        infoButton.on('pointerdown', () => {
            infoButton.setScale(0.5);
            infoText.visible=true;
        });

        infoButton.on('pointerup', () => {
            infoButton.setScale(0.4);
            infoText.visible=false;
        })

        infoButton.on('pointerout', () => {
            infoButton.setScale(0.4);
        })

        play.on('pointerover', () => {
            play.setScale(fEscalaW+0.1, fEscalaH+0.1);
        })

        play.on('pointerdown', () => {
            play.setScale(fEscalaW+0.1, fEscalaH+0.1);
            this.scene.start("useHeadphones");
        })

        play.on('pointerup', () => {
            play.setScale(fEscalaW, fEscalaH);
        })

        play.on('pointerout', () => {
            play.setScale(fEscalaW, fEscalaH);
        })

        watch.on('pointerover', () => {
          watchVideo.x = watch.x-43;
          watchVideo.visible=true;
        })

        watch.on('pointerdown', () => {
          watch.setTint(0xB60000);
          window.open('https://youtu.be/tHbPgXvin1c');
          setTimeout( () => {
            watch.clearTint();
          }, 500)
        })

        watch.on('pointerout', () => {
          watchVideo.visible=false;
        })

    }
}
