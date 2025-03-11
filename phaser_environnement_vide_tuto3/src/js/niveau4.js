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
  this.load.image("shack2", "src/assets/Niveau4/shack2.png");
  this.load.image("Tree_2", "src/assets/Niveau4/Tree_2.png");

  // chargement de la carte
this.load.tilemapTiledJSON("CarteJungle", "src/assets/Niveau4/MapJungle.json"); 
 
  


    }
  
    create() {
    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("CarteJungle");

    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage(
          "j1",
          "j1"
        );    




      
      this.groupe_plateformes = this.physics.add.staticGroup();
      
      this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");
      // ajout d'un texte distintcif  du niveau
      this.add.text(400, 100, "Vous êtes dans le niveau 4", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "22pt"
      });
  
      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.refreshBody();
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.clavier = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groupe_plateformes);
    }
  
    update() {
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
      if (this.clavier.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
      if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
        if (this.physics.overlap(this.player, this.porte_retour)) {
          this.scene.start("selection");
          }
      } 
    }
  }