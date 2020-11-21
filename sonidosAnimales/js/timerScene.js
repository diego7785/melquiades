class timerScene extends Phaser.Scene{
    constructor(){
        super("timerScene");
        this.audio;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.textTimer;
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
        // Loading resources
        this.load.image('background', './assets/fondo.jpg');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create(){
        // Global variables
        var add = this.add;

        var game = this;
        var time = 2;

        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function (){
                game.textTimer = add.text(game.width/2, game.height/2, '3', { fontFamily: 'Nunito', fontSize: 70, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
            }
        });


        // Adding resources
        this.add.image(this.width/2,this.height/2, 'background').setScale(this.width/1667,this.height/1251);
        let inicial = this.add.image(this.width/2, this.height/2, 'inicial').setScale(0.9);
        inicial.visible=false;
        let cerrar = this.add.image(this.width/2+inicial.displayWidth/2-40, this.height/2-inicial.displayHeight/2+30, 'cerrar').setScale(0.3).setInteractive();
        cerrar.visible=false;


        cerrar.on('pointerdown', () => {
          game.scene.start("level"+game.level, {audio: game.audio});
        })

        function regresiveCount(){
            if(time === 0){
                game.textTimer.setX(game.width/2-50)
                game.textTimer.setText('¡YA!');
                setTimeout(()=>{
                    clearInterval(interval);
                    game.textTimer.setText('');
                    inicial.visible=true;
                    cerrar.visible=true;

                },800)
            } else {
                game.textTimer.setText(time.toString());
                time-=1;
            }

        }

        var interval = setInterval(() =>{
            regresiveCount();
        },1000);

    }

}
