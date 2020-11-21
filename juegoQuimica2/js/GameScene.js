class GameScene extends Phaser.Scene {
    constructor(){
        super("gameScene");
        this.collide = 0;
        this.color = -1;
        this.pressed = false;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.subir = false;
        this.subirC = 0.00001;
        this.phInfo;
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

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create(){ 

        var rect = new Phaser.Geom.Rectangle(0, 0, 10000, 10000);
        rect.depth = 4;
        var graphicsR = this.add.graphics({ fillStyle: { color: 0xffffff } });
        graphicsR.depth = 60;
        graphicsR.fillRectShape(rect);
        this.anims.create({ key: 'carp', frames: this.anims.generateFrameNumbers('carpa', { start: 0, end: 73 }), frameRate: 20, repeat: -1 });
        
        var carpa = this.add.sprite(this.width/2, this.height/3);
        carpa.depth =70;
        carpa.play('carp');

        var uv = this.add.image(120,this.height-40,'uv').setScale(0.1);
        uv.depth = 60;

        setTimeout(() => {
            rect.visible = false;
            graphicsR.destroy();
            carpa.destroy();
            uv.visible=false;
        }, 2000);

        const PHS = [
            {color: '9211020', ph: 10},//
            {color: '14049794', ph: 1.5},
            {color: '7582521', ph: 2.4},//
            {color: '0', ph: 2.5},//
            {color: '9592072', ph: 5}, //
            {color: '16698977', ph: 5.5},//
            {color: '16777215', ph: 6.5},//
            {color: '2135295', ph: 7},//
            {color: '16717591', ph: 7.4},//
            {color: '3824304', ph: 8},//
            {color: '14082559', ph: 10.5}//
        ];

        var collide = 0;
        var LIQUIDOX = (this.width/2);
        var LIQUIDOY = this.height+80;
        var RESX = 260;
        var RESY = this.height/2+10;
        var listOfSus = [];
        var or = this.scale.orientation;

        var heightList = 0.3*this.height/664;
        var tamEscalado = ((this.height-28)/10)-5;
        if(or==="portrait-primary"){
            heightList = 0.1*this.height/664;
            tamEscalado = 0.32*((this.height-28)/10)-5;
        }
        var game = this;


        var pressed = false;
        var positions = [28];//,70,115, 160, 205, 250, 295, 340, 385, 430, 475];
        
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

        let backgr = this.physics.add.sprite(this.width/2,this.height/2,'background').setScale(this.width/3334,this.height/2501);
        backgr.depth = -2;
        //let backg = this.physics.add.sprite(this.width/2,this.height/2,'background1').setScale(this.width/3334,this.height/2501);
        //backg.depth=-1;
        var back = this.physics.add.sprite(50,50, 'back').setScale(1);
        back.setInteractive();

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

        this.color = 0x8C8C8C;
        
        var liquido= this.physics.add.sprite(LIQUIDOX,LIQUIDOY,'liquido')//.disableBody(true,true);
        liquido.depth = -2;
        liquido.setRotation(Math.PI/2); 
        liquido.setScale(0.2,1.05); 
        liquido.setTint(0x8C8C8C);
        var indicador = this.physics.add.sprite(this.width/2, this.height-175, 'indicador');
        indicador.setScale(0.2,0.5); 
        //indicador.depth = -2;
        var beaker= this.physics.add.sprite(this.width/2,this.height-90,'beaker').setScale(0.21,0.23);
        beaker.depth= 2; 
        var beakerTop = this.physics.add.sprite(this.width/2,this.height-90,'beakerTop').setScale(0.21,0.23);
        
        var sustanciaDesague = this.physics.add.sprite((this.width/2)-100,this.height-20,'sustanciaDesague').setScale(0.4).disableBody(true,true);
        var liquidoDesague = this.physics.add.sprite((this.width/2)-100,this.height-45, 'liquido');
        liquidoDesague.setRotation(Math.PI/2); 
        liquidoDesague.setScale(0.28,0.1); 
        liquidoDesague.disableBody(true,true);
        this.physics.add.sprite((this.width/2)-98,this.height-28,'desague').setScale(0.4);
        
        //sustanciaDesague.depth=-1;
        var llave = this.physics.add.sprite((this.width/2)-110,this.height-36,'llave').setScale(0.2);
        llave.setRotation(Math.PI);
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

        var list = this.physics.add.sprite((this.width*84)/100,positions[0],'list').setScale( heightList);
        list.setInteractive();
        var arrow = this.physics.add.sprite((this.width*84)/100+(959*heightList)/2-(159*heightList)/2-10, positions[0], 'arrow').setScale(heightList);
        arrow.depth = 6;

        var sustanciaGotero = this.physics.add.sprite(this.width/2, this.height/5, 'liquidoG').setScale(286/this.width+0.3, 93/this.height+0.3)
        sustanciaGotero.visible = false;
        sustanciaGotero.setTint(0x8C8C8C);
        var sustancia = this.physics.add.sprite(this.width/2+1.5,(gotero.y+beaker.y)/2+170, 'liquido')
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
        sustancia.setTint(0x8C8C8C);

        // Setting interactions

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
            liquido.body.velocity.y=250; 
            
        });

        llave.on('pointerup', () => {
            llave.disableInteractive();
        });

        back.on('pointerover', () => {
            back.setTint(0xB7651D);
        })

        back.on('pointerout', () => {
            back.clearTint();
        })

        back.on('pointerdown', () => {
            location.reload();
        });

        
        list.on('pointerdown', () => {
            this.phInfo.setText('');
            list.disableBody(true,true);
            pressed = true;
            dropdown();            
        });
        
        goteroButton.on('pointerdown', () => {
            this.subir = true;
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
            llave.setInteractive();
            
        });

        goteroButton.on('pointerup', () => {
            goteroButton.clearTint();
            sustancia.visible = false; //.disableBody(true,true);
            sustanciaGotero.visible = false;//.disableBody(true, true);
            liquido.body.velocity.y=0;
            this.collide=1;
            this.goteroButton = false;
            this.subir = false;
        });

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
            if(collide === 2){
                resultado.x = RESX;
                resultado.y = RESY;
                game.phInfo.setText('');
                collide = 0;
            }
        }); 

        
        // Functions
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
                    //}
                                       
                } else if(game.collide == 0 ){
                    liquido.clearTint();
                    liquido.enableBody(true,LIQUIDOX,LIQUIDOY,true,true);
                    liquido.body.velocity.y=-50;
                    liquido.setTint(game.color);
                }
                
            }
            
        }

        function showPh(obj1, obj2){
            sensor.body.velocity.y=0;
            collide = 1;
            let comparison = (e) => e.color == obj1.scene.color;
            let ph = PHS.find(comparison);
            if(ph.ph === 8){
                resultado.y = game.height/2 - 10;
                game.phInfo.y = game.height/2 - 10;
                game.phInfo.setText(ph.ph);
            } else if(ph.ph === 10){
                resultado.y = game.height/2 - 50;
                game.phInfo.y = game.height/2 - 50;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 10.5){
                resultado.y = game.height/2 - 60;
                game.phInfo.y = game.height/2 - 60;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 7.4){
                resultado.y = game.height/2 - 5;
                game.phInfo.y = game.height/2 - 5;
                game.phInfo.setText(ph.ph);
            
            } else if(ph.ph === 5){
                resultado.y = game.height/2 + 50;
                game.phInfo.y = game.height/2 + 50;
                game.phInfo.setText(ph.ph);

            } else if(ph.ph === 6.5){
                resultado.y = game.height/2 + 20;
                game.phInfo.y = game.height/2 + 20;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 5.5){
                resultado.y = game.height/2 + 40;
                game.phInfo.y = game.height/2 + 40;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 2.5){
                resultado.y = game.height/2 + 97;
                game.phInfo.y = game.height/2 + 97;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 2.4){
                resultado.y = game.height/2 + 102;
                game.phInfo.y = game.height/2 + 102;
                game.phInfo.setText(ph.ph);
                
            } else if(ph.ph === 1.5){
                resultado.y = game.height/2 + 115;
                game.phInfo.y = game.height/2 + 115;
                game.phInfo.setText(ph.ph);
                
            }
            else if (ph.ph === 7) {
                resultado.y = RESY;
                game.phInfo.y = RESY;
                game.phInfo.setText('7');
            }
            

            if(resultado.y != 400){
                collide = 2;
            }  

        }

        function rePosicionar(){
            collide = 0;
            resultado.x = RESX;
            resultado.y = RESY;
            sensor.x = game.width/2-200;
            sensor.y = game.height-150;
            liquido.x = LIQUIDOX;
            liquido.y = LIQUIDOY;
            game.phInfo.setText('')
        }

        function dropdown(){
            rePosicionar();
            listOfSus.forEach((sus,i) => {
                sus.icon.enableBody(true,sus.icon.x, sus.icon.y, true,true).setInteractive();
                sus.icon.on('pointerdown', ()=>{
                    if(pressed){
                        sus.icon.y=positions[0];
                        goteroButton.setInteractive();
                        sustancia.setTint(sus.color);
                        sustanciaGotero.setTint(sus.color);
                        game.color = sus.color;
                        rePosicionar();
                        pressed = false;
                        listOfSus.forEach((susi,it) => {
                            if(i!=it){
                                susi.icon.depth = -4;
                            }
                        })
                    } else{
                        pressed = true;
                        listOfSus.forEach((susi,i) => {
                            susi.icon.y = positions[i];
                            susi.icon.depth=2;
                        })
                    } 
                      
                })
            });

        }

        // Collisions
        this.physics.add.overlap(liquido,indicador,() => {
            liquido.body.velocity.y=0; 
            this.collide=2; 
            sustancia.disableBody(true,true); 
            sustanciaGotero.disableBody(true,true);
            this.subir = false;
        },null,this);
        this.physics.add.collider(liquido,sensor, showPh, () => {
            if(collide === 0){
                return true
            } else if(collide != 0){
                return false
            }
        },this);
    }

}