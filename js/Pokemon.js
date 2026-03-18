import Type from "./Type.js";

export default class Pokemon {
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
        const article = document.createElement("article");
        const typeColor = this.apiTypes[0].color;
        
        article.style.backgroundColor = typeColor;
        article.style.borderColor = typeColor;

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