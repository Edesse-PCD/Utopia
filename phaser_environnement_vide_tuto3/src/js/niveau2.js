// chargement des librairies

export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Crate", "src/assets/niveau2/Object/Crate.png");
    this.load.image("Crystal", "src/assets/niveau2/Object/Crystal.png");
    this.load.image("IceBox", "src/assets/niveau2/Object/IceBox.png");
    this.load.image("Igloo", "src/assets/niveau2/Object/Igloo.png");
    this.load.image("SnowMan", "src/assets/niveau2/Object/SnowMan.png");
    this.load.image("Tree_1", "src/assets/niveau2/Object/Tree_1.png");
    this.load.image("Tree_2", "src/assets/niveau2/Object/Tree_2.png");
    this.load.image("1", "src/assets/niveau2/Tiles/1.png");
    this.load.image("2", "src/assets/niveau2/Tiles/2.png");
    this.load.image("3", "src/assets/niveau2/Tiles/3.png");
    this.load.image("7", "src/assets/niveau2/Tiles/7.png");
    this.load.image("14", "src/assets/niveau2/Tiles/14.png");
    this.load.image("15", "src/assets/niveau2/Tiles/15.png");
    this.load.image("16", "src/assets/niveau2/Tiles/16.png");
    this.load.image("17", "src/assets/niveau2/Tiles/17.png");
    this.load.image("Polarbear", "src/assets/niveau2/PolarBear.png");
    this.load.image("BG", "src/assets/niveau2/BG.png");
    this.load.tilemapTiledJSON("map2", "src/assets/niveau2/mapBanquise.json");
  }


  create() {
    const carteDuNiveau = this.add.tilemap("map2");
    const crate = carteDuNiveau.addTilesetImage("Crate", "Crate");
    const Crystal = carteDuNiveau.addTilesetImage("Crystal", "Crystal");
    const iceBox = carteDuNiveau.addTilesetImage("IceBox", "IceBox");
    const snowMan = carteDuNiveau.addTilesetImage("SnowMan", "SnowMan");
    const tree1 = carteDuNiveau.addTilesetImage("Tree_1", "Tree_1");
    const tree2 = carteDuNiveau.addTilesetImage("Tree_2", "Tree_2");
    const tile1 = carteDuNiveau.addTilesetImage("1", "1");
    const tile2 = carteDuNiveau.addTilesetImage("2", "2");
    const tile3 = carteDuNiveau.addTilesetImage("3", "3");
    const tile7 = carteDuNiveau.addTilesetImage("7", "7");
    const tile14 = carteDuNiveau.addTilesetImage("14", "14");
    const tile15 = carteDuNiveau.addTilesetImage("15", "15");
    const tile16 = carteDuNiveau.addTilesetImage("16", "16");
    const tile17 = carteDuNiveau.addTilesetImage("17", "17");
    const polarBear = carteDuNiveau.addTilesetImage("Polarbear", "Polarbear");
    const bg = carteDuNiveau.addTilesetImage("BG", "BG");

    // Vous pouvez maintenant les combiner dans un seul tableau
    const tileset2 = [
      crate, Crystal, iceBox, snowMan, tree1, tree2,
      tile1, tile2, tile3, tile7, tile14, tile15, tile16, tile17,
      polarBear, bg
    ];


    const calque_BG = carteDuNiveau.createLayer("calque_BG", tileset2);
    const deco = carteDuNiveau.createLayer("deco", tileset2);
    const calque_plateform = carteDuNiveau.createLayer("calque_plateform", tileset2);
    calque_plateform.setCollisionByProperty({ estSolide: true });
    this.piquants = carteDuNiveau.createLayer("piquants", tileset2);
    const animal = carteDuNiveau.createLayer("animal", tileset2);


   
    this.player = this.physics.add.sprite(100, 450, "img_dino");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);

    this.clavier = this.input.keyboard.createCursorKeys();
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.physics.add.collider(this.player, calque_plateform)
    this.player2 = this.physics.add.sprite(100, 450, "img_dino2");
    this.player2.refreshBody();
    this.player2.setBounce(0.2);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player2, calque_plateform);    
    this.physics.world.setBounds(0,0,6400,640);
    this.cameras.main.setBounds(0,0,6400,640);
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.flipX=true;
      this.player.setVelocityX(-160);
      this.player.anims.play("animdino_marche", true);
    } else if (this.clavier.right.isDown) {
      this.player.flipX=false;
      this.player.setVelocityX(160);
      this.player.anims.play("animdino_marche", true);
    } else if (this.keyD.isDown) {
      this.player2.flipX=false;
      this.player2.setVelocityX(160);
      this.player2.anims.play("animdino2_marche", true);
    } else if (this.keyQ.isDown) {
      this.player2.setVelocityX(-160);
      this.player2.anims.play("animdino2_marche", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("animdino_face");
      this.player2.setVelocityX(0);
      this.player2.anims.play("animdino2_face");
    }
    this.player.setScale(2);
    this.player2.setScale(2);


    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
    }
    if (this.keyZ.isDown && this.player2.body.blocked.down) {
      this.player2.setVelocityY(-330);
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour) || this.physics.overlap(this.player2, this.porte_retour)) {
        this.scene.start("selection");
      }
    }
  }
}