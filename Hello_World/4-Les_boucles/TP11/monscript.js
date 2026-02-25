let int = 100;
let somme = 0;
let i = 1;

while (i <= 100) {
    somme += i;
    i++;
}

console.log(`La somme de 1 à 100 est égale à ${somme}`);

let x;

do {
    x = parseInt(prompt("Saisir un nombre entier entre 1 et 100 :"));
    
} while (x < 1 || x > 100);

let sommeX = 0;
i = 1;

while (i <= x) {
    sommeX += i;
    i++;
}

console.log("La somme des " + x + " premiers nombres est : " + sommeX);