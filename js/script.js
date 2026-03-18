class Type {
    constructor(name) {
        this.name = name;
        this.image = "";
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        switch (this.name) {
            case 'grass': return 'green';
            case 'fire': return 'orange';
            case 'water': return 'blue';
            case 'fighting': return '#C77D12';
            case 'poison': return '#B711D9';
            case 'flying': return '#ADEEFF';
            case 'bug': return '#62913A';
            case 'normal': return '#E0E0E0';
            case 'electric': return '#FFE303';
            case 'ground': return '#A65C00';
            case 'fairy': return '#FF66FB';
            case 'psychic': return '#FF2974';
            case 'rock': return '#A1AB91';
            case 'dragon': return '#0034D1';
            case 'ghost': return '#705898';
            case 'ice': return '#98D8D8';
            case 'steel': return '#B8B8D0';
            case 'dark': return '#705848';
            default: return 'grey';
        }
    }
}

class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.apiTypes = data.types.map(type => new Type(type));

        this.hp = data.stats.find(s => s.name === 'hp').value;
        this.attack = data.stats.find(s => s.name === 'attack').value;
        this.defense = data.stats.find(s => s.name === 'defense').value;
        this.special_attack = data.stats.find(s => s.name === 'special-attack').value;
        this.speed = data.stats.find(s => s.name === 'speed').value;
    }

    displayCard() {
        const article = document.createElement('article');
        let couleur = this.apiTypes[0].color;

        article.style.backgroundColor = couleur;
        article.style.borderColor = couleur;

        article.innerHTML = `
          <figure>
            <picture>
              <img src="${this.image}" alt="Image de ${this.name}" />
            </picture>
            <figcaption>
              <span class="types">${this.apiTypes[0].name}</span>
              <h2>${this.name}</h2>
              <ol>
                <li>Points de vie : ${this.hp}</li>
                <li>Attaque : ${this.attack}</li>
                <li>Défense : ${this.defense}</li>
                <li>Attaque spécial : ${this.special_attack}</li>
                <li>Vitesse : ${this.speed}</li>
              </ol>
            </figcaption>
          </figure>
        `;
        return article;
    }
}

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

async function loadData(generation, triFiltre) {
    const response = await fetch('./data/pokemon.json');
    const jsonData = await response.json();

    let allPokemons = jsonData.pokemon.map(data => new Pokemon(data));

    const main = document.querySelector('main');
    main.innerHTML = '';

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
    });

    if (selectedTypes.length > 0) {
        pokemonsAafficher = pokemonsAafficher.filter(pokemon =>
            selectedTypes.some(selectedType =>
                pokemon.apiTypes.map(t => t.name).includes(typeMap[selectedType])
            )
        );
    }

    pokemonsAafficher = pokemonsAafficher.sort((a, b) => {
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

    pokemonsAafficher.forEach(pokemon => {
        main.appendChild(pokemon.displayCard());
    });
}

const selectGeneration = document.getElementById('filtre');
const selectTri = document.getElementById('tri');
const buttonsContainer = document.getElementById('boutons-types');

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
        loadData(selectGeneration.value, selectTri.value);
    });

    buttonsContainer.appendChild(btn);
});

loadData(selectGeneration.value, selectTri.value);

selectGeneration.addEventListener('change', function() {
    loadData(selectGeneration.value, selectTri.value);
});

selectTri.addEventListener('change', function() {
    loadData(selectGeneration.value, selectTri.value);
});