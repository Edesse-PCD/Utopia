// chargement des librairies

export default class niveau4 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau4" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }

// Fonction pour détecter si le joueur est sur une liane


    preload() {
  // chargement tuiles de jeu
  this.load.image("crashed_plane_small", "src/assets/Niveau4/crashed_plane_small.png");
  this.load.image("Crate3_big", "src/assets/Niveau4/Crate3_big.png");
  this.load.image("croc_attack", "src/assets/Niveau4/croc_attack.png");
  this.load.image("Ground_middle_background", "src/assets/Niveau4/Ground_middle_background.png");
  this.load.image("jungle tileset", "src/assets/Niveau4/jungle tileset.png");
  this.load.image("j1", "src/assets/Niveau4/j1.png");
  this.load.image("j2", "src/assets/Niveau4/j2.png");
  this.load.image("j3", "src/assets/Niveau4/j3.png");
  this.load.image("j4", "src/assets/Niveau4/j4.png");
  this.load.image("Lifebuoy", "src/assets/Niveau4/Lifebuoy.png");
  this.load.image("Panda", "src/assets/Niveau4/Panda.png");
  this.load.image("river", "src/assets/Niveau4/river.png");
  this.load.image("Rock_pile1", "src/assets/Niveau4/Rock_pile1.png");
  this.load.image("shack1", "src/assets/Niveau4/shack1.png");
  this.load.image("shack1_bg", "src/assets/Niveau4/shack1_bg.png");
  this.load.image("shack2", "src/assets/Niveau4/shack2.png");
  this.load.image("shack3", "src/assets/Niveau4/shack3.png");
  this.load.image("Arbre", "src/assets/Niveau4/Arbre.png");
  this.load.image("bouton","src/assets/bouton.png")
  this.load.image("tileset_image", "src/assets/victoire_image.png");
  this.load.audio('background', 'src/assets/Niveau4/indiana_johns.mp3'); 
  // chargement de la carte
this.load.tilemapTiledJSON("CarteJungle", "src/assets/Niveau4/MapJungle.json"); 
 
  


    }
  
    create() {

      var musique_de_fond;
      musique_de_fond = this.sound.add('background'); 
      musique_de_fond.play();  
// Position de départ (respawn du joueur)
this.startPosition = { x: 100, y: 450 };
this.maxDistance = 700; // Distance maximale autorisée entre les joueurs
this.deathMessage = null;

      // Chargement de la carte
const carteDuNiveau = this.add.tilemap("CarteJungle");
this.map = this.make.tilemap({ key: "CarteJungle" });


// Ajout de chaque tileset individuellement
const tilesets = [
    carteDuNiveau.addTilesetImage("crashed_plane_small", "crashed_plane_small"),
    carteDuNiveau.addTilesetImage("Crate3_big", "Crate3_big"),
    carteDuNiveau.addTilesetImage("croc_attack", "croc_attack"),
    carteDuNiveau.addTilesetImage("Ground_middle_background", "Ground_middle_background"),
    carteDuNiveau.addTilesetImage("jungle tileset", "jungle tileset"),
    carteDuNiveau.addTilesetImage("j1", "j1"),
    carteDuNiveau.addTilesetImage("j1", "j1"),
    carteDuNiveau.addTilesetImage("j2", "j2"),
    carteDuNiveau.addTilesetImage("j3", "j3"),
    carteDuNiveau.addTilesetImage("j4", "j4"),
    carteDuNiveau.addTilesetImage("Lifebuoy", "Lifebuoy"),
    carteDuNiveau.addTilesetImage("Panda", "Panda"),
    carteDuNiveau.addTilesetImage("river", "river"),
    carteDuNiveau.addTilesetImage("Rock_pile1", "Rock_pile1"),
    carteDuNiveau.addTilesetImage("shack1", "shack1"),
    carteDuNiveau.addTilesetImage("shack1_bg", "shack1_bg"),
    carteDuNiveau.addTilesetImage("shack2", "shack2"),
    carteDuNiveau.addTilesetImage("shack3", "shack3"),
    carteDuNiveau.addTilesetImage("Arbre", "Arbre"),
    
    
];



// Chargement des calques avec les bons tilesets


// Calque 1 : Arrière-plan 4
const calque_j4 = carteDuNiveau.createLayer(
    "j4",
    tilesets
);

// Calque 2 : arriere plan 3
const calque_j3 = carteDuNiveau.createLayer(
    "j3",
    tilesets
);

// Calque 3 : arriere plan 2
const calque_j2 = carteDuNiveau.createLayer(
    "j2",
    tilesets
);


// Calque 5 : arriere plan 1
const calque_j1 = carteDuNiveau.createLayer(
    "j1",
    tilesets
);

// Calque cabane : cabane
const calque_cabane = carteDuNiveau.createLayer(
    "cabane",
    tilesets
);
calque_cabane.setCollisionByProperty({ EstSolide: true })



// Calque ajout cabane : ajout cabane
const calque_ajoutCabane = carteDuNiveau.createLayer(
  "ajoutCabane",
  tilesets
);
calque_ajoutCabane.setCollisionByProperty({ EstSolide: true })


// Crée le calque "danger" à partir du Tilemap
this.danger = this.map.createLayer("danger", this.tileset, 0, 0);
this.danger = carteDuNiveau.createLayer("danger", tilesets);


// Calque feuillageSolide : feuillageSolide)
const calque_feuillageSolide = carteDuNiveau.createLayer(
  "feuillageSolide",
  tilesets
);
calque_feuillageSolide.setCollisionByProperty({ EstSolide: true })


// Création du calque des lianes
this.ladder_layer = carteDuNiveau.createLayer("Lianes", tilesets);

if (this.ladder_layer) {
  this.ladder_layer.setDepth(10); // Assure que le joueur n'est pas caché
  
} else {
  console.error("⚠️ Erreur : Le calque 'Lianes' est NULL ! Vérifie son nom dans Tiled.");
}




    this.porte_retour = this.physics.add.staticSprite(150, 590, "img_porte1")
        .setDepth(-1); // Met la porte derrière tous les autres éléments 
    

    this.player = this.physics.add.sprite(100, 450, "img_dino");
    this.physics.add.collider(this.player, calque_feuillageSolide);
    this.physics.add.collider(this.player, this.calque_cabane);
    this.physics.add.collider(this.player, this.calque_ajoutCabane);
    
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    
    this.player2 = this.physics.add.sprite(100, 450, "img_dino2");
    this.physics.add.collider(this.player2, calque_feuillageSolide);
    this.player2.refreshBody();
    this.player2.setBounce(0.2);
    this.player2.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();

    this.Panda = this.physics.add.sprite(6310, 580, "Panda");
    this.Panda.setImmovable(true); // le panda ne doit pas bouger s'il est touché
    this.Panda.body.allowGravity = false; // Il ne doit pas tomber
    this.Panda.setDepth(0); // Met le Panda derrière tous les autres éléments
    

    // Redimensionnement du monde avec les dimensions calculées via Tiled
this.physics.world.setBounds(0, 0, 6400, 640);

// Définition de la caméra pour couvrir toute la map
this.cameras.main.setBounds(0, 0, 6400, 640);

// Ancrage de la caméra sur le joueur
this.cameras.main.startFollow(this.player);


// Ajout d'un booléen pour savoir si le joueur est sur une liane
this.player.onLadder = false;


this.player.setDepth(20); // Met le joueur devant
this.player2.setDepth(20); // Met aussi le 2e joueur devant
this.player.setScale(2);
this.player2.setScale(2);

//gagner interagie avec le panda

this.physics.add.overlap(this.player, this.Panda, () => {
    if (this.physics.overlap(this.player2, this.Panda)) {
        this.gagner();
    }
  }, null, this);
   // Création du bouton en haut à droite
   this.boutonMenu = this.add.image(
    this.cameras.main.width - 50, // Position X en haut à droite
    25, // Position Y en haut
    "bouton" // Clé de ton image de bouton
  )
  .setOrigin(0.5)
  .setScrollFactor(0) // Rendre le bouton fixe par rapport à la caméra
  .setInteractive()
  .setScale(0.10);

  // Appliquer setDepth() après la création
this.boutonMenu.setDepth(1000);
  
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
  )
  .setOrigin(0.5)
  .setScrollFactor(0); // Rendre le texte fixe par rapport à la caméra
  
  // Appliquer setDepth() au texte après la création
