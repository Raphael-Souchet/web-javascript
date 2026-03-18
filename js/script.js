import Type from "./Type.js";
import Pokemon from "./Pokemon.js";

const typeMap = {
    'Plante': 'grass',
    'Feu': 'fire',
    'Eau': 'water',
    'Combat': 'fighting',
    'Poison': 'poison',
    'Vol': 'flying',
    'Insecte': 'bug',
    'Normal': 'normal',
    'Électrik': 'electric',
    'Sol': 'ground',
    'Fée': 'fairy',
    'Psy': 'psychic',
    'Roche': 'rock',
    'Dragon': 'dragon',
    'Spectre': 'ghost',
    'Glace': 'ice',
    'Acier': 'steel',
    'Ténèbres': 'dark'
};

let selectedTypes = [];
let allPokemons = []; 

const selectGeneration = document.getElementById('filtre');
const selectTri = document.getElementById('tri');
const buttonsContainer = document.getElementById('boutons-types');
const main = document.querySelector('main');

async function init() {
    try {
        const response = await fetch('./data/pokemon.json');
        const jsonData = await response.json();

        allPokemons = jsonData.pokemon.map(data => new Pokemon(data));

        createTypeButtons();

        selectGeneration.addEventListener('change', updateDisplay);
        selectTri.addEventListener('change', updateDisplay);

        updateDisplay();
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
}

function createTypeButtons() {
    Object.keys(typeMap).forEach(typeName => {
        const btn = document.createElement('button');
        btn.textContent = typeName;
        btn.style.backgroundColor = 'grey';

        btn.addEventListener('click', () => {
            if (selectedTypes.includes(typeName)) {
                selectedTypes = selectedTypes.filter(t => t !== typeName);
                btn.style.backgroundColor = 'grey';
            } else {
                selectedTypes.push(typeName);
                let temporaryType = new Type(typeMap[typeName]);
                btn.style.backgroundColor = temporaryType.color;
            }
            updateDisplay();
        });

        buttonsContainer.appendChild(btn);
    });
}

function updateDisplay() {
    const generation = selectGeneration.value;
    const triFiltre = selectTri.value;

    let pokemonsAafficher = allPokemons.filter(pokemon => {
        if (generation === '1') return pokemon.id <= 151;
        if (generation === '2') return pokemon.id > 151 && pokemon.id <= 251;
        if (generation === '3') return pokemon.id > 251 && pokemon.id <= 386;
        if (generation === '4') return pokemon.id > 386 && pokemon.id <= 493;
        if (generation === '5') return pokemon.id > 493 && pokemon.id <= 649;
        if (generation === '6') return pokemon.id > 649 && pokemon.id <= 721;
        if (generation === '7') return pokemon.id > 721 && pokemon.id <= 809;
        if (generation === '8') return pokemon.id > 809 && pokemon.id <= 898;
        return true;
        // le fichier json n'a que les pokemons de la premiere generation mais on pourrait imaginer que 
        // les autres generations soient mises apres la generation 1 donc classe selon leur id qu'on pourrait utiliser ici
    });

    if (selectedTypes.length > 0) {
        pokemonsAafficher = pokemonsAafficher.filter(pokemon =>
            selectedTypes.some(selectedType =>
                pokemon.apiTypes.some(t => t.name === typeMap[selectedType])
            )
        );
    }

    pokemonsAafficher.sort((a, b) => {
        if (triFiltre === 'nom') {
            return a.name.localeCompare(b.name);
        }
        if (triFiltre === 'type') {
            return a.apiTypes[0].name.localeCompare(b.apiTypes[0].name);
        }
        if (triFiltre === 'hp') {
            return b.hp - a.hp;
        }
        if (triFiltre === 'attaque') {
            return b.attack - a.attack;
        }
        return a.id - b.id; 
    });

    main.innerHTML = ''; 
    pokemonsAafficher.forEach(pokemon => {
        main.appendChild(pokemon.displayCard());
    });
}

init();