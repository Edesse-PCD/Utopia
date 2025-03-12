// chargement des librairies
import gameState from "../index.js";

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    // chargement tuiles de jeu
    // Chargement des tuiles de jeu
    this.load.image("imagedepart", "src/assets/niveau1/imagedepart.png");
    this.load.image("elephantcute1", "src/assets/elephantcute1.png");
    this.load.image("ours", "src/assets/niveau2/ours.png");
    this.load.image("tileset_oiseau", "src/assets/Niveau_3/Oiseau.png");
    this.load.image("Panda", "src/assets/Niveau4/Panda.png");
    this.load.image("tileset_image", "src/assets/victoire_image.png");
    this.load.image("bouton","src/assets/bouton.png")
    this.load.image("aset_deserts", "src/assets/niveau1/BG.png");
    this.load.image("Bush (1)", "src/assets/niveau1/Bush (1).png");
    this.load.image("Bush (2)", "src/assets/niveau1/Bush (2).png");
    this.load.image("Cactus (1)", "src/assets/niveau1/Cactus (1).png");
    this.load.image("Crate", "src/assets/niveau1/Crate.png");
    this.load.image("Grass (2)", "src/assets/niveau1/Grass (2).png");
    this.load.image("SignArrow", "src/assets/niveau1/SignArrow.png");
    this.load.image("Skeleton", "src/assets/niveau1/Skeleton.png");
    this.load.image("StoneBlock", "src/assets/niveau1/StoneBlock.png");
    this.load.image("Tree", "src/assets/niveau1/Tree.png");

    this.load.image("1", "src/assets/niveau1/1.png");
    this.load.image("2", "src/assets/niveau1/2.png");
    this.load.image("3", "src/assets/niveau1/3.png");
    this.load.image("4", "src/assets/niveau1/4.png");
    this.load.image("5", "src/assets/niveau1/5.png");
    this.load.image("6", "src/assets/niveau1/6.png");
    this.load.image("7", "src/assets/niveau1/7.png");
    this.load.image("8", "src/assets/niveau1/8.png");
    this.load.image("9", "src/assets/niveau1/9.png");
    this.load.image("10", "src/assets/niveau1/10.png");
    this.load.image("11", "src/assets/niveau1/11.png");
    this.load.image("12", "src/assets/niveau1/12.png");
    this.load.image("13", "src/assets/niveau1/13.png");
    this.load.image("14", "src/assets/niveau1/14.png");
    this.load.image("15", "src/assets/niveau1/15.png");
    this.load.image("16", "src/assets/niveau1/16.png");
    this.load.image("0017", "src/assets/niveau1/0017.png");




    // chargement de la carte
    this.load.tilemapTiledJSON("map", "src/assets/niveau1/utopia niveau 1 map.tmj")

  }



  create() {

    // Afficher l'image d'introduction
    this.image_2_depart_niveau_1 = this.add.image(400, 300, "imagedepart").setDepth(10).setScale(0.8);



    // Ajouter la gestion de la touche "Entrée"
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.gameStarted = false;  // Initialiser la variable gameStarted à false


    // Position de départ (respawn du joueur)
    this.startPosition = { x: 100, y: 450 };

    this.deathMessage = null;

    // Chargement de la carte
    const carteDuNiveau = this.add.tilemap("map");

    // Ajout de chaque tileset individuellement
    const tilesets = [
      carteDuNiveau.addTilesetImage("aset_deserts", "aset_deserts"),
      carteDuNiveau.addTilesetImage("Bush (1)", "Bush (1)"),
      carteDuNiveau.addTilesetImage("Bush (2)", "Bush (2)"),
      carteDuNiveau.addTilesetImage("Cactus (1)", "Cactus (1)"),
      carteDuNiveau.addTilesetImage("Crate", "Crate"),
      carteDuNiveau.addTilesetImage("Grass (2)", "Grass (2)"),
      carteDuNiveau.addTilesetImage("SignArrow", "SignArrow"),
      carteDuNiveau.addTilesetImage("Skeleton", "Skeleton"),
      carteDuNiveau.addTilesetImage("StoneBlock", "StoneBlock"),
      carteDuNiveau.addTilesetImage("Tree", "Tree"),
      carteDuNiveau.addTilesetImage("1", "1"),
      carteDuNiveau.addTilesetImage("2", "2"),
      carteDuNiveau.addTilesetImage("3", "3"),
      carteDuNiveau.addTilesetImage("4", "4"),
      carteDuNiveau.addTilesetImage("5", "5"),
      carteDuNiveau.addTilesetImage("6", "6"),
      carteDuNiveau.addTilesetImage("7", "7"),
      carteDuNiveau.addTilesetImage("8", "8"),
      carteDuNiveau.addTilesetImage("9", "9"),
      carteDuNiveau.addTilesetImage("10", "10"),
      carteDuNiveau.addTilesetImage("11", "11"),
      carteDuNiveau.addTilesetImage("12", "12"),
      carteDuNiveau.addTilesetImage("13", "13"),
      carteDuNiveau.addTilesetImage("14", "14"),
      carteDuNiveau.addTilesetImage("15", "15"),
      carteDuNiveau.addTilesetImage("16", "16"),
      carteDuNiveau.addTilesetImage("0017", "0017"),
    ];



    // Chargement des calques avec les bons tilesets

    // pas que j'oublie de changer le nom ici prsk j'ai renommer dans tiled hier

    // Calque 1 : Arrière-plan
    const calque_background = carteDuNiveau.createLayer(
      "Calque de Tuiles 1",
      tilesets
    );

    // Calque 2 : Plateformes et murs (collision avec le joueur)
    const calque_plateformes = carteDuNiveau.createLayer(
      "Calque de Tuiles 2",
      tilesets
    );
    calque_plateformes.setCollisionByProperty({ estSolide: true });

    // Calque 3 : Cactus et objets dangereux (collision et mort du joueur)
    this.calque_dangers = carteDuNiveau.createLayer(
      "Calque de Tuiles 3",
      tilesets
    );
    // Transformer le calque de danger en objets physiques

    // Calque 5 : Objets traversables
    const calque_objetsTraversables = carteDuNiveau.createLayer(
      "Calque de Tuiles 5",
      tilesets
    );







    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.player = this.physics.add.sprite(100, 450, "img_dino");
    this.physics.add.collider(this.player, calque_plateformes);
    this.player.refreshBody();
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.physics.add.collider(this.player, this.groupe_plateformes);
    this.player2 = this.physics.add.sprite(100, 450, "img_dino2");
    this.physics.add.collider(this.player2, calque_plateformes);
    this.player2.refreshBody();
    this.player2.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player2, this.groupe_plateformes);
    this.elephant = this.physics.add.sprite(5550, 110, "elephantcute1");
    this.elephant.setImmovable(true); // L'oiseau ne doit pas bouger s'il est touché
