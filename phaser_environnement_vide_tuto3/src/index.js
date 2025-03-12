// chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
import selection from "./js/selection.js"; 
import niveau1 from "./js/niveau1.js"; 
import niveau2 from "./js/niveau2.js";
import niveau3 from "./js/niveau3.js"; 
import niveau4 from "./js/niveau4.js";
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
      //debug: true 
    }
  },
  scene: [selection, niveau1,niveau2, niveau3,niveau4] 
  }

var game = new Phaser.Game(config);
game.scene.start("selection");

const gameState = {
  capturedAnimals: [false, false, false, false] // Un tableau pour suivre les animaux capturés par niveau
};

export default gameState;
window.progressionAnimaux = [false, false, false, false]; // Tous non capturés au début

