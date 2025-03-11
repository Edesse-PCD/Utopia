var groupe_plateformes
var player
var clavier
var player2
let keyQ
let keyD
let keyZ

export default class selection extends Phaser.Scene  {
  constructor() {
  
     super({key : "selection"}); // mettre le meme nom que le nom de la classe
  }

  preload() {
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.spritesheet("img_dino", "src/assets/Dino.png", {
      frameWidth: 24,
      frameHeight: 24
    })
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    })
    this.load.spritesheet("img_dino2", "src/assets/Dino2.png", {
      frameWidth: 24,
      frameHeight: 24
    })
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png"); 
    this.load.image("img_star","src/assets/star.png");
  }
  create() {
keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.image(400, 300, "img_ciel");
    groupe_plateformes = this.physics.add.staticGroup();
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");
    this.star=this.physics.add.staticSprite(300, 540, "img_star");
    player = this.physics.add.sprite(100, 450, 'img_dino');
    player2= this.physics.add.sprite(150,450, 'img_dino2');
    player.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player, groupe_plateformes);
    this.physics.add.collider(player2, groupe_plateformes);
    player.setBounce(0.3);
    player2.setBounce(0.3);
    clavier = this.input.keyboard.createCursorKeys();
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
else if(clavier.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  } 
  else {player.setVelocityX(0);
    player.anims.play('animdino_face', true)
    =;}
  
  if (keyQ.isDown == true) {
    player2.flipX=true;
    player2.setVelocityX(-160);
    player2.anims.play('animdino2_marche', true);
  } 
  else if (keyZ.isDown && player2.body.touching.down) {
    player2.setVelocityY(-330);}
  else if (keyD.isDown == true) {
    player2.flipX=false;
    player2.setVelocityX(160);
    player2.anims.play('animdino2_marche', true);
    }   
  else {
    player2.setVelocityX(0);
    player2.anims.play('animdino2_face', true);
    }
    
  if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
    if (this.physics.overlap(player, this.porte1)) this.scene.start("niveau1");
    if (this.physics.overlap(player, this.porte2)) this.scene.start("niveau2");
    if (this.physics.overlap(player, this.porte3)) this.scene.start("niveau3");
    if (this.physics.overlap(player, this.star)) this.scene.start("niveau4");
  } 
}}