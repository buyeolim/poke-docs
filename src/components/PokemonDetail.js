export default function PokemonDetail({ $app, initialState }) {
  console.log("detail init", initialState);
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-detail";

  $app.appendChild(this.$target);

  this.template = () => {
    let pokemonDetail = this.state;
    console.log(pokemonDetail);
    let temp = ``;
    if (pokemonDetail) {
      temp += `
        <div class="pokemon-detail-container">
            <div class="pokemon-detail-imgbox">
                <img src="${pokemonDetail.img}"></img>
            </div>
            <div class="pokemon-detail-infobox">
                <div class="pokemon-detail-info-no">No.${pokemonDetail.id}</div>
                <div class="pokemon-detail-info-name">${pokemonDetail.name}</div>
                <div class="pokemon-detail-info-types">`;

      let types = pokemonDetail.type;
      types.forEach((type, j) => {
        let korType = "";
        if (type == "normal") korType = "노말";
        if (type == "fire") korType = "불꽃";
        if (type == "water") korType = "물";
        if (type == "electric") korType = "전기";
        if (type == "grass") korType = "풀";
        if (type == "ice") korType = "얼음";
        if (type == "fighting") korType = "격투";
        if (type == "poison") korType = "독";
        if (type == "ground") korType = "땅";
        if (type == "flying") korType = "비행";
        if (type == "psychic") korType = "에스퍼";
        if (type == "bug") korType = "벌레";
        if (type == "rock") korType = "바위";
        if (type == "ghost") korType = "고스트";
        if (type == "dragon") korType = "드래곤";
        if (type == "dark") korType = "악";
        if (type == "steel") korType = "강철";
        if (type == "fairy") korType = "페어리";

        temp += `<div class="pokemon-detail-info-types-type type-${type}">${korType}</div>`;
      });

      temp += `</div>
                <div class="pokemon-detail-info-descr">${pokemonDetail.description}</div>
                <div class="pokemon-detail-info-stats">
                    <div class="pokemon-detail-info-stats-box">
                        <h5>키</h5>
                        <text>${pokemonDetail.height}m</text>
                    </div>
                    <div class="pokemon-detail-info-stats-box">
                        <h5>키</h5>
                        <text>${pokemonDetail.info}</text>
                    </div>
                    <div class="pokemon-detail-info-stats-box">
                        <h5>몸무게</h5>
                        <text>${pokemonDetail.weight}kg</text>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
