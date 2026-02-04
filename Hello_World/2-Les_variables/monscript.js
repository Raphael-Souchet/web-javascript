let numJour = "04";
let isHiver = true;

let tabJours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]; 
let tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]; 

let maDateV1 = {
    "jour" : tabJours[2],
    "mois" : tabMois[0]
}

let maDateV2 = {};
maDateV2.jour = tabJours[2];
maDateV2.mois = tabMois[0];


console.log();
if (isHiver) {
    console.log(`Nous sommes le ${tabJours[2]} ${numJour} ${tabMois[0]} et nous sommes en hiver`);
}
else {
    console.log(`Nous sommes le ${tabJours[2]} ${numJour} ${tabMois[0]} et nous sommes en pas en hiver`);
}

console.log(maDateV1);
console.log(maDateV2);