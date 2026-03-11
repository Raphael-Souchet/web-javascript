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

const getCouleur = (type) => {
    switch (type) {
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
};

async function loadData(generation, triFiltre) {
    const response = await fetch('./data/pokemon.json');
    const jsonData = await response.json();
    const data = jsonData.pokemon;

    const main = document.querySelector('main');
    main.innerHTML = '';

    let pokemonsAafficher = data.filter(pokemon => {
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
            selectedTypes.some(type => pokemon.types.includes(typeMap[type]))
        );
    }

    pokemonsAafficher = pokemonsAafficher.sort((a, b) => {
        if (triFiltre === 'nom') {
            return a.name.localeCompare(b.name);
        }
        if (triFiltre === 'type') {
            return a.types[0].localeCompare(b.types[0]);
        }
        if (triFiltre === 'hp') {
            let hpA = a.stats.find(s => s.name === 'hp').value;
            let hpB = b.stats.find(s => s.name === 'hp').value;
            return hpB - hpA;
        }
        if (triFiltre === 'attaque') {
            let attackA = a.stats.find(s => s.name === 'attack').value;
            let attackB = b.stats.find(s => s.name === 'attack').value;
            return attackB - attackA;
        }
        return a.id - b.id;
    });

    pokemonsAafficher.forEach(pokemon => {
        const article = document.createElement('article');
        const pokemonType = pokemon.types[0];
        let couleur = getCouleur(pokemonType);

        article.style.backgroundColor = couleur;
        article.style.borderColor = couleur;

        const getStat = (statName) => {
            const statObj = pokemon.stats.find(s => s.name === statName);
            return statObj ? statObj.value : 0;
        };

        article.innerHTML = `
      <figure>
        <picture>
          <img src="${pokemon.image}" alt="Image de ${pokemon.name}" />
        </picture>
        <figcaption>
          <span class="types">${pokemon.types[0]}</span>
          <h2>${pokemon.name}</h2>
          <ol>
            <li>Points de vie : ${getStat('hp')}</li>
            <li>Attaque : ${getStat('attack')}</li>
            <li>Défense : ${getStat('defense')}</li>
            <li>Attaque spécial : ${getStat('special-attack')}</li>
            <li>Vitesse : ${getStat('speed')}</li>
          </ol>
        </figcaption>
      </figure>
    `;

        main.appendChild(article);
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
            btn.style.backgroundColor = getCouleur(typeMap[typeName]);
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