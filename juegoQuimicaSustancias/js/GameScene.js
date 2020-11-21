class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.phInfo;
        this.volInfo;
        this.concInfo;
        this.width = window.innerWidth;
        this.height = window.innerHeight
    }

    init(data) {

        var element = document.createElement('style');

        document.head.appendChild(element);

        var sheet = element.sheet;

        var styles = '@font-face { font-family: "Nunito"; src: url("assets/Nunito-Regular.ttf") format("opentype"); }\n';

        sheet.insertRule(styles, 0);
    }

    preload() {

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create() {

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


        // Global variables
        var or = this.scale.orientation;
        var i = 0;
        var hclIS = true;

        var game = this;

        var color = 0xF5E08C;
        var colorS1 = 0xF9F4E0;

        let background = this.physics.add.sprite(this.width / 2, this.height / 2, 'background').setScale(this.width / 3334, this.height / 2501);
        background.depth = -3;
        var info = this.add.image(this.width - 48, 48, 'info').setScale(0.8).setInteractive();
        var restart = this.add.image(this.width - 100, 48, 'restart').setScale(0.8).setInteractive();

        var gotero = this.physics.add.sprite(this.width / 4, this.height / 5, 'gotero').setInteractive().setScale(189 / this.width + 0.6, 74 / this.height + 0.6);
        gotero.depth = 1;


        var beaker = this.physics.add.sprite(this.width / 4, this.height - 150, 'beaker').setScale(0.35);
        beaker.depth = 2;

        var liquidoGotero = this.physics.add.sprite(this.width / 4, this.height / 5, 'liquidoG').setScale(189 / this.width + 0.6, 74 / this.height + 0.6);
        liquidoGotero.visible = false;
        liquidoGotero.setTint(0xD2BB23);
        var naoh = this.physics.add.sprite(this.width / 8, this.height / 5, 'NaOH').setScale(0.6);
        var hcl = this.physics.add.sprite(this.width / 8, beaker.y, 'HCl').setScale(0.6);
        var h3po4 = this.physics.add.sprite(this.width / 8, beaker.y, 'H3PO4').setScale(0.7);
        h3po4.visible = false;
        var sustancia = this.physics.add.sprite(this.width / 4 -4, (gotero.y + beaker.y) / 2, 'liquido');
        sustancia.visible = false;
        let fEscala = (beaker.y - gotero.y) / 960
        sustancia.setScale(0.067, fEscala + 0.1);
        sustancia.y = sustancia.y + gotero.displayHeight / 2;
        sustancia.depth = -1;
        sustancia.setTint(0xD2BB23);
        var graph = this.physics.add.sprite(this.width / 1.5, this.height / 1.77, 'graph').setScale(0.7 * this.height / 347, 0.6 * this.height / 347) //(0.8)
        var graph1 = this.physics.add.sprite(this.width / 1.5, this.height / 1.77, 'graph1').setScale(0.7 * this.height / 347, 0.6 * this.height / 347) //(0.8)
        graph1.visible = false;
        if (or === "portrait-primary") {
            graph.setScale(1.3);
            graph1.setScale(1.3);
        }
        var liquidoBeaker = this.physics.add.sprite(beaker.x, beaker.y-20, 'liquidoBeaker').setScale(0.7);
        liquidoBeaker.setTint(colorS1);
        liquidoBeaker.depth = -1;
        var sustanciaUp = this.physics.add.sprite(this.width / 4 - 6, this.height + 5, 'liquido').setScale(1.07, 0.26);
        sustanciaUp.depth = -1;
        sustanciaUp.setTint(colorS1);
        let xpH = this.width / 1.5 - graph.displayWidth / 2 - 69;
        if (or === "portrait-primary") {
            xpH = graph.x;
        }

        var res = this.physics.add.sprite(xpH, this.height - 250, 'resultado').setScale(0.7)
        var vol = this.physics.add.sprite(xpH, this.height - 320, 'vol').setScale(0.7);
        var conc = this.physics.add.sprite(xpH, this.height - 180, 'conc').setScale(0.7);


        var back = this.physics.add.sprite(50, 50, 'back').setScale(1);
        back.setInteractive();
        var NaOHButton = this.physics.add.sprite(graph.x - (153 * 0.6 * this.height / 347), graph.y + (183 * 0.6 * this.height / 347) + 25, 'NaOHButton').setScale(0.6 * this.height / 347, 0.5 * this.height / 347).setInteractive();
        //NaOHButton.visible = false;
        var H3PO4Button = this.physics.add.sprite(graph.x + (153 * 0.6 * this.height / 347), graph.y + (183 * 0.6 * this.height / 347) + 25, 'H3PO4Button').setScale(0.6 * this.height / 347, 0.5 * this.height / 347).setInteractive();
        //H3PO4Button.visible=false;
        if (or === "portrait-primary") {
            NaOHButton.setScale(1);
            NaOHButton.x = graph.x - NaOHButton.displayWidth / 2 - 10;
            NaOHButton.y = graph.y + graph.displayHeight / 2 + NaOHButton.displayHeight / 2 + 10;
            H3PO4Button.setScale(1);
            H3PO4Button.x = graph.x + H3PO4Button.displayWidth / 2 + 10;
            H3PO4Button.y = graph.y + graph.displayHeight / 2 + H3PO4Button.displayHeight / 2 + 10
        }

        WebFont.load({
            custom: {
                families: ['Nunito']
            },
            active: function () {
                game.volInfo = game.add.text(xpH - 20, game.height - 320, '', {
                    fontFamily: 'Nunito',
                    fontSize: 18,
                    color: '#000000'
                }) //.setShadow(2, 2, "#333333", 2, false, true);

                game.phInfo = game.add.text(xpH - 20, game.height - 250, '', {
                    fontFamily: 'Nunito',
                    fontSize: 18,
                    color: '#000000'
                }) //.setShadow(2, 2, "#333333", 2, false, true);

                game.concInfo = game.add.text(xpH-20, game.height - 180, '', {
                  fontFamily: 'Nunito',
                  fontSize: 18,
                  color: '#000000'
                })
            }
        });

        this.graphics = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });

        this.points = [];

        // Titrating NAOH with HCL
        // Transformed vol to graph on the screen
        var volNaOH = [(this.width / 1.5 - graph.displayWidth / 2) + graph.displayWidth * 0.117]; //[455,462,469,476,483,490,497,504,511,518,525,532,539,546,553,560,567,574,581,588,595,602,609,616,617.4,618.8,620.2,621.6,623,623.07,623.14,623.21,623.28,623.35,623.42,623.49,623.56,623.63,623.7,625.1,626.5,627.9,629.3,630,665,735,805]

        // Transformed pH to graph on the screen
        var pH = [this.height / 1.77 + graph.displayHeight / 2 - graph.displayHeight * 0.247]; //,199.755,199.503,199.251,198.992,198.74,198.474,198.201,197.928,197.641,197.34,196.703,196.703,196.36,195.996,195.597,195.163,194.687,194.148,193.532,192.79,191.859,190.578,188.464,187.799,186.959,185.804,183.942,178.384,177.467,176.151,173.778,158,141.277,139.38,138.218,137.385,136.734,136.195,131.806,130.091,129.013,128.222,127.893,122.636,120.151,119.108]

        // Real vol to show on the measurer
        var volNaOHMedidor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23.2, 23.4, 23.6, 23.8, 24, 24.01, 24.02, 24.03, 24.04, 24.05, 24.06, 24.07, 24.08, 24.09, 24.1, 24.3, 24.5, 24.7, 24.9, 25, 30, 40, 50];
        // Modified pH to graph
        var pHMedidor = [1, 1.035, 1.071, 1.107, 1.144, 1.18, 1.218, 1.257, 1.296, 1.337, 1.38, 1.471, 1.471, 1.52, 1.572, 1.629, 1.691, 1.759, 1.836, 1.924, 2.03, 2.163, 2.346, /*2.648*/2.5, 2.743, 2.863, 3.028, 3.294, 3.6/*4.088*/, 4/*4.219*/, /*4.407*/4.34, 4.746, 7, 9.389, 9.66, 9.826, 9.945, /*10.038*/10.1, 10.28/*10.115*/, /*10.742*/10.4, /*10.987*/10.6, /*11.141*/10.7, /*11.254*/10.8, /*11.301*/10.9, /*12.052*/11, /*12.407*/11.1, /*12.556*/11.15];

        let sum = graph.displayWidth * 0.016
        let sumY = graph.displayHeight * 0.034
        for (var j = 1; j < volNaOHMedidor.length; j++) {
            volNaOH.push((this.width / 1.5 - graph.displayWidth / 2) + graph.displayWidth * 0.117 + sum);
            pH.push(this.height / 1.77 + graph.displayHeight / 2 - graph.displayHeight * 0.215 - sumY * pHMedidor[j])
            sum += graph.displayWidth * 0.0173;
        }

        // Real pH to show
        pHMedidor = [1, 1.035, 1.071, 1.107, 1.144, 1.18, 1.218, 1.257, 1.296, 1.337, 1.38, 1.471, 1.471, 1.52, 1.572, 1.629, 1.691, 1.759, 1.836, 1.924, 2.03, 2.163, 2.346, 2.648, 2.743, 2.863, 3.028, 3.294, 4.088, 4.219, 4.407, 4.746, 7, 9.389, 9.66, 9.826, 9.945, 10.038, 10.115, 10.742, 10.987, 11.141, 11.254, 11.301, 12.052, 12.407, 12.556];

        // Titrating NAOH with H3PO4
        // Transformed vol to graph on the screen
        var volNaOH1 = [(this.width / 1.5 - graph.displayWidth / 2) + graph.displayWidth * 0.117]; //[455,462,469,476,483,490,497,504,511,518,525,532,539,546,553,560,567,574,581,588,595,602,609,616,617.4,618.8,620.2,621.6,623,623.07,623.14,623.21,623.28,623.35,623.42,623.49,623.56,623.63,623.7,625.1,626.5,627.9,629.3,630,665,735,805]

        // Transformed pH to graph on the screen
        var pH1 = [this.height / 1.77 + graph.displayHeight / 2 - graph.displayHeight * 0.235]; //,199.755,199.503,199.251,198.992,198.74,198.474,198.201,197.928,197.641,197.34,196.703,196.703,196.36,195.996,195.597,195.163,194.687,194.148,193.532,192.79,191.859,190.578,188.464,187.799,186.959,185.804,183.942,178.384,177.467,176.151,173.778,158,141.277,139.38,138.218,137.385,136.734,136.195,131.806,130.091,129.013,128.222,127.893,122.636,120.151,119.108]

        // Real vol to show on the measurer
        var volNaOHMedidor1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87];
        // Real pH to show on the measurer
        var pHMedidor1 = [0.89, 0.89, 0.92, 0.96, 0.99, 1.02, 1.06, 1.09, 1.13, 1.16, 1.20, 1.24, 1.27, 1.31, 1.35, 1.39, 1.43, 1.47, 1.51, 1.55, 1.59, 1.63, 1.68, 1.72, 1.76, 1.81, 1.86, 1.91, 1.96, 2.01, 2.07, 2.13, 2.20, 2.26, 2.34, 2.42, 2.51, 2.61, 2.75, 2.91, 3.15, 3.60, 4.51, 5.03, 5.29, 5.47, 5.61, 5.73, 5.82, 5.91, 5.99, 6.07, 6.13, 6.20, 6.27, 6.33, 6.39, 6.45, 6.50, 6.56, 6.62, 6.67, 6.73, 6.79, 6.84, 6.91, 6.97, 7.04, 7.11, 7.19, 7.28, 7.37, 7.47, 7.60, 7.74, 7.96, 8.30, 9.06, 10.10, 10.42, 10.64, 10.80, 10.92, 11.03, 11.12, 11.20, 11.27, 11.33];

        sum = graph.displayWidth * 0.008
        sumY = graph.displayHeight * 0.034
        for (var j = 1; j < volNaOHMedidor1.length; j++) {
            volNaOH1.push((this.width / 1.5 - graph.displayWidth / 2) + graph.displayWidth * 0.117 + sum);
            pH1.push(this.height / 1.77 + graph.displayHeight / 2 - graph.displayHeight * 0.205 - sumY * pHMedidor1[j])
            sum += graph.displayWidth * 0.0093;
        }


        // Setting interactions
        gotero.on('pointerdown', () => {
            liquidoGotero.visible = true;
            sustancia.visible = true;
            liquidoBeaker.setTint(color);


            if (hclIS) {
                this.graphicSpline = setInterval(() => {
                    if (i < 47) {

                        game.volInfo.setText(volNaOHMedidor[i].toString());

                        game.phInfo.setText(Math.round(pHMedidor[i] * 100) / 100);
                        this.points.push(new Phaser.Math.Vector2(volNaOH[i], pH[i]));


                        this.curve = new Phaser.Curves.Spline(this.points);

                        this.graphics.fillCircle(volNaOH[i], pH[i], 2);
                        var r = this.add.curve(300, 400, this.curve);

                        r.setStrokeStyle(5, 0x000000);
                        r.depth = -6;
                        this.curve.draw(this.graphics, 64);

                        i += 1;

                    } else if (i === 47) {
                        game.concInfo.setText('0.100')
                        gotero.disableInteractive();
                        sustanciaUp.body.velocity.y = 0;
                        sustancia.visible = false;
                        liquidoGotero.visible = false;
                        clearInterval(this.graphicSpline);
                        i = 0;
                    }

                }, 47);
            } else {

                this.graphicSpline = setInterval(() => {
                    if (i < 88) {

                        game.volInfo.setText(volNaOHMedidor1[i].toString());

                        game.phInfo.setText(Math.round(pHMedidor1[i] * 100) / 100);
                        this.points.push(new Phaser.Math.Vector2(volNaOH1[i], pH1[i]));


                        this.curve = new Phaser.Curves.Spline(this.points);

                        this.graphics.fillCircle(volNaOH1[i], pH1[i], 2);
                        var r = this.add.curve(300, 400, this.curve);

                        r.setStrokeStyle(5, 0x000000);
                        r.depth = -6;
                        this.curve.draw(this.graphics, 64);

                        i += 1;

                    } else if (i === 88) {
                        game.concInfo.setText('2.026')
                        gotero.disableInteractive();
                        sustanciaUp.body.velocity.y = 0;
                        sustancia.visible = false;
                        liquidoGotero.visible = false;
                        clearInterval(this.graphicSpline);
                        i = 0;
                    }

                }, 88);
            }

            sustanciaUp.body.velocity.y = -3.6;

        })

        gotero.on('pointerup', () => {
            liquidoGotero.visible = false;
            sustancia.visible = false;
            clearInterval(this.graphicSpline);
            sustanciaUp.body.velocity.y = 0;
        })

        restart.on('pointerdown', () => {
            restart.setTint(0xCF711E);
            sustanciaUp.y = this.height + 5;
            this.points = [];
            this.curve = [];
            this.graphics.destroy();
            this.graphics = this.add.graphics({
                fillStyle: {
                    color: 0x000000
                }
            });
            //
            game.volInfo.setText('');
            game.phInfo.setText('');
            game.concInfo.setText('');
            i = 0;
            gotero.setInteractive();
        })

        restart.on('pointerup', () => {
            restart.clearTint();
        })

        back.on('pointerover', () => {
            back.setTint(0xB7651D);
        })

        back.on('pointerout', () => {
            back.clearTint();
        })

        back.on('pointerdown', () => {
            location.reload();
        });

        NaOHButton.on('pointerdown', () => {
            color = 0xD2BB23;
            sustancia.clearTint();
            sustancia.setTint(color);
            liquidoGotero.clearTint();
            liquidoGotero.setTint(color);
            h3po4.visible = false;
            hcl.visible = true;
            graph1.visible = false;
            graph.visible = true;
            sustanciaUp.y = this.height + 5;
            this.points = [];
            this.curve = [];
            hclIS = true;
            this.graphics.destroy();
            this.graphics = this.add.graphics({
                fillStyle: {
                    color: 0x000000
                }
            });
            //
            game.volInfo.setText('');
            game.phInfo.setText('');
            game.concInfo.setText('');
            i = 0;
            gotero.setInteractive();
        })

        H3PO4Button.on('pointerdown', () => {
            color = 0xF4D4A2;
            sustancia.setTint(color);
            liquidoGotero.setTint(color);
            h3po4.visible = true;
            hcl.visible = false;
            graph1.visible = true;
            graph.visible = false;
            sustanciaUp.y = this.height + 5;
            this.points = [];
            this.curve = [];
            hclIS = false;
            this.graphics.destroy();
            this.graphics = this.add.graphics({
                fillStyle: {
                    color: 0x000000
                }
            });
            //
            game.volInfo.setText('');
            game.phInfo.setText('');
            game.concInfo.setText('');
            i = 0;

            gotero.setInteractive();
        })

        info.on('pointerdown', () => {
            this.scene.start("introScene");
        })

    }
}
