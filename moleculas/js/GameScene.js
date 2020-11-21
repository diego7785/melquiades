class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.name = "";
        this.once = 0;
        this.rotate = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.initialPos = [];
        this.createA = 0;
        this.cantClics;
        this.formula;
    }

    init() {
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
        this.load.image('background', './assets/img/background.jpg');
        this.load.image('banner', './assets/img//banner.png');
        this.load.image('infoAM', './assets/img/info.png');

        this.load.image('dialogueHidrogeno', './assets/img/textDialogueHidrogeno.png');
        this.load.image('dialogueOxigeno', './assets/img/textDialogueOxigeno.png');
        this.load.image('dialogueNitrogeno', './assets/img/textDialogueNitrogeno.png');
        this.load.image('dialogueXenon', './assets/img/textDialogueXenon.png');
        this.load.image('dialogueXenonMol', './assets/img/textDialogueXenonMol.png');
        this.load.image('2', './assets/img/textDialogueHidrogenoMolecular.png');
        this.load.image('20', './assets/img/textDialogueOxigenoMolecular.png')
        this.load.image('200', './assets/img/textDialogueNitrogenoMolecular.png');
        this.load.image('110', './assets/img/textDialogueMonoxidoNitrogeno.png');
        this.load.image('30', './assets/img/textDialogueOzono.png');
        this.load.image('12', './assets/img/textDialogueAgua.png');
        this.load.image('22', './assets/img/textDialoguePeroxidoHidrogeno.png');
        this.load.image('103', './assets/img/textDialogueAmoniaco.png');
        this.load.image('202', './assets/img/textDialogueDiaceno.png');
        this.load.image('210', './assets/img/textDialogueMonoxidoDinitrogeno.png');
        this.load.image('204', './assets/img/textDialogueDiazano.png');
        this.load.image('230', './assets/img/textDialogueTrioxidoDinitrogeno.png');
        this.load.image('120', './assets/img/textDialogueDioxidoNitrogeno.png');
        this.load.image('250', './assets/img/textDialoguePentoxidoDinitrogeno.png');
        this.load.image('121', './assets/img/textDialogueAcidoNitroso.png');
        this.load.image('141', './assets/img/textDialogueAcidoPeroxinitrico.png');
        this.load.image('111', './assets/img/textDialogueNitrosilo.png');
        this.load.image('131', './assets/img/textDialogueAcidoNitrico.png');
        this.load.image('131_1', './assets/img/textDialogueAcidoPeroxinitroso.png');
        this.load.image('No', './assets/img/textDialogueNo.png');
        this.load.image('bannerCant', './assets/img/bannerCant.png');
        this.load.image('formCom', './assets/img/formulasComp.png');
        this.load.image('formExp', './assets/img/formulasExp.png')

        this.load.image('Ahidrogen', './assets/img/hidrogen.png');
        this.load.image('Aoxygen', './assets/img/oxygen.png');
        this.load.image('Anitrogeno', './assets/img/nitrogen.png');
        this.load.image('Axenon', './assets/img/xenon.png');
        this.load.image('axenon', './assets/img/xenonA.png');
        this.load.image('OAhidrogen', './assets/img/hidrogenIcon.png');
        this.load.image('OAoxygen', './assets/img/oxygenIcon.png');
        this.load.image('OAnitrogeno', './assets/img/nitrogenIcon.png');
        this.load.image('OAxenon', './assets/img/xenonIcon.png');
        this.load.image('reload', './assets/img/reload.png');
        this.load.image('Mdihidrogeno', './assets/img/dihidrogeno.png');
        this.load.image('Mdioxigeno', './assets/img/dioxigeno.png');
        this.load.image('Mdinitrogeno', './assets/img/dinitrogeno.png');
        this.load.image('Mmonoxido_nitrogeno', './assets/img/monoxido_nitrogeno.png');
        this.load.image('Mozono', './assets/img/ozono.png');
        this.load.image('Magua', './assets/img/agua.png');
        this.load.image('Mperoxido_hidrogeno', './assets/img/peroxido_hidrogeno.png');
        this.load.image('Mamoniaco', './assets/img/amoniaco.png');
        this.load.image('Mdiimina', './assets/img/diimina.png');
        this.load.image('Moxido_dinitrogeno', './assets/img/oxido_dinitrogeno.png');
        this.load.image('Mhidrazina', './assets/img/hidrazina.png');
        this.load.image('Mtrioxido_dinitrogeno', './assets/img/trioxido_dinitrogeno.png');
        this.load.image('Mdioxido_nitrogeno', './assets/img/dioxido_nitrogeno.png');
        this.load.image('Mpentoxido_dinitrogeno', './assets/img/pentoxido_dinitrogeno.png');
        this.load.image('Macido_nitroso', './assets/img/acido_nitroso.png');
        this.load.image('Macido_nitrico', './assets/img/acido_nitrico.png');
        this.load.image('Macido_peroxinitroso', './assets/img/acido_peroxinitroso.png');
        this.load.image('Macido_peroxinitrico', './assets/img/acido_peroxinitrico.png');
        this.load.image('Mnitrosilo', './assets/img/nitrosilo.png');
        this.load.image('back', './assets/img/back.png');
        this.load.spritesheet('rotate', './assets/img/rotate.png',
            { frameWidth: 360, frameHeight: 358 });
        this.load.image('build', './assets/img/build.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create() {


        var game = this;

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

        var uv = this.add.image(120,this.height-40,'uv').setScale(0.1);
        uv.depth = 6;

        setTimeout(() => {
            rect.visible = false;
            graphicsR.destroy();
            carpa.destroy();
            uv.visible=false;
        }, 2000);

        // Arrays of elements
        var atoms = [];
        var createdAtoms = [];
        var createdMol = [];
        var molecules = [];
        var weightsA = [];
        var weightsM = [];
        var dialogues = [];
        var form = [];
        var cantPressed = [0, 0, 0, 0];

        var DIALOGUEX = this.width - 273;
        var DIALOGUEY = 217;
        var clics = 0;


        var add = this.add;

        WebFont.load({
            custom: {
                families: ['Nunito']
            },
            active: function () {
                game.cantClics = add.text(game.width - 160, game.height - 65, '0', { fontFamily: 'Nunito', fontSize: 50, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                game.cantClics.setVisible(false);

            }
        });


        // Adding resources
        var build = this.physics.add.sprite(this.width / 2, 50, 'build').setScale(0.3).setInteractive();
        build.depth = 4;


        var background = this.add.image(this.width / 2, this.height / 2, 'background').setScale(this.width / 2000, this.height / 2000);
        background.depth = -2;

        this.add.image(this.width / 2, this.height + 120, 'banner').setScale(3);
        var reload = this.physics.add.sprite(this.width - 100, 52, 'reload').setInteractive();
        reload.setScale(0.5);
        var back = this.physics.add.sprite(this.width / 20, 50, 'back').setInteractive();
        back.setScale(0.7);
        this.physics.add.sprite(this.width - 50, 52, 'infoAM').setScale(0.4).setInteractive();


        var dialogueHidrogen = this.physics.add.sprite(DIALOGUEX, DIALOGUEY, 'dialogueHidrogeno').disableBody(true, true);
        dialogues.push(dialogueHidrogen);
        var dialogueOxygen = this.physics.add.sprite(DIALOGUEX, DIALOGUEY, 'dialogueOxigeno').disableBody(true, true);
        dialogues.push(dialogueOxygen);
        var dialogueNitrogen = this.physics.add.sprite(DIALOGUEX, DIALOGUEY, 'dialogueNitrogeno').disableBody(true, true);
        dialogues.push(dialogueNitrogen);
        var dialogueXenon = this.physics.add.sprite(DIALOGUEX, DIALOGUEY, 'dialogueXenon').disableBody(true, true);
        dialogues.push(dialogueXenon);
        var dialogueXenonMol = this.physics.add.sprite(DIALOGUEX, DIALOGUEY, 'dialogueXenonMol').disableBody(true, true);
        dialogueXenonMol.setScale(0.6)


        // Atoms
        var hidrogenO = this.physics.add.sprite(this.width / 4, this.height - 40, 'OAhidrogen').setScale(0.4).setInteractive();
        var hidrogen = this.physics.add.sprite(0, 0, 'Ahidrogen').disableBody(true, true);
        atoms.push(hidrogen);
        weightsA.push(1);

        var oxygenO = this.physics.add.sprite(this.width / 2.5, this.height - 40, 'OAoxygen').setScale(0.4).setInteractive();
        var oxygen = this.physics.add.sprite(0, 0, 'Aoxygen').disableBody(true, true);
        atoms.push(oxygen);
        weightsA.push(10);

        var nitrogenoO = this.physics.add.sprite(this.width / 1.8, this.height - 40, 'OAnitrogeno').setScale(0.4).setInteractive();
        var nitrogeno = this.physics.add.sprite(0, 0, 'Anitrogeno').disableBody(true, true);
        atoms.push(nitrogeno);
        weightsA.push(100);

        var xenonO = this.physics.add.sprite(this.width / 1.4, this.height - 40, 'OAxenon').setScale(0.4).setInteractive();
        var xenon = this.physics.add.sprite(0, 0, 'Axenon').disableBody(true, true);
        atoms.push(xenon);
        weightsA.push(1000);

        var dihidrogeno = this.physics.add.sprite(0, 0, 'Mdihidrogeno');
        dihidrogeno.disableBody(true, true);
        molecules.push(dihidrogeno);
        weightsM.push(2);
        form.push('H2');

        var dioxigeno = this.physics.add.sprite(0, 0, 'Mdioxigeno');
        dioxigeno.disableBody(true, true);
        molecules.push(dioxigeno);
        weightsM.push(20);
        form.push('O2');

        var dinitrogeno = this.physics.add.sprite(0, 0, 'Mdinitrogeno');
        dinitrogeno.disableBody(true, true);
        molecules.push(dinitrogeno);
        weightsM.push(200);
        form.push('N2');

        var monoxido_nitrogeno = this.physics.add.sprite(0, 0, 'Mmonoxido_nitrogeno');
        monoxido_nitrogeno.disableBody(true, true);
        molecules.push(monoxido_nitrogeno);
        weightsM.push(110);
        form.push('NO');

        var ozono = this.physics.add.sprite(0, 0, 'Mozono');
        ozono.disableBody(true, true);
        molecules.push(ozono);
        weightsM.push(30);
        form.push('O3');

        var agua = this.physics.add.sprite(0, 0, 'Magua');
        agua.disableBody(true, true);
        molecules.push(agua);
        weightsM.push(12);
        form.push('H2O');

        var peroxido_hidrogeno = this.physics.add.sprite(0, 0, 'Mperoxido_hidrogeno');
        peroxido_hidrogeno.disableBody(true, true);
        molecules.push(peroxido_hidrogeno);
        weightsM.push(22);
        form.push('H2O2');

        var amoniaco = this.physics.add.sprite(0, 0, 'Mamoniaco');
        amoniaco.disableBody(true, true);
        molecules.push(amoniaco);
        weightsM.push(103);
        form.push('NH3');

        var diimina = this.physics.add.sprite(0, 0, 'Mdiimina');
        diimina.disableBody(true, true);
        molecules.push(diimina);
        weightsM.push(202);
        form.push('N2H2');

        var oxido_dinitrogeno = this.physics.add.sprite(0, 0, 'Moxido_dinitrogeno');
        oxido_dinitrogeno.disableBody(true, true);
        molecules.push(oxido_dinitrogeno);
        weightsM.push(210);
        form.push('N2O');

        var hidracina = this.physics.add.sprite(0, 0, 'Mhidrazina');
        hidracina.disableBody(true, true);
        molecules.push(hidracina);
        weightsM.push(204);
        form.push('N2H4');

        var trioxido_dinitrogeno = this.physics.add.sprite(0, 0, 'Mtrioxido_dinitrogeno');
        trioxido_dinitrogeno.disableBody(true, true);
        molecules.push(trioxido_dinitrogeno);
        weightsM.push(230);
        form.push('N2O3');

        var dioxido_nitrogeno = this.physics.add.sprite(0, 0, 'Mdioxido_nitrogeno');
        dioxido_nitrogeno.disableBody(true, true);
        molecules.push(dioxido_nitrogeno);
        weightsM.push(120);
        form.push('NO2');

        var pentoxido_dinitrogeno = this.physics.add.sprite(0, 0, 'Mpentoxido_dinitrogeno');
        pentoxido_dinitrogeno.disableBody(true, true);
        molecules.push(pentoxido_dinitrogeno);
        weightsM.push(250);
        form.push('N2O5');

        var acido_nitroso = this.physics.add.sprite(0, 0, 'Macido_nitroso');
        acido_nitroso.disableBody(true, true);
        molecules.push(acido_nitroso);
        weightsM.push(121);
        form.push('HNO2');

        var acido_nitrico = this.physics.add.sprite(0, 0, 'Macido_nitrico');
        acido_nitrico.disableBody(true, true);
        molecules.push(acido_nitrico);
        weightsM.push(131);
        form.push('HNO3');

        var acido_peroxinitroso = this.physics.add.sprite(0, 0, 'Macido_peroxinitroso');
        acido_peroxinitroso.disableBody(true, true);
        molecules.push(acido_peroxinitroso);
        weightsM.push(131);
        form.push('HNO3');

        var acido_peroxinitrico = this.physics.add.sprite(0, 0, 'Macido_peroxinitrico');
        acido_peroxinitrico.disableBody(true, true);
        molecules.push(acido_peroxinitrico);
        weightsM.push(141);
        form.push('HNO4');

        var nitroxilo = this.physics.add.sprite(0, 0, 'Mnitrosilo');
        nitroxilo.disableBody(true, true);
        molecules.push(nitroxilo);
        weightsM.push(111);
        form.push('HNO');

        var bannerCant = this.physics.add.sprite(0, this.height - 40, 'bannerCant').setScale(0.6);
        bannerCant.visible = false;

        var formComp = this.physics.add.sprite(70,100,'formCom').setScale(0.6).setInteractive();
        var formExp = this.physics.add.sprite(70,this.height/2, 'formExp').setScale((this.height-180)/887).setInteractive();
        formExp.visible=false;
        if(this.height>this.width){
            formExp = this.physics.add.sprite(120,this.height/2.4, 'formExp').setScale((this.height-650)/887);
            formExp.visible=false;
        }

        // Functions

        function setInteractionsMol(mol, i, xenon = false) {
            mol.depth = 10;
            if (xenon) {
                mol.setInteractive();

                mol.on('pointerover', () => {
                    dialogueXenonMol.enableBody(true, DIALOGUEX, DIALOGUEY + 5, true, true);
                });

                mol.on('pointerdown', () => {
                    dialogueXenonMol.enableBody(true, DIALOGUEX, DIALOGUEY + 5, true, true);
                });

                mol.on('pointerout', () => {
                    dialogueXenonMol.disableBody(true, true);
                });

                mol.on('pointerup', () => {
                    dialogueXenonMol.disableBody(true, true);
                });

                game.input.setDraggable(mol);

                game.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {

                    gameObject.setTint(0x343333);
                });

                game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.setTint(0x343333);
                    gameObject.x = pointer.x;
                    gameObject.y = pointer.y;
                });

                game.input.on('dragend', function (pointer, gameObject) {
                    dialogueXenonMol.disableBody(true, true);
                    gameObject.clearTint();
                });

            } else {
                mol.setInteractive();

                let dialoguex = game.physics.add.sprite(DIALOGUEX, DIALOGUEY, game.createA.toString()).disableBody(true, true);

                if (i === -3) {
                    dialoguex = game.physics.add.sprite(DIALOGUEX, DIALOGUEY, '131_1').disableBody(true, true);
                }

                dialoguex.setScale(0.6)
                mol.on('pointerover', () => {
                    dialoguex.enableBody(true, DIALOGUEX, DIALOGUEY, true, true);
                });

                mol.on('pointerdown', () => {
                    dialoguex.enableBody(true, DIALOGUEX, DIALOGUEY, true, true);
                });

                mol.on('pointerout', () => {
                    dialoguex.disableBody(true, true);
                });

                mol.on('pointerup', () => {
                    dialoguex.disableBody(true, true);
                });

                game.input.setDraggable(mol);

                game.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {

                    gameObject.setTint(0x343333);
                });

                game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.setTint(0x343333);
                    gameObject.x = pointer.x;
                    gameObject.y = pointer.y;
                });

                game.input.on('dragend', function (pointer, gameObject) {
                    dialoguex.disableBody(true, true);
                    gameObject.clearTint();
                });
            }
        }

        function buildMol() {
            if (game.createA === 131) {
                let xMol = Math.random() * (game.width - 100 - 100) + 100;
                let yMol = Math.random() * (game.height - 200 - 100) + 100;
                let mol = game.physics.add.sprite(xMol, yMol, 'Macido_nitrico');
                setInteractionsMol(mol, 16);

                xMol = Math.random() * (game.width - 100 - 100) + 100;
                yMol = Math.random() * (game.height - 200 - 100) + 100;
                let mol1 = game.physics.add.sprite(xMol, yMol, 'Macido_peroxinitroso');
                setInteractionsMol(mol1, -3);

                createdMol.push(mol);
                createdMol.push(mol1);
            } else if (game.createA === 1000) {
                let mol = game.physics.add.sprite(xenonO.x, xenonO.y - 110, 'Axenon').setInteractive();
                createdMol.push(mol);
                setInteractionsMol(mol, 0, true);
            } else {
                var comparison = (e) => e === game.createA;

                let i = weightsM.findIndex(comparison);


                if (i === -1) {
                    let dialogueNo = game.physics.add.sprite(DIALOGUEX + 130, DIALOGUEY - 80, 'No');
                    setTimeout(() => { dialogueNo.disableBody(true, true); }, 2000);
                } else {
                    let name = molecules[i].texture.key;
                    let xMol = Math.random() * (game.width - 100 - 100) + 100;
                    let yMol = Math.random() * (game.height - 200 - 100) + 100;
                    let mol = game.physics.add.sprite(xMol, yMol, name);
                    setInteractionsMol(mol, i);
                    createdMol.push(mol);

                }

            }
        }

        // Setting interactions

        formComp.on('pointerdown', () => {
            formExp.x = formExp.displayWidth / 2 + 10;
            formComp.visible = false;
            formExp.visible = true;
            formExp.setInteractive();
        })

        formExp.on('pointerdown', () => {
            formExp.visible = false;
            formComp.visible = true;
        })

        build.on('pointerdown', () => {
            build.setTint(0x343333);
            createdAtoms.forEach(atom => atom.disableBody(true, true));
            buildMol();
            game.cantClics.setVisible(false);
            bannerCant.visible = false;
            cantPressed = [0, 0, 0, 0]
        });

        build.on('pointerup', () => {
            build.clearTint();
            this.createA = 0;
            clics = 0;
            game.cantClics.setText('0')
            game.cantClics.setVisible(false);
        })

        reload.on('pointerover', () => { reload.setTint(0xF39103) });
        reload.on('pointerdown', () => {
            createdMol.forEach(mol => mol.disableBody(true, true))
            createdAtoms.forEach(atom => atom.disableBody(true, true));
            game.createA = 0;
            clics = 0;
            game.cantClics.setText('0');
            game.cantClics.setVisible(false);
            bannerCant.visible = false;
            cantPressed = [0, 0, 0, 0]
        });
        reload.on('pointerout', () => { reload.clearTint() });

        back.on('pointerover', () => { back.setTint(0xF39103) });
        back.on('pointerdown', () => {
            location.reload();
        });
        back.on('pointerout', () => { back.clearTint() });

        hidrogenO.on('pointerover', () => {
            hidrogenO.setScale(0.42);
            dialogueHidrogen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
        });

        hidrogenO.on('pointerdown', () => {
            hidrogenO.setScale(0.42);
            bannerCant.x = hidrogenO.x + 70;
            bannerCant.visible = true;
            dialogueHidrogen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
            let atomC = this.physics.add.sprite(hidrogenO.x, hidrogenO.y - 130, 'Ahidrogen').setScale(0.8).setInteractive();

            this.createA += 1;
            cantPressed[0] += 1;
            game.cantClics.setX(game.width / 4 + 55);
            game.cantClics.setVisible(true);
            game.cantClics.setText(cantPressed[0].toString());
            createdAtoms.push(atomC);
        });

        hidrogenO.on('pointerout', () => {
            hidrogenO.setScale(0.4);
            dialogueHidrogen.disableBody(true, true);
        });

        hidrogenO.on('pointerup', () => {
            hidrogenO.setScale(0.4);
            dialogueHidrogen.disableBody(true, true);
        });


        //OXYGEN

        oxygenO.on('pointerover', () => {
            oxygenO.setScale(0.42);
            dialogueOxygen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
        });

        oxygenO.on('pointerdown', () => {
            oxygenO.setScale(0.42);
            bannerCant.x = oxygenO.x + 70;
            bannerCant.visible = true;
            dialogueOxygen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
            let atomC = this.physics.add.sprite(oxygenO.x, oxygenO.y - 130, 'Aoxygen').setScale(0.8).setInteractive();

            this.createA += 10;
            cantPressed[1] += 1;
            game.cantClics.setX(this.width / 2.5 + 55);
            game.cantClics.setVisible(true);
            game.cantClics.setText(cantPressed[1].toString());
            createdAtoms.push(atomC);
        });

        oxygenO.on('pointerout', () => {
            oxygenO.setScale(0.4);
            dialogueOxygen.disableBody(true, true);

        });

        oxygenO.on('pointerup', () => {
            oxygenO.setScale(0.4);
            dialogueOxygen.disableBody(true, true);
        });

        //NITROGEN

        nitrogenoO.on('pointerover', () => {
            nitrogenoO.setScale(0.42);
            dialogueNitrogen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
        });

        nitrogenoO.on('pointerdown', () => {
            nitrogenoO.setScale(0.42);
            bannerCant.x = nitrogenoO.x + 70;
            bannerCant.visible = true;
            dialogueNitrogen.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
            let atomC = this.physics.add.sprite(nitrogenoO.x, nitrogenoO.y - 130, 'Anitrogeno').setInteractive();

            this.createA += 100;
            cantPressed[2] += 1;

            game.cantClics.setX(this.width / 1.8 + 55);
            game.cantClics.setVisible(true);
            game.cantClics.setText(cantPressed[2].toString());
            createdAtoms.push(atomC);
        });

        nitrogenoO.on('pointerout', () => {
            nitrogenoO.setScale(0.4);
            dialogueNitrogen.disableBody(true, true);

        });

        nitrogenoO.on('pointerup', () => {
            nitrogenoO.setScale(0.4);
            dialogueNitrogen.disableBody(true, true);
        });

        //XENON

        xenonO.on('pointerover', () => {
            xenonO.setScale(0.42);
            dialogueXenon.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
        });

        xenonO.on('pointerdown', () => {
            xenonO.setScale(0.42);
            bannerCant.x = xenonO.x + 70;
            bannerCant.visible = true;
            dialogueXenon.enableBody(true, DIALOGUEX + 130, DIALOGUEY - 80, true, true);
            let atomC = this.physics.add.sprite(xenonO.x, xenonO.y - 130, 'axenon').setScale(0.5).setInteractive();


            this.createA += 1000;
            cantPressed[3] += 1
            game.cantClics.setX(this.width / 1.4 + 55);
            game.cantClics.setVisible(true);
            game.cantClics.setText(cantPressed[3].toString());

            createdAtoms.push(atomC);

        });

        xenonO.on('pointerout', () => {
            xenonO.setScale(0.4);
            dialogueXenon.disableBody(true, true);

        });

        xenonO.on('pointerup', () => {
            xenonO.setScale(0.4);
            dialogueXenon.disableBody(true, true);
        });


        this.atoms = atoms;
    }
}
