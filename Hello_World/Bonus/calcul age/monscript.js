function calcul_age(annee_naissance, annee_actuelle=2026) {
    let result = annee_actuelle - annee_naissance;
    return `Vous avez donc ${result} ans.`
}

let age = prompt("En quel année êtes vous né ?");
age = parseInt(age);

const calcul_age_2 = (age) => 2026 - age;

console.log(calcul_age(age));
console.log(`Vous avez donc ${calcul_age_2(age)} ans.`);