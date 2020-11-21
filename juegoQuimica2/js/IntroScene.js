class IntroScene extends Phaser.Scene{
    constructor(){
        super("introScene");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.color;
        this.phInfo;
        this.subir = false;
        this.collide = 0;
    }

    init (){
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

        this.load.image("bannerIntro", "./assets/img/bannerIntro.png");
        this.load.image("bannerSus", "./assets/img/bannerSustancias.png");
        this.load.image("bannerJugo", "./assets/img/bannerJugoLimon.png");
        this.load.image("bannerGotero", "./assets/img/bannerPressGotero.png");
        this.load.image("bannerDrag", "./assets/img/bannerDragSensor.png");
        this.load.image("bannerPh", "./assets/img/bannerPhJugo.png");
        this.load.image("bannerLlave", "./assets/img/bannerLlave.png");
        this.load.image("bannerAtras", "./assets/img/bannerAtras.png");


        this.load.image('beaker', './assets/img/beakerPrueba1.png');
        this.load.image('desague', './assets/img/desague1.png');
        this.load.image('beakerTop', './assets/img/beakerTop.png');
        this.load.image('liquido', './assets/img/liquido.png');
        this.load.image('liquidoG', './assets/img/liquidoGotero.png');
        this.load.image('indicador', './assets/img/indicador.png');
        this.load.image('sustanciaDesague', './assets/img/sustanciaDesague.png');

        this.load.image('gotero', './assets/img/Gotero.png');
        this.load.image('goteroButton', './assets/img/goteroButton.png');
        this.load.image('llave', './assets/img/llave.png');

        this.load.image('sensor', './assets/img/sensor.png');
        this.load.image('escala', './assets/img/escala_ph.png');
        this.load.image('resultado', './assets/img/resultado.png');
        this.load.image('next', './assets/img/next.png');
        this.load.image('omitir', './assets/img/omitir.png');
        this.load.image('end', './assets/img/finalizar.png');

        this.load.image('back', './assets/img/back.png');
        this.load.image('list', './assets/img/list.png');
        this.load.image('list1', './assets/img/list1.png');
        this.load.image('list2', './assets/img/list2.png');
        this.load.image('list3', './assets/img/list3.png');
        this.load.image('list4', './assets/img/list4.png');
        this.load.image('list5', './assets/img/list5.png');
        this.load.image('list6', './assets/img/list6.png');
        this.load.image('list7', './assets/img/list7.png');
        this.load.image('list8', './assets/img/list8.png');
        this.load.image('list9', './assets/img/list9.png');
        this.load.image('list10', './assets/img/list10.png');

        this.load.image('arrow', './assets/img/arrow.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create(){

        // Global variables
        var RESX = 260;
        var RESY = this.height/2+10;

        var pressed = false;
        var positions = [30];//,70,115, 160, 205, 250, 295, 340, 385, 430, 475];    
        var listOfSus = [];
        var heightList = 0.3*this.height/664//0.3 //(((this.height-28)/10)-5)/180;
        var tamEscalado = ((this.height-28)/10)-5;
        var nextCounter = 0;
        var LIQUIDOX = (this.width/2);
        var LIQUIDOY = this.height+80;
        var game = this;
        var collide = 0;
        var firstTimePh=true;

        var or = this.scale.orientation;
        if(or==="portrait-primary"){
            heightList = 0.1*this.height/664;
            tamEscalado = 0.32*((this.height-28)/10)-5;
        }
        
        for(var i = 1; i < 12; i++){
            positions[i] = positions[i-1]+tamEscalado;
        }

        var add = this.add;
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function ()
            {
                game.phInfo = add.text(RESX-12, 0, '', { fontFamily: 'Nunito', fontSize: 20, color: '#000000' })//.setShadow(2, 2, "#333333", 2, false, true);
            }
        });

        this.physics.add.sprite(this.width/2,this.height/2,'background').setScale(this.width/3334,this.height/2501);
        var bannerInfo = this.add.image(this.width/2,this.height/2,'bannerIntro').setScale((this.width-200)/2331);
        bannerInfo.depth = 10;
        var next = this.physics.add.sprite(this.width-200, this.height/1.53, 'next').setScale(0.5).setInteractive();
        next.depth = 24;
        var beaker= this.physics.add.sprite(this.width/2,this.height-90,'beaker').setScale(0.21,0.23);
        beaker.depth= 2; 
        var beakerTop = this.physics.add.sprite(this.width/2,this.height-90,'beakerTop').setScale(0.21,0.23);

        var desague = this.physics.add.sprite((this.width/2)-98,this.height-28,'desague').setScale(0.4);
        desague.depth=2;

        var llave = this.physics.add.sprite((this.width/2)-110,this.height-36,'llave').setScale(0.2);
        llave.setRotation(Math.PI);
        llave.depth=3;
        var sustanciaDesague = this.physics.add.sprite((this.width/2)-100,this.height-20,'sustanciaDesague').setScale(0.4).disableBody(true,true);
        var liquidoDesague = this.physics.add.sprite((this.width/2)-100,this.height-45, 'liquido');
        liquidoDesague.setRotation(Math.PI/2); 
        liquidoDesague.setScale(0.28,0.1); 
        liquidoDesague.disableBody(true,true);

        var escala = this.physics.add.sprite(170,this.height/2,'escala')
        .setScale(0.45, 0.6);
        var sensor = this.physics.add.image(this.width/2-200,this.height-150,'sensor').setInteractive()
        .setScale(0.5);
        sensor.depth=3;
        var resultado = this.physics.add.sprite(RESX,RESY,'resultado').setScale(0.6);



        var gotero = this.physics.add.sprite(this.width/2, this.height/5, 'gotero').setScale(286/this.width+0.3, 93/this.height+0.3);
        gotero.depth=2;
        var goteroButton = this.physics.add.sprite(this.width/2, this.height/5, 'goteroButton').setScale(286/this.width+0.3, 93/this.height+0.3).setInteractive();
        goteroButton.depth=3;

        var back = this.physics.add.sprite(50,50, 'back').setScale(1);
        back.setInteractive();
        var list = this.physics.add.sprite((this.width*84)/100,positions[0],'list').setScale( heightList);
        
        var arrow = this.physics.add.sprite((this.width*84)/100+(959*heightList)/2-(159*heightList)/2-10, positions[0], 'arrow').setScale(heightList);
        arrow.depth = 6;
        var omitir = this.physics.add.sprite((this.width*84)/100-(959*heightList)/2-(183*0.6)-10, 30,'omitir').setScale(0.6).setInteractive();

        var bannerSus = this.physics.add.sprite(this.width/1.5, 115,'bannerSus').setScale(0.5);
        bannerSus.visible=false;
        bannerSus.depth=20;
        var bannerJugo = this.physics.add.sprite(this.width/1.6, positions[3]+10,'bannerJugo').setScale(0.5);
        bannerJugo.visible=false;
        bannerJugo.depth=20;
        var bannerGotero = this.physics.add.sprite(this.width/1.6, this.height/4.9,'bannerGotero').setScale(0.5);
        bannerGotero.depth=20;
        bannerGotero.visible=false;
        var bannerDrag = this.physics.add.sprite(this.width/2-50, this.height-150,'bannerDrag').setScale(0.5);
        bannerDrag.depth=25;
        bannerDrag.visible=false;
        var bannerPh = this.physics.add.sprite(RESX+150, game.height/2 + 168,'bannerPh').setScale(0.5);
        bannerPh.depth = 25;
        bannerPh.visible=false;
        var bannerLlave = this.physics.add.sprite((this.width/2)-230,this.height-110,'bannerLlave').setScale(0.5);
        bannerLlave.depth=25;
        bannerLlave.visible=false;
        var bannerAtras = this.physics.add.sprite(160,110,'bannerAtras').setScale(0.4);
        bannerAtras.visible=false;
        var end = this.physics.add.sprite(160,160,'end').setScale(0.4).setInteractive();
        end.visible=false;

         // Leche de Magnesia
         listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[0],'list').setScale(heightList).disableBody(true,true),
            color: 0x8C8C8C
        })

        // Jugo gástrico
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[1],'list1').setScale(heightList).disableBody(true,true),
            color: 0xD66202
        })
        
        // Jugo de limon
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[2],'list2').setScale(heightList).disableBody(true,true),
            color: 0x73B339
        })

        // Refresco de cola
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[3],'list3').setScale(heightList).disableBody(true,true),
            color: 0x000000
        })

        // Cerveza
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[4],'list4').setScale(heightList).disableBody(true,true),
            color: 0x925D08
        })

        // Piel humana
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[5],'list5').setScale(heightList).disableBody(true,true),
            color: 0xFECE61
        })

        // Leche
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[6],'list6').setScale(heightList).disableBody(true,true),
            color: 0xFFFFFF
        })

        // Agua pura
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[7],'list7').setScale(heightList).disableBody(true,true),
            color: 0x2094FF
        })

        // Sangre

        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[8],'list8').setScale(heightList).disableBody(true,true),
            color: 0xFF1717
        })

        // Agua de mar
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[9],'list9').setScale(heightList).disableBody(true,true),
            color: 0x3A5AB0
        })

        // Detergente
        listOfSus.push({
            icon: this.physics.add.sprite((this.width*84)/100,positions[10],'list10').setScale(heightList).disableBody(true,true),
            color: 0xD6E1FF
        })

        this.color = 0x73B339;
        var liquido = this.physics.add.sprite(LIQUIDOX,LIQUIDOY,'liquido')//.disableBody(true,true);
        liquido.depth = 1;
        liquido.setRotation(Math.PI/2); 
        liquido.setScale(0.2,1.05);
        liquido.setTint(0x73B339);
        var sustanciaGotero = this.physics.add.sprite(this.width/2, this.height/5, 'liquidoG').setScale(286/this.width+0.3, 93/this.height+0.3)//.disableBody(true,true);
        sustanciaGotero.visible = false;
        sustanciaGotero.setTint(0x73B339);
        var sustancia = this.physics.add.sprite(this.width/2+1.5,(gotero.y+beaker.y)/2+170, 'liquido')//.disableBody(true,true);
        sustancia.visible = false;
        sustancia.setRotation(Math.PI/2); 
        let lenBeGo = this.height-222 - this.height/5;
        let fescala = (lenBeGo/700)+0.3;
        if(or==="portrait-primary"){
            lenBeGo = this.height-202 - this.height/5;
            fescala = (lenBeGo/830)+0.3;
        }
        sustancia.setScale(fescala,0.067);
        sustancia.depth=1;
        sustancia.setTint(0x73B339);
        var indicador = this.physics.add.sprite(this.width/2, this.height-175, 'indicador');
        indicador.setScale(0.2,0.5); 
        indicador.depth=-1;


        // Setting interactions
        end.on('pointerdown', () =>{
            this.scene.start("gameScene");
        })

        llave.on('pointerdown', () => {
            llave.x = (this.width/2)-105;
            llave.y = this.height-30;
            llave.setRotation(Math.PI/2);
            sustanciaDesague.setTint(this.color);
            sustanciaDesague.enableBody(true, (this.width/2)-95,this.height-30, true, true);
            liquidoDesague.setTint(this.color);
            liquidoDesague.enableBody(true,(this.width/2)-111,this.height+88,true,true);

            //liquido.x = LIQUIDOX;
            //liquido.y = LIQUIDOY;
            resultado.x = RESX;
            resultado.y = RESY;
            sensor.x = this.width/2-200;
            sensor.y = this.height-150;
            this.phInfo.setText('')
            collide = 0;
            setTimeout(() =>{
                liquido.clearTint();
                llave.x = (this.width/2)-110;
                llave.y = this.height-36;
                llave.setRotation(-1*Math.PI);
                sustanciaDesague.clearTint();
                sustanciaDesague.disableBody(true,true);
                liquidoDesague.clearTint();
                liquidoDesague.disableBody(true,true);
                setTimeout(() => {
                    liquido.x = LIQUIDOX;
                    liquido.y = LIQUIDOY;
                    liquido.body.velocity.y = 0;
                }, 100);
            }, 500);
            bannerLlave.visible=false;  
            
        });

        llave.on('pointerup', () => {
            llave.disableInteractive();
            goteroButton.disableInteractive();
            bannerLlave.visible=false;
            this.physics.world.removeCollider(collPh);
            liquido.body.velocity.y=250; 
            bannerLlave.visible=false;
            bannerAtras.visible=true;
            setTimeout(()=>{
                end.visible=true;
                bannerLlave.visible=false;  
            },1000)
        });

        goteroButton.on('pointerdown', () => {
            bannerGotero.visible=false;
            this.subir = true;
            // On start
            if(this.collide === 0){
                goteroButton.setTint(0xB7651D);
                sustancia.visible = true;
                sustanciaGotero.visible = true;
                subirLiquido(2);
                this.pressed = true;
            } else if(this.collide == 2){
                liquido.body.velocity.y=0;
                this.pressed = true;

            } else {
                goteroButton.setTint(0xB7651D);
                sustancia.visible = true;
                sustanciaGotero.visible = true;
                subirLiquido(2);
                this.pressed = true;
            }
            setTimeout(() => {
                bannerDrag.visible=true;
            }, 300)
        })

        goteroButton.on('pointerup', () =>{
            goteroButton.clearTint();
            sustancia.visible = false; //.disableBody(true,true);
            sustanciaGotero.visible = false;//.disableBody(true, true);
            liquido.body.velocity.y=0;
            this.collide=1;
            this.goteroButton = false;
            this.subir = false;
        })

        list.on('pointerdown', () => {
            game.phInfo.setText(' ');
            list.disableBody(true,true);
            pressed = true;
            bannerJugo.visible=true;
            next.y=positions[4]+20;
            next.x=this.width/1.6;
            dropdown();   
        });

        omitir.on('pointerover', () =>{
            omitir.setScale(0.7);
        })

        omitir.on('pointerdown', () =>{
            this.scene.start("gameScene");
        })

        omitir.on('pointerout', () =>{
            omitir.setScale(0.6);
        })

        next.on('pointerdown', () => {

            if(nextCounter===0){
                bannerInfo.visible=false;
                bannerSus.visible=true;
                /*next.x=this.width/1.5;
                next.y = 190;*/
                next.visible=false;
                list.setInteractive();
            } 

            nextCounter++;
        })

        sensor.on('pointerover', () => {
            sensor.setTint(0x343333);
        })

        sensor.on('pointerdown', () => {
            sensor.setTint(0x343333);
        })

        sensor.on('pointerup', () => {
            sensor.clearTint();
        })

        sensor.on('pointerout', () => {
            sensor.clearTint();
        })

        this.input.setDraggable(sensor);

        // Setting drag & drop
        this.input.dragTimeThreshold = 10;


        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0x343333);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
            if(this.collide === 2){
                resultado.x = RESX;
                resultado.y = RESY;
                game.phInfo.setText('');
                collide = 0;
            }
        }); 

        // Functions

        function dropdown(){
            listOfSus.forEach((sus,i) => {
                sus.icon.enableBody(true,sus.icon.x, sus.icon.y, true,true).setInteractive();
                if(i===2){
                    sus.icon.on('pointerdown', ()=>{
                        if(pressed){
                            sus.icon.y=positions[0];
                            goteroButton.setInteractive();
                            //sustancia.setTint(sus.color);
                            //sustanciaGotero.setTint(sus.color);
                            game.color = sus.color;
                            //rePosicionar();
                            pressed = false;
                            listOfSus.forEach((susi,it) => {
                                if(i!=it){
                                    susi.icon.depth = -4;
                                }
                            })
                            bannerJugo.visible=false;
                            bannerGotero.visible=true;
                            goteroButton.setInteractive();
                        } else{
                            sus.icon.disableInteractive();
                        } 
                          
                    })
                    
                }
                
            });
            bannerSus.visible=false;
        }

        function subirLiquido(actuador){
            //game.beakerLiquido.setTint(game.color);
            game.subir = true;
            if(actuador === 1){
                if(game.collide == 1){
                    liquido.body.velocity.y=-150; 
                    //water.enableBody(true,362,414,true,true);
                } else if(game.collide == 0 ){
                    liquido.clearTint();
                    liquido.enableBody(true,LIQUIDOX,LIQUIDOY,true,true);
                    liquido.body.velocity.y=-150
                    liquido.setTint(game.color);
                    //water.enableBody(true,362,414,true,true);
                }
            } else{
                if(game.collide == 1){
                        liquido.body.velocity.y=-50; 
                        liquido.setTint(game.color);
                                       
                } else if(game.collide == 0 ){
                    liquido.clearTint();
                    liquido.enableBody(true,LIQUIDOX,LIQUIDOY,true,true);
                    liquido.body.velocity.y=-50;
                    liquido.setTint(game.color);
                }
                
            }
            
        }

        function showPh(obj1,obj2){
            sensor.body.velocity.y=0;
            game.collide = 1;
            resultado.y = game.height/2 + 102;
            game.phInfo.y = game.height/2 + 102;
            game.phInfo.setText('2.4');
            bannerDrag.visible=false;
            if(firstTimePh){
                bannerPh.visible=true;
                firstTimePh=false;
                setTimeout(() => {
                    bannerPh.visible=false;
                    
                        bannerLlave.visible=true; 
                       
                   
                }, 3000);
                //bannerLlave.visible=false;  
                llave.setInteractive();
            }
            
        }


        // Collisions
        this.physics.add.overlap(liquido,indicador,() => {
            liquido.body.velocity.y=0; 
            this.collide=2; 
            sustancia.disableBody(true,true); 
            sustanciaGotero.disableBody(true,true);
            this.subir = false;
        },null,this);
        var collPh = this.physics.add.collider(liquido,sensor, showPh, () => {
            if(collide === 0){
                return true
            } else if(collide != 0){
                return false
            }
        },this);

    }
}