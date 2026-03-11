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

async function loadData(generation, typeFiltre) {
    const response = await fetch('./data/pokemon.json');
    const jsonData = await response.json();
    const data = jsonData.pokemon;

    const main = document.querySelector('main');
    main.innerHTML = '';

    let pokemonsAafficher = data;
    if (typeFiltre !== 'Tous') {
        const mappedType = typeMap[typeFiltre];
        pokemonsAafficher = data.filter(pokemon =>
            pokemon.types.includes(mappedType)
        );
    }

    pokemonsAafficher.forEach(pokemon => {
        const article = document.createElement('article');
        const pokemonType = pokemon.types[0];
        let couleur;

        switch (pokemonType) {
            case 'grass': couleur = 'green'; break;
            case 'fire': couleur = 'orange'; break;
            case 'water': couleur = 'blue'; break;
            case 'fighting': couleur = '#C77D12'; break;
            case 'poison': couleur = '#B711D9'; break;
            case 'flying': couleur = '#ADEEFF'; break;
            case 'bug': couleur = '#62913A'; break;
            case 'normal': couleur = '#E0E0E0'; break;
            case 'electric': couleur = '#FFE303'; break;
            case 'ground': couleur = '#A65C00'; break;
            case 'fairy': couleur = '#FF66FB'; break;
            case 'psychic': couleur = '#FF2974'; break;
            case 'rock': couleur = '#A1AB91'; break;
            case 'dragon': couleur = '#0034D1'; break;
            case 'ghost': couleur = '#705898'; break;
            case 'ice': couleur = '#98D8D8'; break;
            case 'steel': couleur = '#B8B8D0'; break;
            case 'dark': couleur = '#705848'; break;
            default: couleur = 'grey'; break;
        }

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
const selectType = document.getElementById('filtre-type');

loadData(selectGeneration.value, selectType.value);

selectGeneration.addEventListener('change', function() {
    loadData(selectGeneration.value, selectType.value);
});

selectType.addEventListener('change', function() {
    loadData(selectGeneration.value, selectType.value);
});