class UseHeadphones extends Phaser.Scene{
    constructor(){
        super("useHeadphones");
        this.width=window.innerWidth;
        this.height=window.innerHeight;
    }
    
    preload(){
        this.load.image("headphones", "./assets/img/useHeadphones.jpg");
        this.load.image("important", "./assets/img/important.jpg");

        this.load.image("back", "./assets/img/back.png")

    }

    create(){
        // Global variables
        var nextCounter = 0;

        this.physics.add.sprite(this.width/2, this.height/2, "background").setScale(this.width/2535, this.height/1308);
        var important = this.physics.add.sprite(this.width/2, this.height/2, "important").setScale(0.7);

        var headP = this.physics.add.sprite(this.width/2, this.height/2, "headphones").setScale(0.7);
        headP.visible=false;
        var next = this.physics.add.sprite(this.width/2+(1101*0.6)/2-40*0.7, this.height/2+(600*0.6)/2-45*0.7, "back").setScale(0.7).setInteractive();
        next.rotation = Math.PI;

        next.on('pointerdown', () => {
            next.setScale(0.8);

            if(nextCounter===0){
                headP.visible=true;
                important.visible=false;
            } else {
                this.scene.start("gameScene8000");
            }
             nextCounter++; 
        })
        
        next.on('pointerup', () => {
            next.setScale(0.7);
        })
    }
}