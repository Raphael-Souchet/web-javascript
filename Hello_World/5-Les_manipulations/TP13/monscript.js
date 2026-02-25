/* Toutes les variables */
let li = document.querySelector("#listeCourses li");

let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');

let titreH2 = document.querySelector("h2");

titreH2.textContent = titreH2.textContent + " : " + dateJourFr;


/* Tous les évènements */
li.addEventListener('click', ()=>{
  li.classList.toggle("itemCheck");
});

/* Les fonctions */
// A voir plus tard