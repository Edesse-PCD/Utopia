// chargement des librairies

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    // chargement tuiles de jeu
    this.load.image("tileset_assets", "src/assets/Niveau_3/Assets.png");
    this.load.image("tileset_oiseau", "src/assets/Niveau_3/Oiseau.png");
    this.load.image("tileset_tuiles", "src/assets/Niveau_3/tuiles_de_jeu.png");
    this.load.image("tileset_image", "src/assets/ victoire_image.png");
    

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/Niveau_3/map.json");
  }

  create() {

    // chargement du jeu de tuiles
    const carteDuNiveau = this.add.tilemap("carte");
    const tileset = carteDuNiveau.addTilesetImage(
      "tuiles_de_jeu",
      "tileset_tuiles"

    );
    const tso = carteDuNiveau.addTilesetImage(
      "oiseau",
      "tileset_oiseau"

    );
    const tsa = carteDuNiveau.addTilesetImage(
      "Assets",
      "tileset_assets"

    );

    const calque_background = carteDuNiveau.createLayer(
      "Background",
      tileset
    );

    // chargement du calque calque_background_2
    const calque_background_2 = carteDuNiveau.createLayer(
      "Background_2",
      tsa
    );

    // chargement du calque calque_plateformes
    const calque_plateformes = carteDuNiveau.createLayer(
      "Plateformes",
      tsa
    );
    calque_plateformes.setScale(2);
    calque_background.setScale(2);
    calque_background_2.setScale(2);
    
    calque_plateformes.setCollisionByProperty({ estSolide: true });

   

    this.physics.world.setBounds(0, 0, 6400, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 6400, 640);





    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 3", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.player = this.physics.add.sprite(350, 450, "img_dino");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, calque_plateformes);

    
    this.clavier = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    this.player2 = this.physics.add.sprite(375, 450, "img_dino2");
    this.player2.refreshBody();
    this.player2.setBounce(0.2);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player2, calque_plateformes);
    this.player.setScale(2);
    this.player2.setScale(2);


    this.oiseau = this.physics.add.sprite(300, 300, "tileset_oiseau");
  
  
this.oiseau.setImmovable(true); // L'oiseau ne doit pas bouger s'il est touché
this.oiseau.body.allowGravity = false; // Il ne doit pas tomber

// Détection de collision entre le joueur et l'oiseau
this.physics.add.overlap(this.player, this.oiseau, this.gagner, null, this);
this.physics.add.overlap(this.player2, this.oiseau, this.gagner2, null, this);

// Ajout d'une touche pour redémarrer au niveau 1
this.toucheEntree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

this.startPosition = { x: 375, y: 450 };

this.deathMessage = null; 

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
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("animdino_face");}
    
    if (this.keyD.isDown) {
      this.player2.flipX=false;
      this.player2.setVelocityX(160);
      this.player2.anims.play("animdino2_marche", true);
    } else if (this.keyQ.isDown) {
      this.player2.flipX=true;
      this.player2.setVelocityX(-160);
      this.player2.anims.play("animdino2_marche", true);
    } else {
      this.player2.setVelocityX(0);
      this.player2.anims.play("animdino2_face");
    }

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
    






  // Mort joueur 1
if (this.player.y >= this.cameras.main.height && !this.deathMessage) {
  // Afficher le message de mort s'il n'existe pas déjà
  this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { 
    font: '32px Arial', 
    fill: '#fff', 
    backgroundColor: '#000' 
  });
  
  // Désactiver le corps physique du joueur 1
  this.player.setVelocity(0, 0);
  this.player.body.enable = false;

  // Redémarrer la scène après 500 ms
  this.time.delayedCall(500, () => {
    this.scene.restart();
  });
}

// Mort joueur 2
if (this.player2.y >= this.cameras.main.height && !this.deathMessage) {
  // Afficher le message de mort s'il n'existe pas déjà
  this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { 
    font: '32px Arial', 
    fill: '#fff', 
    backgroundColor: '#000' 
  });
  
  // Désactiver le corps physique du joueur 2
  this.player2.setVelocity(0, 0);
  this.player2.body.enable = false;

  // Redémarrer la scène après 500 ms
  this.time.delayedCall(500, () => {
    this.scene.restart();
  });
}
  }
}