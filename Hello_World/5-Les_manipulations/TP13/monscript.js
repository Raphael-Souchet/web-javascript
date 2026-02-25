/* Toutes les variables */
let li = document.querySelector("#listeCourses li");

/* Tous les évènements */
li.addEventListener('click', ()=>{
  // Modification des propriétés CSS lors du clic
  li.style.backgroundColor = "lightblue";
  li.style.textDecoration = "line-through";
});

/* Les fonctions */
// A voir plus tard