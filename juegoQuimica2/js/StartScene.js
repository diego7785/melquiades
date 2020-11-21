class StartScene extends Phaser.Scene{
    constructor(){
        // Scene name
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

        this.load.image('background', './assets/img/backgroundS.jpg');
        this.load.image('start', './assets/img/buttonPlay.png');
        this.load.image('startL', './assets/img/buttonPlayLetter.png');
        this.load.image('info', './assets/img/info.png');
        this.load.image('titulo', './assets/img/titulo.png');
        this.load.image('howTo', './assets/img/howTo.png');
        this.load.image('close', './assets/img/cerrar.png');
        this.load.image('uv', './assets/img/uv.png');
        this.load.image('watch', './assets/img/watchVideo.png');
        this.load.image('bannerVideo', './assets/img/bannerVideo.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create(){
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

        var cerrar = this.add.sprite(50,50,'close').setScale(0.4).setInteractive();
        cerrar.depth=3;
        cerrar.on('pointerdown', () => {
            cerrar.setTint(0xCF711E)
            window.close();
        })

        var game = this;
        var add = this.add;
        var infoText;
        var watchVideo;
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                infoText = add.text(1100,610, "*Recomendado para estudiantes \nde 9° grado en adelante.", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                infoText.setY(game.height-infoText.displayHeight-10);
                infoText.setX(game.width-infoText.displayWidth-10);

                watchVideo = add.text(100, 70, "Explorar más", { fontFamily: 'Nunito', fontSize: 15, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                watchVideo.visible=false;
            }
        });

        this.physics.add.sprite(this.width/2,this.height/2,'background').setScale(this.width/3334,this.height/2501);
        var play = this.add.image(this.width/2,this.height/1.3, 'start').setScale(0.7);
        this.add.image(this.width/2,this.height/1.3, 'startL').setScale(0.7);
        var info = this.add.image((this.width*95)/100,50, 'info');
        let title = this.add.image(this.width/2,this.height/3.5,'titulo').setScale(0.3,0.4);
        var howTo = this.physics.add.sprite(this.width/2,this.height/2,'howTo').setScale((this.width/1337)-0.2,(this.height/895)-0.1).disableBody(true,true);

        var close = this.physics.add.sprite(howTo.x+howTo.displayWidth/2-70, howTo.y-howTo.displayHeight/2+40,'close').setScale(0.4).setInteractive();
        close.visible=false;
        var watch = this.add.image(info.x, 53, 'watch').setScale(0.1).setInteractive();
        watch.x = info.x - info.displayWidth/2 - watch.displayWidth/2 -10;
        watch.depth = 3;
        watch.visible=false;

        var bannerVideo = this.add.image(this.width/2, (play.y + title.y) / 2+20, 'bannerVideo');
        let topBorder = title.y+title.displayHeight/2-15
        let bottomBorder = play.y - play.displayHeight/2+15
        let scaleFactor = (bottomBorder-topBorder)/191;
        bannerVideo.setScale(scaleFactor-0.05);
        bannerVideo.setInteractive();
        if(this.scale.orientation === "portrait-primary"){
            howTo.setScale(0.7);
            close.x = this.width/2 + howTo.displayWidth/2-75;
            close.y = this.height/2 - howTo.displayHeight/2+75;
            bannerVideo.setScale(0.8)
        }
        let closeBannerVideo = this.physics.add.sprite(bannerVideo.x+bannerVideo.displayWidth/2, bannerVideo.y-bannerVideo.displayHeight/2,'close').setScale(0.4).setInteractive();
        closeBannerVideo.y+=45;
        closeBannerVideo.x-=55;

        info.setInteractive();
        info.on('pointerover', () => {info.setTint(0xCF711E)});
        info.on('pointerout', () => {info.clearTint()});
        info.on('pointerup', () => {info.clearTint()});
        info.on('pointerdown', () => {
            bannerVideo.visible=false;
            closeBannerVideo.visible=false;
            howTo.enableBody(true,this.width/2,this.height/2,true,true);
            close.visible=true;
            //close.enableBody(true,(this.width/2+(1337*((this.width/1337)-0.2))/2.5),(this.height/2-(895*((this.height/895)-0.1))/2.8),true,true);
        });

        close.on('pointerover', () => {close.setTint(0xCF711E)});
        close.on('pointerout', () => {close.clearTint()});
        close.on('pointerup', () => {close.clearTint()});
        close.on('pointerdown', () => {
            watch.visible=false;
            bannerVideo.visible=true;
            closeBannerVideo.visible=true;
            howTo.disableBody(true,true);
            close.disableBody(true,true);
        });


        play.setInteractive();
        play.on('pointerover', () => {play.setTint(0xCF711E)});
        play.on('pointerout', () => {play.clearTint()});
        play.on('pointerdown', () => {playFunction(this)});

        watch.on('pointerover', () => {
          watchVideo.x = watch.x-43;
          watchVideo.visible=true;
        })

        watch.on('pointerdown', () => {
          watch.setTint(0xB60000);
          window.open('https://youtu.be/2LMNV1X7Q80');
          setTimeout( () => {
            watch.clearTint();
          }, 500)
        })

        watch.on('pointerout', () => {
          watchVideo.visible=false;
        })

        bannerVideo.on('pointerdown', () => {
          window.open('https://youtu.be/2LMNV1X7Q80');
          bannerVideo.visible=false;
          closeBannerVideo.visible=false;
          watch.visible=true;
        })

        closeBannerVideo.on('pointerdown', () => {
          closeBannerVideo.setScale(0.45)
          bannerVideo.visible=false;
          closeBannerVideo.visible=false;
          watch.visible=true;

        })

        function playFunction(_this){
            _this.scene.start("introScene");
        }
    }


}
