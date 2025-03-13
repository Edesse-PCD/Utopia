export default class interfaceJeu extends Phaser.Scene {
    constructor() {
        super({ key: "interfaceJeu", active: true });


        // Tableau pour suivre les animaux débloqués
        this.animauxDebloques = [false, false, false, false]; 
    }

    preload() {
        this.load.image("elephantcute1", "src/assets/elephantcute1.png");
        this.load.image("ours", "src/assets/niveau2/ourspolaire.png");
        this.load.image("tileset_oiseau", "src/assets/Niveau_3/Oiseau.png");
        this.load.image("Panda", "src/assets/Niveau4/Panda.png");
        this.load.image("bouton","src/assets/bouton.png")

    }
    create() {
        // Barre des tâches
        this.barreTaches = this.add.graphics();
        this.barreTaches.fillStyle(0x000000, 0.5);
        this.barreTaches.fillRect(0, 0, this.cameras.main.width, 80);

        // Création des cases vides
        this.cases = [];
        this.animaux = ["elephantcute1", "ours", "tileset_oiseau", "Panda"];

        for (let i = 0; i < 4; i++) {
            // Case vide
            let caseVide = this.add.rectangle(50 + i * 100, 40, 80, 80, 0xffffff)
                .setStrokeStyle(2, 0x000000);
            this.cases.push(caseVide);

            // Ajout des animaux invisibles au départ
            let animal = this.add.image(50 + i * 100, 40, this.animaux[i])
                .setScale(0.5)
                .setVisible(false);
            this.cases.push(animal);
        }
    

    }


    // Fonction pour faire apparaître un animal
    debloquerAnimal(index) {
        console.log("je debloque "+index);
        if (!this.animauxDebloques[index]) {
            this.animauxDebloques[index] = true;
            this.cases[index * 2 + 1].setVisible(true); // Active l'image de l'animal
        }
    }

    // Méthode pour cacher l'interface sans la fermer
    cacherInterface() {
        this.cases.forEach(caseElement => {
            caseElement.setVisible(false); // Cache les éléments de l'interface
        });
        this.barreTaches.setVisible(false); // Cache la barre des tâches
    }

    // Méthode pour réafficher l'interface lorsque tu reviens au niveau
    afficherInterface() {
        this.cases.forEach(caseElement => {
            caseElement.setVisible(true); // Réaffiche les éléments de l'interface
        });
        this.barreTaches.setVisible(true); // Réaffiche la barre des tâches
    }

    // Méthode pour gérer l'événement de réactivation de l'interface quand le niveau revient
    onWake() {
        this.afficherInterface(); // Réactive l'interface lorsque la scène est réactivée
    }
}