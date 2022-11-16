// jshint esversion: 6



/*


Projet Memory
Par Patrice Plouvin 
Numéro étudiant : 20170363


*/



// Cet evenement attend que le DOM soit chargé pour executer notre code JS
document.addEventListener("DOMContentLoaded", () => {
    // Ici on déclare un tableau qui contient toutes nos images
    var allCard = [
        {
            name: "drap_0",
            img: "images/drap_0.png",
    },
        {
            name: "drap_1",
            img: "images/drap_1.png",
    },
        {
            name: "drap_2",
            img: "images/drap_2.png",
    },
        {
            name: "drap_3",
            img: "images/drap_3.png",
    },
        {
            name: "drap_4",
            img: "images/drap_4.png",
    },
        {
            name: "drap_5",
            img: "images/drap_5.png",
    },
        {
            name: "drap_6",
            img: "images/drap_6.png",
    },
        {
            name: "drap_7",
            img: "images/drap_7.png",
    },
        {
            name: "drap_8",
            img: "images/drap_8.png",
    },
        {
            name: "drap_9",
            img: "images/drap_9.png",
    },
        {
            name: "drap_10",
            img: "images/drap_10.png",
    },
        {
            name: "drap_11",
            img: "images/drap_11.png",
    },
        {
            name: "drap_12",
            img: "images/drap_12.png",
    },
        {
            name: "drap_0",
            img: "images/drap_0.png",
    },
        {
            name: "drap_1",
            img: "images/drap_1.png",
    },
        {
            name: "drap_2",
            img: "images/drap_2.png",
    },
        {
            name: "drap_3",
            img: "images/drap_3.png",
    },
        {
            name: "drap_4",
            img: "images/drap_4.png",
    },
        {
            name: "drap_5",
            img: "images/drap_5.png",
    },
        {
            name: "drap_6",
            img: "images/drap_6.png",
    },
        {
            name: "drap_7",
            img: "images/drap_7.png",
    },
        {
            name: "drap_8",
            img: "images/drap_8.png",
    },
        {
            name: "drap_9",
            img: "images/drap_9.png",
    },
        {
            name: "drap_10",
            img: "images/drap_10.png",
    },
        {
            name: "drap_11",
            img: "images/drap_11.png",
    },
        {
            name: "drap_12",
            img: "images/drap_12.png",
    },

  ];
    // on choisie 25 cartes parmis les 26
    var inter = [];
    var pasCelleLa = Math.trunc(Math.random()*26);
    for (i=0;i<allCard.length;i++){
        if (i != pasCelleLa){
            inter.push(allCard[i]);
        }
    }
    const cardArray = inter;
    
    // Mélange aléatoire du tableau des cartes
    cardArray.sort(() => 0.5 - Math.random());

    // l'élément avec la classe "grille" sera notre grille de jeu
    const grid = document.querySelector(".grille");

    // Pour l'affichage du score
    const result1Display = document.querySelector("#result_1");
    const result2Display = document.querySelector("#result_2");
    // Pour l'affichage du tour
    const turnDisplay = document.querySelector("#turn");


    let cartesRetournees = [];
    let cartesRetourneesId = [];
    let cartesTrouvees = [];
    var joueur = 0;
    var point1 = 0;
    var point2 = 0;

    turnDisplay.textContent = joueur + 1;
    result1Display.textContent = point1;
    result2Display.textContent = point2;

    // Fonction qui vérifie si les cartes retournées sont identiques
    function verifierCarte() {
        const cards = document.querySelectorAll("img");
        const optionOneId = cartesRetourneesId[0];
        const optionTwoId = cartesRetourneesId[1];

        if (optionOneId == optionTwoId) {
            // deux clics same image
            cards[optionOneId].setAttribute("src", "images/drap_Z.png");
            cards[optionTwoId].setAttribute("src", "images/drap_Z.png");
            alert("Vous avez cliqué deux fois sur la même image...");
        } else if (cartesRetournees[0] === cartesRetournees[1]) {
            // qui a eu la pair ?
            (joueur == 0) ? result1Display.textContent = point1 + 1 : result2Display.textContent = point2 +1;
            // Todo - OK
            cards[optionOneId].setAttribute("src", "images/white.png");
            cards[optionTwoId].setAttribute("src", "images/white.png");
            // on retourne les cartes
            cards[optionOneId].removeEventListener("click", retournerCarte);
            cards[optionTwoId].removeEventListener("click", retournerCarte);
            // on met la carte dans le tableau des cartes gagnées
            cartesTrouvees.push(cartesRetournees);
        } else {
            // rip
            joueur = (joueur + 1) % 2;
            turnDisplay.textContent = joueur + 1;
            cards[optionOneId].setAttribute("src", "images/drap_Z.png");
            cards[optionTwoId].setAttribute("src", "images/drap_Z.png");
        }

        cartesRetournees = [];
        cartesRetourneesId = [];

        if (cartesTrouvees.length === cardArray.length / 2) {
            resultDisplay.textContent = "Partie terminée.";
        }
    }

    // Fonction pour retourner une carte
    function retournerCarte() {
        // On prend l'ID de la carte
        let cardId = this.getAttribute("data-id");
        cartesRetournees.push(cardArray[cardId].name);
        cartesRetourneesId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);

        // Ici on va vérifier si on a retourné deux cartes, si c'est le cas on vérifie si c'est les mêmes 250ms plus tard
        if (cartesRetournees.length === 2) {
            setTimeout(verifierCarte, 250);
        }
    }

    // Création du Board
    function creerBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "images/drap_Z.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", retournerCarte);
            card.className = "card"
            grid.appendChild(card);
        }
    }

    creerBoard(); // On appelle la fonction pour créer le tableau
});