this.texteMenu.setDepth(1001);
  
  // Rendre le bouton cliquable
  this.boutonMenu.on("pointerdown", () => {
    this.scene.start("selection");
  });

    
    } 
  
    update() {
    this.checkLadder();    
  
            
    let messageDisplayed = false; // Pour s'assurer que le message n'est affiché qu'une seule fois


    // Obtenez la position du personnage en haut au centre
    let playerTopCenter = this.player.getTopCenter();

    let playerBottomCenter = this.player.getBottomCenter();
  
    // Vérifiez si le joueur interagit avec une tuile du calque danger
    console.log(this.danger);
    let dangerTile = this.danger.getTileAtWorldXY(playerTopCenter.x, playerTopCenter.y);
    let dangerTile2 = this.danger.getTileAtWorldXY(playerBottomCenter.x, playerBottomCenter.y);
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player2.x, this.player2.y);

    if (distance > this.maxDistance) {
        // Afficher le message de mort pour les deux joueurs
        if (!this.deathMessage) {
          this.deathMessage = this.add.text(400, 300, 'Vous êtes trop éloignés! Restez coopératifs', { 
              font: '32px Georgia', 
              fill: '#fff',
          }).setOrigin(0.5).setScrollFactor(0); // Centrer par rapport à la caméra
      }
        // Désactiver les mouvements des deux joueurs
        this.player.setVelocity(0, 0);
        this.player2.setVelocity(0, 0);
        this.player.body.enable = false;
        this.player2.body.enable = false;
    
        // Attendre un court instant avant de les respawn
        this.time.delayedCall(2000, () => {
            this.player.setPosition(this.startPosition.x, this.startPosition.y);
            this.player2.setPosition(this.startPosition.x+50, this.startPosition.y);
            this.player.body.enable = true;
            this.player2.body.enable = true;
    
            // Supprimer le message de mort
            if (this.deathMessage) {
                this.deathMessage.destroy();
                this.deathMessage = null;
            }
        });
    }
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
let dangerTile3 = this.danger.getTileAtWorldXY(player2TopCenter.x, player2TopCenter.y);
let dangerTile4 = this.danger.getTileAtWorldXY(player2BottomCenter.x, player2BottomCenter.y);

