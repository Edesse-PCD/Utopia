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
this.load.image("Phaser_tuilesdejeu", "src/assets/Assets.png");
this.load.image("Phaser_tuilesdejeu", "src/assets/Oiseau.png");
this.load.image("Phaser_tuilesdejeu", "src/assets/tuiles_de_jeu.png");
// chargement de la carte
this.load.tilemapTiledJSON("carte", "src/assets/map.json");  
    }
  
    create() {
     
// chargement du jeu de tuiles
const tileset = carteDuNiveau.addTilesetImage(
          "tuiles_de_jeu",
          "Phaser_tuilesdejeu"
        );  

        const calque_background = carteDuNiveau.createLayer(
          "Background",
          tileset
        );

// chargement du calque calque_background_2
const calque_background_2 = carteDuNiveau.createLayer(
          "Background_2",
          tileset
        );

// chargement du calque calque_plateformes
const calque_plateformes = carteDuNiveau.createLayer(
          "Plateformes",
          tileset
        );  

        calque_plateformes.setCollisionByProperty({ estSolide: true }); 
        this.physics.add.collider(player, plateforme); 
        const carteDuNiveau = this.add.tilemap("carte");
        this.physics.world.setBounds(0, 0, 3200, 640);
  //  ajout du champs de la caméra de taille identique à celle du monde
  this.cameras.main.setBounds(0, 0, 3200, 640);
  // ancrage de la caméra sur le joueur
  this.cameras.main.startFollow(player); 
  


     
      this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");
      // ajout d'un texte distintcif  du niveau
      this.add.text(400, 100, "Vous êtes dans le niveau 3", {
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
      if (clavier.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-200);
      
      }
      if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
        if (this.physics.overlap(this.player, this.porte_retour)) {
          this.scene.start("selection");
          }
      } 
    }
  }