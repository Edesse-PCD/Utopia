// chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
import selection from "./js/selection.js"; 
import niveau1 from "./js/niveau1.js"; 
import niveau2 from "./js/niveau2.js";
import niveau3 from "./js/niveau3.js"; 
var config = {
  type: Phaser.AUTO,
  width: 800, 
  height: 600, 
  physics: {
    
    default: "arcade", 
    arcade: {
     
      gravity: {
        y: 300 
      },
      debug: false 
    }
  },
  scene: [selection, niveau1,niveau2, niveau3] 
  }

var game = new Phaser.Game(config);
game.scene.start("selection");

