export default class Type {
    constructor(name) {
        this.name = name;
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