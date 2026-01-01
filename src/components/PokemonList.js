export default function pokemonList({
  $app,
  initialState,
  handlePokemonTypeChange,
  handleItemClick,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-list";

  this.handlePokemonTypeChange = handlePokemonTypeChange;
  this.handleItemClick = handleItemClick;
  $app.appendChild(this.$target);

  this.template = () => {
    let temp = '<div class="pokemon-items-container">';

    if (this.state) {
      this.state.forEach((elm) => {
        temp += `
            <div class="pokemon-item">
                <div class="pokemon-item-imgbox" id="${elm.id}">
                    <img src="${elm.img}"></img>
                </div>
                <div class="pokemon-item-no">No.${elm.id}</div>
                <div class="pokemon-item-name">${elm.name}</div>
                <div class="pokemon-item-types">
            `;

        let types = elm.type;
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

          temp += `<div class="pokemon-item-types-type type-${type}">${korType}</div>`;
        });

        temp += `
                        </div>
                    </div>
                `;
      });
      temp += "</div>";
    }
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.$target.querySelectorAll(`.pokemon-item-imgbox`).forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleItemClick(elm.id);
      });
    });

    const $typeDiv = this.$target.querySelectorAll(`.pokemon-item-types-type`);

    $typeDiv.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        const selectedType = e.target.className
          .split(" ")
          .find((cls) => cls.startsWith("type-"))
          .split("-")[1];

        this.handlePokemonTypeChange(selectedType);
      });
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