if (dangerTile3 || dangerTile4) {
  if (!this.deathMessage) {
      this.deathMessage = this.add.text(400, 300, 'Vous êtes mort !', { 
          font: '32px Arial', 
          fill: '#fff', 
          backgroundColor: '#000' 
      }).setOrigin(0.5).setScrollFactor(0); // Rendre le texte fixe par rapport à la caméra
      
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

      

      // Déplacement joueur 1
      if (this.clavier.left.isDown) {
        this.player.flipX=true;
        this.player.setVelocityX(-1600);
        this.player.anims.play("animdino_marche", true); // player 1 tourne a gauche
      } else if (this.clavier.right.isDown) {
        this.player.flipX=false;
        this.player.setVelocityX(1600);
        this.player.anims.play("animdino_marche", true); // player 1 tourne a droite
      } else if (this.keyD.isDown) {
        this.player2.flipX=false;
        this.player2.setVelocityX(160);
        this.player2.anims.play("animdino2_marche", true); // player 2 tourne a droite
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
      
        if (this.clavier.up.isDown && this.player.body.blocked.down) {
          this.player.setVelocityY(-2450);
      }
    
        // Saut joueur 2
        if (this.keyZ.isDown && this.player2.body.blocked.down) {
            this.player2.setVelocityY(-245);
        }
    
        // Gestion des lianes pour **les deux joueurs**
        this.handleLadderMovement(this.player, this.clavier.up, this.clavier.down);
        this.handleLadderMovement(this.player2, this.keyZ, this.keyS);
    
        // Interaction avec la porte
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
            if (this.physics.overlap(this.player, this.porte_retour) || this.physics.overlap(this.player2, this.porte_retour)) {
                this.scene.start("selection");
            }
        }
  }
  
  /**
   * Gère le mouvement d'un joueur sur les lianes.
   */
  handleLadderMovement(player, keyUp, keyDown) {
    if (!keyUp || !keyDown) return; // Vérifier que les touches existent

    if (player.onLadder) {
        player.body.setAllowGravity(false); // Désactiver la gravité
        console.log(`🧗‍♂️ Player ${player === this.player ? "1" : "2"} sur une liane !`);

        // Déplacement vertical
        if (keyUp.isDown) {
            player.setVelocityY(-100); // Monter
            console.log("⬆️ Monte !");
        } else if (keyDown.isDown) {
            player.setVelocityY(100); // Descendre
            console.log("⬇️ Descend !");
        } else {
            player.setVelocityY(0); // Arrêt
        }
    } else {
        player.body.setAllowGravity(true); // Réactiver la gravité si pas sur une liane
    }

    

    }
    checkLadder() {
 // Vérification que le calque de lianes est bien défini
 if (!this.ladder_layer) {
  
  return;
}

      // Récupération des tuiles du calque liane sur lesquelles se trouve le joueur
      const playerTileUp = this.ladder_layer.getTileAtWorldXY(this.player.x, this.player.getTopCenter().y + 1);
      const playerTileDown = this.ladder_layer.getTileAtWorldXY(this.player.x, this.player.getBottomCenter().y - 1);
    
      // Si le joueur 1 touche une liane, annuler la gravité et activer le mode grimpe
      if (playerTileUp || playerTileDown) {
          this.player.onLadder = true;
          this.player.body.setAllowGravity(false);          
          this.player.setVelocityY(0);
        
      } else {
        
          this.player.onLadder = false;
          this.player.body.setAllowGravity(true);
          
      }
    // Vérification pour **player2**
    const player2TileUp = this.ladder_layer.getTileAtWorldXY(this.player2.x, this.player2.getTopCenter().y + 1);
    const player2TileDown = this.ladder_layer.getTileAtWorldXY(this.player2.x, this.player2.getBottomCenter().y - 1);

    if (player2TileUp || player2TileDown) {
        this.player2.onLadder = true;
       this.player2.body.setAllowGravity(false);
        this.player2.setVelocityY(0);
    } else {
         this.player2.onLadder = false;
        this.player2.body.setAllowGravity(true);
    }

    }


    gagner() {
      console.log("Affichage du message de victoire !");  

 // Affichage du message de victoire
      // Affichage de l'image de victoire
      this.add.image(
        this.cameras.main.worldView.x + this.cameras.main.width / 2, // Position X centrée
        this.cameras.main.worldView.y + this.cameras.main.height / 2, // Position Y centrée
        "tileset_image" // Clé de l'image à afficher
    ).setOrigin(0.5)
    .setDepth(100); // Premier plan
        
   
  
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
.setInteractive()
.setScale(0.15).setDepth(100);// Premier plan


// Ajouter le texte "Menu" par-dessus le bouton
let texteMenu = this.add.text(
  boutonMenu.x, // Position X centrée sur le bouton
  boutonMenu.y, // Position Y centrée sur le bouton
  "Niveau\nsuivant",
  {
      font: "20px Arial",
      fill: "#000",   // Texte en noir
      align: "center"
  }
).setOrigin(0.5).setDepth(100);

// Rendre le bouton cliquable
boutonMenu.on("pointerdown", () => {
  this.scene.start("selection");
});


}

}

//ajout inutile