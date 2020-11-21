class TutoScene extends Phaser.Scene {
    constructor(){
        super("tutoScene");
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.cantClics;
        this.createA = 0;
        this.formula;
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

        this.load.image("background", "./assets/img/background.jpg");
        this.load.image('bannerInfo', './assets/img/bannerInfo.png');
        this.load.image('banner', './assets/img//banner.png');
        this.load.image('build', './assets/img/build.png');
        this.load.image('formCom', './assets/img/formulasComp.png');
        this.load.image('formExp', './assets/img/formulasExp.png')
        this.load.image('back', './assets/img/back.png');
        this.load.image('reload', './assets/img/reload.png');
        this.load.image('infoAM', './assets/img/info.png');
        this.load.image('next', './assets/img/next.png');
        this.load.image('informulas', './assets/img/informulas.png');
        this.load.image('bannerCant', './assets/img/bannerCant.png');
        this.load.image('bannerNitro', './assets/img/textDialogueNitrogeno.png');
        this.load.image('createN2', './assets/img/createN2.png');
        this.load.image('dinitrogeno', './assets/img/dinitrogeno.png');
        this.load.image('dinitrogenoDialogue', './assets/img/textDialogueNitrogenoMolecular.png');
        this.load.image('startOver', './assets/img/startOver.png');
        this.load.image('backBanner', './assets/img/backBanner.png');
        this.load.image('asiSeCrea', './assets/img/asiSeCrea.png');
        this.load.image('omitir', './assets/img/omitir.png');

        this.load.image('OAhidrogen', './assets/img/hidrogenIcon.png');
        this.load.image('OAoxygen', './assets/img/oxygenIcon.png');
        this.load.image('OAnitrogeno', './assets/img/nitrogenIcon.png');
        this.load.image('OAxenon', './assets/img/xenonIcon.png');
        this.load.image('Anitrogeno', './assets/img/nitrogen.png');
        this.load.image('ourAtoms', './assets/img/ourAtomsBanner.png');
        this.load.image('dobleClic', './assets/img/dobleClic.png');
        this.load.image('createMol', './assets/img/createMol.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');


    }

    create(){

        var game = this;

        // Global variables

        var nextCounter = 0;
        var ourAtomsArr = [];
        var game = this;
        var add = this.add;
        var nitroClics = 0;


        // Text with Nunito font
        WebFont.load({
            custom: {
                families: [ 'Nunito' ]
            },
            active: function ()
            {
                game.cantClics = add.text(game.width-160, game.height-70, '0', { fontFamily: 'Nunito', fontSize: 50, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                game.cantClics.setVisible(false);
            }
        });

        // Resources

        var background = this.add.image(this.width/2,this.height/2,'background').setScale(this.width/2000,this.height/2000);
        background.depth = -2;

        var bannerInfo = this.add.image(this.width/2,this.height/2,'bannerInfo').setScale((this.width-200)/2331);
        this.add.image(this.width/2,this.height+120, 'banner').setScale(3);

        this.physics.add.sprite(this.width/4, this.height-40, 'OAhidrogen').setScale(0.4);
        this.physics.add.sprite(this.width/2.5,this.height-40, 'OAoxygen').setScale(0.4);
        var nitrogenoO = this.physics.add.sprite(this.width/1.8,this.height-40, 'OAnitrogeno').setScale(0.4);
        this.physics.add.sprite(this.width/1.4,this.height-40, 'OAxenon').setScale(0.4);

        var build = this.physics.add.sprite(this.width/2, 50, 'build').setScale(0.3);
        build.depth = 4;
        var next = this.physics.add.sprite(this.width-200, this.height/1.53, 'next').setScale(0.5).setInteractive();
        next.depth = 4;

        var formComp = this.physics.add.sprite(70,100,'formCom').setScale(0.6);
        var formExp = this.physics.add.sprite(70,this.height/2, 'formExp').setScale((this.height-180)/887);
        formExp.visible=false;
        if(this.height>this.width){
            formExp = this.physics.add.sprite(120,this.height/2.4, 'formExp').setScale((this.height-650)/887);
            formExp.x = formExp.displayWidth / 2 + 10;
            formExp.visible=false;
        }
        var back = this.physics.add.sprite(this.width/20,50, 'back');
        back.setScale(0.7);
        var reload = this.physics.add.sprite(this.width-100,52,'reload');
        reload.setScale(0.5);

        this.physics.add.sprite(this.width-50,52,'infoAM').setScale(0.4).setInteractive();

        var informulas = this.physics.add.sprite(250,210,'informulas').setScale(0.6);
        informulas.visible = false;

        var ourAtoms = this.physics.add.sprite(this.width/1.6,this.height-140,'ourAtoms').setScale(0.4);
        ourAtoms.visible=false;

        var bannerCant = this.physics.add.sprite(0,this.height-40,'bannerCant').setScale(0.6);
        bannerCant.visible=false;

        var nitrogenoBanner = this.physics.add.sprite(this.width-145, 130, 'bannerNitro');
        nitrogenoBanner.visible=false;

        var dobleClic = this.physics.add.sprite(this.width/1.55,this.height-145, 'dobleClic').setScale(0.4);
        dobleClic.visible=false;

        var createN2 = this.physics.add.sprite(200,this.height/2-70,'createN2').setScale(0.4);
        createN2.x = formExp.x + formExp.displayWidth/2+createN2.displayWidth/2+3//displayWidth+createN2.displayWidth/2;
        createN2.visible=false;

        var createMol = this.physics.add.sprite(this.width/2+100, 110,'createMol').setScale(0.4);
        createMol.visible=false;

        var dinitrogeno = this.physics.add.sprite(this.width/2, this.height/2, 'dinitrogeno').setInteractive();
        dinitrogeno.visible=false;

        var dinitrogenoDialogue = this.physics.add.sprite(this.width-273, 217,'dinitrogenoDialogue').setScale(0.6)
        dinitrogenoDialogue.visible=false;

        var startOver = this.physics.add.sprite(this.width-220,98,'startOver').setScale(0.4)
        startOver.visible = false;

        var backBanner = this.physics.add.sprite(this.width/20+110,70, 'backBanner').setScale(0.6);
        backBanner.visible=false;

        var asiSeCrea = this.physics.add.sprite(this.width/2-170, this.height/2-80, 'asiSeCrea').setScale(0.6);
        asiSeCrea.visible = false;

        var omitir = this.physics.add.sprite(this.width-200,52,'omitir').setScale(0.6).setInteractive();

        // Setting interactions

        formComp.on('pointerdown', () => {
            next.x = formExp.displayWidth + next.displayWidth+10;

            formComp.visible=false;
            formExp.visible=true;
            informulas.visible=false;
            formComp.disableInteractive(true,true)
            formExp.setInteractive();
        })

        formExp.on('pointerdown', () => {
            formExp.visible=false;
            formComp.visible=true;
            formExp.disableInteractive(true,true)
        })

        nitrogenoO.on('pointerover', () => {
            nitrogenoBanner.visible=true;
        })

        nitrogenoO.on('pointerdown', () => {
            if(nextCounter===4){
                nitroClics += 1;
                if(nitroClics===2){
                    game.cantClics.setText('2');

                    nitrogenoO.disableInteractive();
                    createN2.visible=false;
                    createMol.visible=true;
                    build.setInteractive();
                    next.x = this.width/2+100;
                    next.y = 170;
                } else {
                    ourAtoms.visible=false;
                    dobleClic.visible=false;
                    nitrogenoO.setScale(0.42);
                    let atomC = this.physics.add.sprite(nitrogenoO.x, nitrogenoO.y-130,'Anitrogeno');
                    nitrogenoBanner.visible=true;
                    game.cantClics.setX(nitrogenoO.x+55);
                    game.createA += 1;
                    bannerCant.x=nitrogenoO.x+70;
                    game.cantClics.setVisible(true);
                    game.cantClics.setText(this.createA.toString());

                    bannerCant.visible=true;
                    ourAtomsArr.push(atomC);
                }
            } else{
                ourAtoms.visible=false;
                dobleClic.visible=false;
                nitrogenoO.setScale(0.42);
                let atomC = this.physics.add.sprite(nitrogenoO.x, nitrogenoO.y-110,'Anitrogeno');
                nitrogenoBanner.visible=true;
                game.cantClics.setX(nitrogenoO.x+55);
                game.createA += 1;
                bannerCant.x=nitrogenoO.x+70;
                game.cantClics.setVisible(true);
                game.cantClics.setText(this.createA.toString());

                bannerCant.visible=true;
                ourAtomsArr.push(atomC);
            }

        })

        nitrogenoO.on('pointerup', () =>{
            nitrogenoO.setScale(0.4);
            nitrogenoBanner.visible=false;
        })

        nitrogenoO.on('pointerout', () => {
            nitrogenoBanner.visible=false;
        })

        build.on('pointerdown', () => {
            ourAtomsArr.forEach(atom => {atom.disableBody(true,true)});
            createMol.visible=false;
            build.setTint(0x343333);
            dinitrogeno.visible=true;
            bannerCant.visible=false;
            game.cantClics.setVisible(false);
            asiSeCrea.visible=true;
            next.x = this.width/2-170;
            next.y = this.height/2-160;
        })

        build.on('pointerup', () => {
            build.clearTint();
        })

        dinitrogeno.on('pointerover', () => {
            dinitrogenoDialogue.visible=true;
        });

        dinitrogeno.on('pointerdown', () => {
            dinitrogenoDialogue.visible=true;
        });

        dinitrogeno.on('pointerout', () => {
            dinitrogenoDialogue.visible=false;

        });

        dinitrogeno.on('pointerup', () =>{
            dinitrogenoDialogue.visible=false;

        });

        this.input.setDraggable(dinitrogeno);

        this.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
            asiSeCrea.visible=false;
            gameObject.setTint(0x343333);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setTint(0x343333);
            gameObject.x = pointer.x;
            gameObject.y = pointer.y;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            dinitrogenoDialogue.visible=false;
            gameObject.clearTint();
        });

        omitir.on('pointerover', () => {
            omitir.setScale(0.7);
        })

        omitir.on('pointerdown', () =>{
            omitir.setTint(0x343333);
            this.scene.start("gameScene");
        })

        omitir.on('pointerout', () => {
            omitir.setScale(0.6);
        })

        next.on('pointerdown', () => {
            if(nextCounter===0){
                bannerInfo.visible = false;
                backBanner.visible=true;
                next.x = backBanner.x+backBanner.displayWidth/2+next.displayWidth/2+3;//this.width/20+110;
                next.y= backBanner.y//130;
            } else if(nextCounter===1){
                backBanner.visible=false;
                informulas.visible=true;
                formComp.setInteractive();
                next.x = 250;
                next.y= 340;
            } else if(nextCounter===2){
                formComp.visible=false;
                formExp.visible=true;
                if(this.scale.orientation === 'portrait-primary'){
                    createN2.x=formExp.x+formExp.displayWidth/2+createN2.displayWidth/2+10;
                    createN2.y = formExp.displayHeight/2-createN2.displayHeight/2;
                    next.x = createN2.x;
                    next.y= createN2.y + createN2.displayHeight/2+next.displayHeight/2+4;
                } else {
                    next.x = createN2.x;
                    next.y= this.height/2-5;
                }

                createN2.visible=true;
                informulas.visible=false;

            } else if(nextCounter===3){
                formExp.visible=false;
                formComp.visible=true;
                formComp.disableInteractive(true,true)
                createN2.visible=false;
                createMol.visible=false;
                dobleClic.visible=true;
                nitrogenoO.setInteractive();
                next.x = this.width/1.55;
                next.y= this.height-235;
            } else if(nextCounter===4){
                asiSeCrea.visible=false;
                dobleClic.visible=false;
                bannerCant.visible=false;
                dinitrogeno.visible = false;
                game.cantClics.setVisible(false);
                game.createA = 0;
                formComp.visible=true;
                formExp.visible=false;
                ourAtomsArr.forEach(atom => {atom.disableBody(true,true)});
                startOver.visible=true;
                next.x = this.width-220;
                next.y= 150;
            }else{
                this.scene.start("gameScene");
            }
            nextCounter += 1;
        })


    }
}
