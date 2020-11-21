class GameScene15000 extends Phaser.Scene{
    constructor(){
        super("gameScene15000");
        this.width=window.innerWidth;
        this.height=window.innerHeight;
        this.playing = false;
        this.j=-3;
        this.end = false;

    }

    init(data){
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

        this.load.image("15000", "./assets/img/15000.png");
        this.load.image("yesNext15000", "./assets/img/yesNext15000.png");
        this.load.image("noNext15000", "./assets/img/noNext15000.png");

    }

    create(){

        // Global variables
        var fEscalaW = this.width/1360;
        var fEscalaH = this.height/639;
        if(this.scale.orientation === "portrait-primary"){
            fEscalaW=this.width/639;
            fEscalaH=this.height/1360;
        }

        this.escalaG = fEscalaH;

        var game=this;
        var time = 9;
        var interval;

        var add = this.add;

        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                game.textTimer = add.text(game.width/2,40, 'Presta atención al sonido por 10 segundos', { fontFamily: 'Nunito', fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#000000", 2, false, true);
                game.textTimer.x = game.textTimer.x - game.textTimer.displayWidth / 2;
            }
        });

        this.physics.add.sprite(this.width/2, this.height/2, "background").setScale(this.width/2535, this.height/1308);
        var lineCurve = this.physics.add.sprite(this.width/2, this.height/3, "lineCurve").setScale(this.width/2555+0.1,fEscalaH);

        var next = this.physics.add.sprite(this.width/2+(1101*0.6)/2-40*0.7, this.height/2+(600*0.6)/2-45*0.7, "back").setScale(0.7).setInteractive();
        next.visible=false;
        next.rotation = Math.PI;
        var back = this.physics.add.sprite(50,(this.height * 10) / 100, "back").setScale(0.7).setInteractive();

        var infoButton = this.physics.add.sprite((this.width * 95) / 100, (this.height * 10) / 100, "infoButton").setInteractive().setScale(0.4);
        var infoText = this.physics.add.sprite(((this.width * 95) / 100) - 160, ((this.height * 10) / 100) + 160, "infoText").setScale(0.4);
        infoText.depth=20;
        infoText.visible=false;

        var play = this.physics.add.sprite(this.width/2, this.height/1.4,"playText").setScale(0.5);
        var playIcon = this.physics.add.sprite(this.width/2, this.height/1.17,"playIcon").setScale(fEscalaW,fEscalaH).setInteractive();

        var hz = this.physics.add.sprite(this.width/2, this.height/1.7,"15000").setScale(fEscalaW, fEscalaH);

        var modal = this.physics.add.sprite(this.width/2, this.height/2,"modal").setScale(this.width/2555-0.02, this.height/1428-0.02);
        modal.visible=false;
        modal.depth=10;
        var hear = this.physics.add.sprite(this.width/2, this.height/4,"hear");
        hear.visible=false;
        hear.depth=11;
        var yes = this.physics.add.sprite(this.width/3, this.height/1.4,"yes").setScale(0.4).setInteractive();
        yes.visible=false;
        yes.depth=11;
        var no = this.physics.add.sprite(this.width/1.5, this.height/1.4,"no").setScale(0.4).setInteractive();
        no.visible=false;
        no.depth=11;

        var yesNext15000 = this.physics.add.sprite(this.width/2, this.height/1.4,"yesNext15000").setScale(0.3);
        yesNext15000.visible=false;
        yesNext15000.depth=11;
        var noNext15000 = this.physics.add.sprite(this.width/2, this.height/1.4,"noNext15000").setScale(0.3);
        noNext15000.visible=false;
        noNext15000.depth=11;
        var exit = this.physics.add.sprite(this.width/1.2, /*this.width/2+(1179*this.width/2555-0.02)-90*0.3*/this.height/5,"exit").setScale(0.4).setInteractive();
        exit.depth=15;
        exit.visible=false;

        var Hz15000A = this.sound.add("15000Hz");

        exit.on('pointerdown', () => {
            exit.setScale(0.45);
            location.reload();
        })


        // Setting interactions

        infoButton.on('pointerdown', () => {
            infoButton.setScale(0.5);
            infoText.visible=true;
        });

        infoButton.on('pointerup', () => {
            infoButton.setScale(0.4);
            infoText.visible=false;
        })


        yes.on('pointerdown', () => {
            yes.setScale(0.5);
            yesNext15000.visible=true;
            Hz15000A.stop();

            next.depth=11;
            next.rotation = Math.PI;
            next.x=this.width/2+(1179*this.width/2555-0.02)-80*0.7;
            next.y=this.height/1.2
            next.visible = true;
            yes.visible=false;
            no.visible=false;
        })

        yes.on('pointerup', () => {
            yes.setScale(0.4);
        })


        no.on('pointerdown', () => {
            no.setScale(0.5);
            noNext15000.visible=true;
            Hz15000A.stop();
            yes.visible=false;
            no.visible=false;
            exit.visible=true;
        })

        no.on('pointerup', () => {
            no.setScale(0.4);
        })

        playIcon.on('pointerdown', () => {

            presCurve(231072);

            Hz15000A.play({
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });

            setTimeout(() => {
                infoButton.visible=false;
                playIcon.visible=false;
                lineCurve.visible=false;
                play.visible=false;
                hz.visible=false;
                game.textTimer.visible=false;
                this.end=true;
                modal.visible=true;
                yes.y=this.height/1.4;
                no.y=this.height/1.4;
                yes.visible=true;
                no.visible=true;
                hear.visible=true;
                this.playing=false;
                Hz15000A.stop();
                back.depth=40;
                //clearInterval(interval);
            }, 10100);
            /*interval = setInterval(() =>{
                regresiveCount();
            },1000);*/
            playIcon.disableInteractive();
        })

        back.on('pointerdown', () => {
            back.setScale(0.8);
            location.reload();
        })

        back.on('pointerup', () => {
            back.setScale(0.7);
        })

        next.on('pointerdown', () => {
            next.setScale(0.8);
            this.scene.start("gameScene16000");
        })

        next.on('pointerup', () => {
            next.setScale(0.7);
        })

        // Functions
        function presCurve(pres){
            game.playing=true;

            let curveHeightP = game.height/3-(100.5*fEscalaH);
            let curveHeightI = game.height/3+(100.5*fEscalaH);

            if(game.scale.orientation === "portrait-primary"){
                curveHeightP = game.height/6.3-(100.5*fEscalaH);
                curveHeightI = game.height/6.3+(100.5*fEscalaH);
            }

            game.graphics = game.add.graphics();
            var points = [];
            for(var i = -game.width*40; i<game.width; i++){
                if(i%2 === 0){
                    points.push(new Phaser.Math.Vector2(i,curveHeightP))
                } else {
                    points.push(new Phaser.Math.Vector2(i,curveHeightI))
                }
            }

            var curve = new Phaser.Curves.Spline(points);

            game.graphics.clear();

            game.graphics.lineStyle(1, 0x000000, 1);

            curve.draw(game.graphics, pres);

        }

        function regresiveCount(){
            if(time===0){
                game.textTimer.setText("");
                game.textTimer.setText("0");
                //clearInterval(interval)
            } else {
                game.textTimer.setText("");
                game.textTimer.setText(time.toString());
                time-=1;
            }
        }

    }

    update(){
        if(this.end){
            this.graphics.destroy()//this.graphics.setPosition(400000000000,this.height/3-(214*this.escalaG));
        } else if(this.playing){
            this.graphics.setPosition(this.j,this.height/3-(214*this.escalaG));
            this.j+=100;
        }
    }
}
