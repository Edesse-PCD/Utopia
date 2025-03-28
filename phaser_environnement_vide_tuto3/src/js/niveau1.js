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
    this.load.image("imageNiveau1","src/assets/niveau1/imageNiveau1.png")
    this.load.image("0017", "src/assets/niveau1/0017.png");
    this.load.audio('background1', 'src/assets/niveau1/western.mp3'); 




    // chargement de la carte
    this.load.tilemapTiledJSON("map", "src/assets/niveau1/utopia niveau 1 map.tmj")
  
  }



  create() {
    
    if (!this.sound.get('background1')) {
      this.musique_de_fond1 = this.sound.add('background1', { loop: true });
      this.musique_de_fond1.play();  
    }else{
      this.musique_de_fond1 = this.sound.get('background1');
    }
    this.maxDistance = 700; // Distance maximale autorisée entre les joueurs
    this.imageNiveau1 = this.add.image(400, 350, "imageNiveau1").setDepth(10).setScale(0.5);
    this.boutonCommencer = this.add.image(
      this.cameras.main.width - 250, // Position X en haut à droite
      410, // Position Y en haut
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
      this.imageNiveau1.destroy();
      this.texteCommencer.destroy();
        });




    


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
    this.elephant = this.physics.add.sprite(5500, 110, "elephantcute1");
    this.elephant.setImmovable(true); // L'elephant ne doit pas bouger s'il est touché
this.elephant.body.allowGravity = false; // Il ne doit pas tomber

    // Redimensionnement du monde avec les dimensions calculées via Tiled
    this.physics.world.setBounds(0, 0, 6400, 640);
    // Définition de la caméra pour couvrir toute la map
    this.cameras.main.setBounds(0, 0, 6400, 640

    );
    this.scene.bringToTop("interfaceJeu");

  



  }


  update() {
    // tracking du joueur
    this.cameras.main.startFollow(this.player);
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player2.x, this.player2.y);

if (distance > this.maxDistance) {
    // Afficher le message de mort pour les deux joueurs
    if (!this.deathMessage){
      this.deathMessage = this.add.text(400, 300, 'Vous êtes trop éloignés! Restez coopératifs', { 
          font: '32px Georgia', 
          fill: '#fff',
      }).setOrigin(0.5).setScrollFactor(0); // Centrer par rapport à la caméra
      this.time.delayedCall(3000, () => {
        if (this.deathMessage) {
            this.deathMessage.destroy();
            this.deathMessage = null;
        }});
    
    // Désactiver les mouvements des deux joueurs
    this.player.setVelocity(0, 0);
    this.player2.setVelocity(0, 0);
    this.player.body.enable = false;
    this.player2.body.enable = false;

    // Attendre un court instant avant de les respawn
    this.time.delayedCall(50, () => {
        this.player.setPosition(this.startPosition.x, this.startPosition.y);
        this.player2.setPosition(this.startPosition.x+50, this.startPosition.y);
        this.player.body.enable = true;
        this.player2.body.enable = true;

      
    });}
}


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
    
// Ajouter l'écouteur d'événement sur le bouton
this.boutonMenu.on('pointerdown', () => {
  if (this.musique_de_fond1.isPlaying) this.musique_de_fond1.stop();  
  this.musique_de_fond1.destroy() //permet d'éviter que plusieurs pistes soient créées
  // 1. Cacher l'interface
  let interfaceJeu = this.scene.get('interfaceJeu');
  if (interfaceJeu) {
      interfaceJeu.cacherInterface();  // Cacher l'interface
  }

  // 2. Arrêter le niveau actuel 
  this.scene.stop('niveau1'); // Arrêter le niveau actuel

  // 3. Lancer la scène du menu principal
  this.scene.start('selection'); // Lancer la scène du menu principal
});





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
          font: '32px Gorgia',
          fill: '#fff',
        }).setOrigin(0.5).setScrollFactor(0);
        this.time.delayedCall(3000, () => {
          if (this.deathMessage) {
              this.deathMessage.destroy();
              this.deathMessage = null;
          }});
      
      // Désactiver les mouvements des deux joueurs
      this.player.setVelocity(0, 0);
      this.player2.setVelocity(0, 0);
      this.player.body.enable = false;
      this.player2.body.enable = false;
  
      // Attendre un court instant avant de les respawn
      this.time.delayedCall(50, () => {
          this.player.setPosition(this.startPosition.x, this.startPosition.y);
          this.player2.setPosition(this.startPosition.x+50, this.startPosition.y);
          this.player.body.enable = true;
          this.player2.body.enable = true;
  
        
      });}
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
          font: '32px Gorgia',
          fill: '#fff',
        }).setOrigin(0.5).setScrollFactor(0);
        this.time.delayedCall(3000, () => {
          if (this.deathMessage) {
              this.deathMessage.destroy();
              this.deathMessage = null;
          }});
      
      // Désactiver les mouvements des deux joueurs
      this.player.setVelocity(0, 0);
      this.player2.setVelocity(0, 0);
      this.player.body.enable = false;
      this.player2.body.enable = false;
  
      // Attendre un court instant avant de les respawn
      this.time.delayedCall(50, () => {
          this.player.setPosition(this.startPosition.x, this.startPosition.y);
          this.player2.setPosition(this.startPosition.x+50, this.startPosition.y);
          this.player.body.enable = true;
          this.player2.body.enable = true;
  
        
      });}

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

  

  }


  gagner() {




    // Affichage du message de victoire
      // Affichage de l'image de victoire
      this.add.image(
        this.cameras.main.worldView.x + this.cameras.main.width / 2, // Position X centrée
        this.cameras.main.worldView.y + this.cameras.main.height / 2, // Position Y centrée
        "tileset_image" // Clé de l'image à afficher
    ).setOrigin(0.5);

    var sij = this.scene.get("interfaceJeu");
sij.debloquerAnimal(0); //  l'éléphant
  
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
.setInteractive().setScale(0.25);

// Ajouter le texte "Menu" par-dessus le bouton
let texteMenu = this.add.text(
  boutonMenu.x, // Position X centrée sur le bouton
  boutonMenu.y, // Position Y centrée sur le bouton
  "Niveau\nSuivant",
  {
      font: "20px Arial",
      fill: "#000",   // Texte en noir
      align: "center"
  }
).setOrigin(0.5);

// Rendre le bouton cliquable
boutonMenu.on("pointerdown", () => {
  if (this.musique_de_fond1.isPlaying) this.musique_de_fond1.stop();
  this.musique_de_fond1.destroy()

  
  this.game.config.spawnX= 1270;
  this.game.config.spawnY=410;
  this.scene.start("selection");
});

  }
}

