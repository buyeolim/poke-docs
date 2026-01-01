export default function PokemonDetail() {
    this.$target = document.createElement("div");
    this.$target.className = "pokemon-detail";

    this.template = () => {};

    this.render = () => {};

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render();
}