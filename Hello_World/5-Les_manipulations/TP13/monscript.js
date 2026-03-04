let li = document.querySelector("#listeCourses li");
let dateJour = new Date(Date.now());
let dateJourFr = dateJour.toLocaleDateString('fr-FR');
let titreH2 = document.querySelector("h2");
let myInput = document.querySelector("#myInput");
let btn = document.querySelector(".btn");
let liste = document.querySelector("#listeCourses");

titreH2.textContent = titreH2.textContent + " : " + dateJourFr;

li.addEventListener('click', () => {
  li.classList.toggle("itemCheck");
});

li.addEventListener('dblclick', () => {
  li.remove();
  setTimeout(() => { alert("Produit supprimé !"); }, 10);
});

btn.addEventListener('click', addProduct);

myInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addProduct();
    }
});

function addProduct() {
    let valeurSaisie = myInput.value;
    
    if (valeurSaisie === "") {
        alert("Erreur de saisie");
    } else {
        let nouveauLi = document.createElement("li");
        nouveauLi.textContent = valeurSaisie;
        
        nouveauLi.addEventListener('click', () => {
            nouveauLi.classList.toggle("itemCheck");
        });

        nouveauLi.addEventListener('dblclick', () => {
            nouveauLi.remove();
            setTimeout(() => { alert("Produit supprimé !"); }, 10);
        });
        
        liste.appendChild(nouveauLi);
        myInput.value = "";
    }
}