this.elephant.body.allowGravity = false; // Il ne doit pas tomber

    // Redimensionnement du monde avec les dimensions calculées via Tiled
    this.physics.world.setBounds(0, 0, 6400, 640);

    // Définition de la caméra pour couvrir toute la map
    this.cameras.main.setBounds(0, 0, 6400, 640

    );


this.animalIcons = [];

for (let i = 0; i < 4; i++) {
  let iconKey = gameState.capturedAnimals[i] ? "elephantcute1" : "elephantcute1";
  let icon = this.add.image(50 + i * 100, 50, iconKey).setScrollFactor(0).setScale(0.5);
  this.animalIcons.push(icon);
}

  }




  update() {
    // tracking du joueur
    this.cameras.main.startFollow(this.player);

    // Détection de l'overlap entre les joueurs et les objets dangereux
    this.player.setScale(2);
    this.player2.setScale(2);

    //gagner interagie avec l'elephant

    this.physics.add.overlap(this.player, this.elephant, () => {
      if (this.physics.overlap(this.player2, this.elephant)) {
          this.gagner();
      }
    }, null, this);
     // Création du bouton en haut à droite
     this.boutonMenu = this.add.image(
      this.cameras.main.width - 50, // Position X en haut à droite
      25, // Position Y en haut
      "bouton" // Clé de ton image de bouton
    ).setOrigin(0.5)
    .setScrollFactor(0) // Rendre le bouton fixe par rapport à la caméra
    .setInteractive().setScale(0.10);
    
    // Ajouter le texte "Menu" par-dessus le bouton
    this.texteMenu = this.add.text(
      this.boutonMenu.x, // Position X centrée sur le bouton
      this.boutonMenu.y, // Position Y centrée sur le bouton
      "Menu",
      {
          font: "20px Arial",
          fill: "#000",   // Texte en noir
          align: "center"
      }
    ).setOrigin(0.5)
    .setScrollFactor(0); // Rendre le texte fixe par rapport à la caméra
    
    // Rendre le bouton cliquable
    this.boutonMenu.on("pointerdown", () => {
      this.scene.start("selection");
    });


    // Vérifier si la touche "Entrée" est pressée pour démarrer le jeu
    if (!this.gameStarted && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.image_2_depart_niveau_1.destroy();  // Supprimer l'image d'intro
      this.gameStarted = true;
    }

    // Supposons que vous avez un calque 'danger' et un personnage (player)
    let messageDisplayed = false; // Pour s'assurer que le message n'est affiché qu'une seule fois


    // Obtenez la position du personnage en haut au centre
    let playerTopCenter = this.player.getTopCenter();

    let playerBottomCenter = this.player.getBottomCenter();

    // Vérifiez si le joueur interagit avec une tuile du calque danger
    let dangerTile = this.calque_dangers.getTileAtWorldXY(playerTopCenter.x, playerTopCenter.y);
    let dangerTile2 = this.calque_dangers.getTileAtWorldXY(playerBottomCenter.x, playerBottomCenter.y);

    if (dangerTile || dangerTile2) {
      if (!this.deathMessage) {
        this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', {
          font: '32px Arial',
          fill: '#fff',
          backgroundColor: '#000'
        }).setOrigin(0.5).setScrollFactor(0);
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
    let dangerTile3 = this.calque_dangers.getTileAtWorldXY(player2TopCenter.x, player2TopCenter.y);
    let dangerTile4 = this.calque_dangers.getTileAtWorldXY(player2BottomCenter.x, player2BottomCenter.y);

    if (dangerTile3 || dangerTile4) {
      if (!this.deathMessage) {
        this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', {
          font: '32px Arial',
          fill: '#fff',
          backgroundColor: '#000'
        }).setOrigin(0.5).setScrollFactor(0);
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
      });


    }






    // Déplacements joueur 1 (flèches directionnelles)
    if (this.clavier.left.isDown) {
      this.player.flipX = true;
      this.player.setVelocityX(-160);
      this.player.anims.play("animdino_marche", true);
    } else if (this.clavier.right.isDown) {
      this.player.flipX = false;
      this.player.setVelocityX(160);
      this.player.anims.play("animdino_marche", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("animdino_face");
    }


    // Déplacements joueur 2 (touches ZQSD)
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
    

    // Saut joueur 1 (flèche haut)
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
    }

    // Saut joueur 2 (touche Z)
    if (this.keyZ.isDown && this.player2.body.blocked.down) {
      this.player2.setVelocityY(-330);
    }

    // Interaction avec la porte (barre espace)
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
      if (this.physics.overlap(this.player, this.porte_retour) || this.physics.overlap(this.player2, this.porte_retour)) {
        this.scene.start("selection");
      }
    }
    for (let i = 0; i < this.animalIcons.length; i++) {
      let iconKey = gameState.capturedAnimals[i] ? "elephantcute1" : "elephantcute1";
      this.animalIcons[i].setTexture(iconKey);
    }

  }


  gagner() {

        // Marquer le premier animal comme acquis
        this.capturedAnimals[0] = true; 

        // Mettre à jour l'affichage
        this.animalsIcons[0].setTexture("animal1_acquis");

        
    // Affichage du message de victoire
      // Affichage de l'image de victoire
      this.add.image(
        this.cameras.main.worldView.x + this.cameras.main.width / 2, // Position X centrée
        this.cameras.main.worldView.y + this.cameras.main.height / 2, // Position Y centrée
        "tileset_image" // Clé de l'image à afficher
    ).setOrigin(0.5);
  
    // Désactive les mouvements du joueur
    this.player.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player.anims.stop();
    this.player2.setVelocity(0, 0); // Immobilise le joueur en arrêtant ses vitesses X et Y
    this.player2.anims.stop();  // Stoppe l'animation du joueur
    this.physics.world.pause(); // Met en pause la physique du monde (plus rien ne bouge)
  
  // Afficher l'asset de bouton
let boutonMenu = this.add.image(
  this.cameras.main.worldView.x + this.cameras.main.width / 2, // Position X centrée
  this.cameras.main.worldView.y + this.cameras.main.height / 2 + 240, // Position Y sous l'image
  "bouton" // Clé de ton image de bouton
).setOrigin(0.5)
.setInteractive().setScale(0.15);

// Ajouter le texte "Menu" par-dessus le bouton
let texteMenu = this.add.text(
  boutonMenu.x, // Position X centrée sur le bouton
  boutonMenu.y, // Position Y centrée sur le bouton
  "Menu",
  {
      font: "20px Arial",
      fill: "#000",   // Texte en noir
      align: "center"
  }
).setOrigin(0.5);

// Rendre le bouton cliquable
boutonMenu.on("pointerdown", () => {
  this.scene.start("selection");
});

  }
}

