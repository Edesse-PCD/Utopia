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
    this.load.image("ours", "src/assets/niveau2/ours.png");
    this.load.image("tileset_image", "src/assets/Niveau_3/victoire_image.png");

    this.load.tilemapTiledJSON("map2", "src/assets/niveau2/mapBanquise.json");
  }


  create() {
    this.startPosition = { x: 100, y: 450 };
    this.deathMessage = null;

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
    this.ours = this.physics.add.sprite(6350, 340, "ours");
    this.ours.setImmovable(true); // L'oiseau ne doit pas bouger s'il est touché
this.ours.body.allowGravity = false; // Il ne doit pas tomber

// Détection de collision entre le joueur et l'oiseau
this.physics.add.overlap(this.player, this.ours, this.gagner, null, this);
this.physics.add.overlap(this.player2, this.ours, this.gagner2, null, this);


// Ajout d'une touche pour redémarrer au niveau 1
this.toucheEntree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  }

  update() {
    let messageDisplayed = false; // Pour s'assurer que le message n'est affiché qu'une seule fois


    // Obtenez la position du personnage en haut au centre
    let playerTopCenter = this.player.getTopCenter();

    let playerBottomCenter = this.player.getBottomCenter();
  
    // Vérifiez si le joueur interagit avec une tuile du calque danger
    let dangerTile = this.piquants.getTileAtWorldXY(playerTopCenter.x, playerTopCenter.y);
    let dangerTile2 = this.piquants.getTileAtWorldXY(playerBottomCenter.x, playerBottomCenter.y);

    if (dangerTile || dangerTile2) {
      if (!this.deathMessage) {
          this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { 
              font: '32px Arial', 
              fill: '#fff', 
              backgroundColor: '#000' 
          });
      }
  

            // Désactiver le corps physique du joueur temporairement
    this.player.setVelocity(0, 0); // Stoppe les mouvements
    this.player.body.enable = false; 

    // Attendre un court instant avant de le faire respawn (évite un bug de collision)
    this.time.delayedCall(500, () => {
        this.player.setPosition(this.startPosition.x, this.startPosition.y); // Respawn au point de départ
        this.player.body.enable = true; // Réactiver le corps du joueur
        

        // Supprimer le message de mort
        if (this.deathMessage) {
          this.deathMessage.destroy();
          this.deathMessage = null;
      }
    });
    
        
    }

    // gestion de la mort et respawn du JOUEUR 2 

    // Supposons que vous avez un calque 'danger' et un personnage (player)
let message2Displayed = false; // Pour s'assurer que le message n'est affiché qu'une seule fois


// Obtenez la position du personnage en haut au centre
let player2TopCenter = this.player2.getTopCenter();

let player2BottomCenter = this.player2.getBottomCenter();

// Vérifiez si le joueur interagit avec une tuile du calque danger
let dangerTile3 = this.piquants.getTileAtWorldXY(player2TopCenter.x, player2TopCenter.y);
let dangerTile4 = this.piquants.getTileAtWorldXY(player2BottomCenter.x, player2BottomCenter.y);

if (dangerTile3 || dangerTile4) {
  if (!this.deathMessage) {
      this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { 
          font: '32px Arial', 
          fill: '#fff', 
          backgroundColor: '#000' 
      });
  }


        // Désactiver le corps physique du joueur temporairement
this.player2.setVelocity(0, 0); // Stoppe les mouvements
this.player2.body.enable = false; 

// Attendre un court instant avant de le faire respawn (évite un bug de collision)
this.time.delayedCall(500, () => {
    this.player2.setPosition(this.startPosition.x, this.startPosition.y); // Respawn au point de départ
    this.player2.body.enable = true; // Réactiver le corps du joueur
    

    // Supprimer le message de mort
    if (this.deathMessage) {
      this.deathMessage.destroy();
      this.deathMessage = null;
  }
});}



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
      this.player2.flipX=true;

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


  gagner() {
    // Affichage du message de victoire
      // Affichage de l'image de victoire
      this.add.image(
        this.player.x-400, // Position X du joueur 2
        this.player.y+500, // Position Y du joueur 2
        "tileset_image" // Clé de l'image à afficher
      ).setOrigin(0.5); // Centrer l'image
  
    // Désactive les mouvements du joueur
    this.player.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player.anims.stop();
    this.player2.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player2.anims.stop();  // Stoppe l'animation du joueur
    this.physics.world.pause(); // Met en pause la physique du monde (plus rien ne bouge)
  
    // Ajout d'un écouteur d'événement sur la touche "Entrée"
    this.input.keyboard.on("keydown-ENTER", () => {
        this.scene.start("selection"); // Charge la scène du niveau 1 quand on appuie sur Entrée
    });
  }
  gagner2() {
    // Affichage du message de victoire
    this.add.image(
      this.player2.x-400, // Position X du joueur 2
      this.player2.y +500, // Position Y légèrement au-dessus du joueur 2
      "tileset_image" // Clé de l'image à afficher
    ).setOrigin(0.5);
  
    // Désactive les mouvements du joueur
    this.player.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player.anims.stop();
    this.player2.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player2.anims.stop(); // Stoppe l'animation du joueur
    this.physics.world.pause(); // Met en pause la physique du monde (plus rien ne bouge)
  
    // Ajout d'un écouteur d'événement sur la touche "Entrée"
    this.input.keyboard.on("keydown-ENTER", () => {
        this.scene.start("selection"); // Charge la scène du niveau 1 quand on appuie sur Entrée
    });
  }
}
