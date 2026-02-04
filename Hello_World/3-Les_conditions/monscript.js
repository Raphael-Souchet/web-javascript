let age = prompt("Quel age as tu ?");
let ageEnEntier = parseInt(age, 10);

switch (ageEnEntier) {
    case 18:
        alert(`il vient d être majeur`);
        break;
    case 25:
        alert(`il a un quart de siècle`);
        break;
    case 50:
        alert(`il a un demi siècle`);
        break;
    case 62:
        alert(`il vient d être à la retraite`);
        break;
    case 100:
        alert(`il vient d être centenaire`);
        break;
}

