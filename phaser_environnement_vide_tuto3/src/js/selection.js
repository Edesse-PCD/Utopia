var groupe_plateformes
var player
var clavier
var player2
var Pyramide1
var cabane4
var cloud3
var igloo2
let keyQ
let keyD
let keyZ


export default class selection extends Phaser.Scene  {
  constructor() {
  
     super({key : "selection"}); // mettre le meme nom que le nom de la classe
     this.spawnX = 150;
     this.spawnY = 400;
  }

  preload() {
    this.load.image("BGdebut", "src/assets/BGdebut.png");
    this.load.image("Tilesetdebut", "src/assets/Tilesetdebut.png");

    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.spritesheet("img_dino", "src/assets/Dino.png", {
      frameWidth: 24,
      frameHeight: 20
    })
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    })
    this.load.spritesheet("img_dino2", "src/assets/Dino2.png", {
      frameWidth: 24,
      frameHeight: 20
    })
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png"); 
    this.load.image("img_cloud3","src/assets/cloud3.png");
    this.load.image("img_Pyramide1","src/assets/Pyramide1.png");
    this.load.image("img_cabane4","src/assets/cabane4.png");
    this.load.image("img_igloo2","src/assets/igloo2.png");
    this.load.image("img_bienvenue","src/assets/BienvenueUtopia.png");
    this.load.image("bouton","src/assets/bouton.png");

    this.load.tilemapTiledJSON("mapdebut", "src/assets/mapdebut.json");
    


  }
  create() {
this.img_bienvenue = this.add.image(400, 300, "img_bienvenue").setDepth(10).setScale(0.5);
    // Création du bouton "Commencer"

    if (this.game.config.spawnX != undefined) this.spawnX = this.game.config.spawnX;
    if (this.game.config.spawnY != undefined) this.spawnY = this.game.config.spawnY;
    
const carteDuNiveau = this.add.tilemap("mapdebut");
const BGdebut = carteDuNiveau.addTilesetImage("BGdebut", "BGdebut");

const Tilesetdebut = carteDuNiveau.addTilesetImage("Tilesetdebut", "Tilesetdebut");
const tilesetselec = [ BGdebut, Tilesetdebut];
const BG = carteDuNiveau.createLayer("BG", tilesetselec);
const plateforms = carteDuNiveau.createLayer("plateforms", tilesetselec);
plateforms.setCollisionByProperty({ estSolide: true });
const decoration = carteDuNiveau.createLayer("decoration", tilesetselec);
BG.setScale(2);
plateforms.setScale(2);
decoration.setScale(2);



keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    cloud3 = this.physics.add.staticSprite(2050, 460, "img_cloud3").setScale(0.2).refreshBody();
    this.add.text(cloud3.x, cloud3.y + 50, "Niveau 3", {
      font: "32px Georgia",
      fill: "#fff",
  }).setOrigin(0.5);
    cabane4 = this.physics.add.staticSprite(450, 270, "img_cabane4").setScale(0.3).refreshBody();
    Pyramide1 = this.physics.add.staticSprite(740, 490, "img_Pyramide1").setScale(0.3).refreshBody();
    this.add.text(Pyramide1.x, Pyramide1.y + 50, "Niveau 1", {
      font: "32px Georgia",
      fill: "#fff",
  }).setOrigin(0.5);
    igloo2 = this.physics.add.staticSprite(1270, 410, "img_igloo2").setScale(0.1).refreshBody();
    this.add.text(igloo2.x-20, igloo2.y + 70, "Niveau 2", {
      font: "32px Georgia",
      fill: "#fff",
  }).setOrigin(0.5);

    player = this.physics.add.sprite(this.spawnX, this.spawnY, 'img_dino');
    this.cameras.main.startFollow(player);
    player2= this.physics.add.sprite(this.spawnX,this.spawnY, 'img_dino2');
    player.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player, plateforms);
    this.physics.add.collider(player2, plateforms);
    this.physics.world.setBounds(0,0,2560,640);
    this.cameras.main.setBounds(0,0,2560,640);
    clavier = this.input.keyboard.createCursorKeys();
    
    this.boutonCommencer = this.add.image(
      this.cameras.main.width - 400, // Position X en haut à droite
      400, // Position Y en haut
      "bouton" // Clé de ton image de bouton
    ).setOrigin(0.5)
    .setScrollFactor(0) // Rendre le bouton fixe par rapport à la caméra
    .setInteractive().setScale(0.20).setDepth(11);
    
    // Ajouter le texte "Menu" par-dessus le bouton
    this.texteCommencer = this.add.text(
      this.boutonCommencer.x, // Position X centrée sur le bouton
      this.boutonCommencer.y, // Position Y centrée sur le bouton
      "Commencer",
      {
          font: "20px Arial",
          fill: "#000",   // Texte en noir
          align: "center"
      }
    ).setOrigin(0.5)
    .setScrollFactor(0).setDepth(12); // Rendre le texte fixe par rapport à la caméra
    
    // Rendre le bouton cliquable
    this.boutonCommencer.on("pointerdown", () => {
      this.boutonCommencer.destroy();
      this.img_bienvenue.destroy();
      this.texteCommencer.destroy();
        });

    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, 
      repeat: -1 
    });
    this.anims.create({
      key: "anim_face", 
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: "animdino_marche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_dino", { start: 2, end: 9 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "animdino_face", 
      frames: [{ key: "img_dino", frame: 0 }],
      frameRate: 20
    });
    this.anims.create({
      key: "animdino2_marche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_dino2", { start: 2, end: 9 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "animdino2_face", 
      frames: [{ key: "img_dino2", frame: 0 }],
      frameRate: 20
    });

    player.setScale(2);
    player2.setScale(2);
   
  }

  update() {
  
    if (clavier.right.isDown == true) {
    player.flipX=false;
    player.setVelocityX(160);
    player.anims.play('animdino_marche', true);
  }
  else if (clavier.left.isDown == true) {
    player.flipX=true;
    player.setVelocityX(-160);
    player.anims.play('animdino_marche', true);
  } 
  else {player.setVelocityX(0);
    player.anims.play('animdino_face', true)
    }
  
  if (keyQ.isDown == true) {
    player2.flipX=true;
    player2.setVelocityX(-160);
    player2.anims.play('animdino2_marche', true);
  } 
  else if (keyD.isDown == true) {
    player2.flipX=false;
    player2.setVelocityX(160);
    player2.anims.play('animdino2_marche', true);
    }   
  else {
    player2.setVelocityX(0);
    player2.anims.play('animdino2_face', true);
    }
  if (keyZ.isDown && player2.body.onFloor()) {
      player2.setVelocityY(-330);}
  if(clavier.up.isDown && player.body.onFloor()) {
        player.setVelocityY(-330);}
    
  if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
    if (this.physics.overlap(player, Pyramide1)) this.scene.start("niveau1");
    if (this.physics.overlap(player, igloo2)) this.scene.start("niveau2");
    if (this.physics.overlap(player, cloud3)) this.scene.start("niveau3");
    if (this.physics.overlap(player, cabane4)) this.scene.start("niveau4");
      if (this.physics.overlap(player2, Pyramide1)) this.scene.start("niveau1");
      if (this.physics.overlap(player2, igloo2)) this.scene.start("niveau2");
      if (this.physics.overlap(player2, cloud3)) this.scene.start("niveau3");
      if (this.physics.overlap(player2, cabane4)) this.scene.start("niveau4");
  } 
}}