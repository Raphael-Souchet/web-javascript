let age = prompt("Quel age as tu ?");

if (age > 0) {
    if (age < 18) {
        alert(`L utilisateur a ${age}, il est mineur !`);
    }
    else if (age >= 62) {
        alert(`L utilisateur a ${age}, il est majeur et retraité !`);
    }
    else {
        alert(`L utilisateur a ${age}, il est majeur !`);
    }
}
else {
    alert(`T'es pas né chef`);
}