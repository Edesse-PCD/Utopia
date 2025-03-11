// chargement des librairies

export default class niveau4 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau4" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
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
  this.load.image("Tree_2", "src/assets/Niveau4/Tree_2.png");
  
  // chargement de la carte
this.load.tilemapTiledJSON("CarteJungle", "src/assets/Niveau4/MapJungle.json"); 
 
  


    }
  
    create() {

      // Chargement de la carte
const carteDuNiveau = this.add.tilemap("CarteJungle");

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
    carteDuNiveau.addTilesetImage("Tree_2", "Tree_2"),
    
    
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

// Calque Animal : Objets ramassables (Animal)
const calque_Animal = carteDuNiveau.createLayer(
  "Animal",
  tilesets
);

// Calque feuillageSolide : feuillageSolide)
const calque_feuillageSolide = carteDuNiveau.createLayer(
  "feuillageSolide",
  tilesets
);
calque_feuillageSolide.setCollisionByProperty({ EstSolide: true })

// Calque Lianes :Lianes
const calque_Lianes = carteDuNiveau.createLayer(
  "Lianes",
  tilesets
);

 


    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1"); 
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 4   ", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
      });

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.physics.add.collider(this.player, calque_feuillageSolide);
    this.physics.add.collider(this.player, this.calque_cabane);
    this.physics.add.collider(this.player, this.calque_ajoutCabane);
    
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    
    this.player2 = this.physics.add.sprite(100, 450, "img_perso");
    this.physics.add.collider(this.player2, calque_feuillageSolide);
    this.player2.refreshBody();
    this.player2.setBounce(0.2);
    this.player2.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player2, this.groupe_plateformes);

    // Redimensionnement du monde avec les dimensions calculées via Tiled
this.physics.world.setBounds(0, 0, 6400, 640);

// Définition de la caméra pour couvrir toute la map
this.cameras.main.setBounds(0, 0, 6400, 640);

// Ancrage de la caméra sur le joueur
this.cameras.main.startFollow(this.player);

this.player.setScale(2);
this.player2.setScale(2);
    
    
    }
  
    update() {
      // Déplacements joueur 1 (flèches directionnelles)
if (this.clavier.left.isDown) {
  this.player.setVelocityX(-160);
  this.player.anims.play("anim_tourne_gauche", true);
} else if (this.clavier.right.isDown) {
  this.player.setVelocityX(160);
  this.player.anims.play("anim_tourne_droite", true);
} else {
  this.player.setVelocityX(0);
  this.player.anims.play("anim_face");
}

// Déplacements joueur 2 (touches ZQSD)
if (this.keyQ.isDown) {
  this.player2.setVelocityX(-160);
  this.player2.anims.play("anim_tourne_gauche", true);
} else if (this.keyD.isDown) {
  this.player2.setVelocityX(160);
  this.player2.anims.play("anim_tourne_droite", true);
} else {
  this.player2.setVelocityX(0);
  this.player2.anims.play("anim_face");
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
    }
  }