export default class Interface extends Phaser.Scene {
    constructor() {
        super({ key: "interface", active: true });
    }

    create() {
        // Barre des tâches (rectangle en haut)
        this.barreTaches = this.add.graphics();
        this.barreTaches.fillStyle(0x000000, 0.5);
        this.barreTaches.fillRect(0, 0, this.cameras.main.width, 80);

        // Liste des éléphants (au départ invisibles)
        this.elephants = [];
        for (let i = 0; i < 4; i++) {
            let elephant = this.add.image(50 + i * 100, 40, "elephantcute1")
                .setScale(0.5)
                .setVisible(false); // Caché au départ
            this.elephants.push(elephant);
        }
    }

    // Méthode pour faire apparaître un éléphant
    ApparaitreElephant() {
        for (let elephant of this.elephants) {
            if (!elephant.visible) {
                elephant.setVisible(true);
                break; // On arrête dès qu'on trouve un slot libre
            }
        }
    }
}
