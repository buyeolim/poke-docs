import Header from "./components/Header.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";

import { request } from "./components/api.js";

export default function App($app) {
  this.state = {
    startIdx: 0,
    searchWord: "",
    pokeType: "",
    pokemons: [],
  };

  const header = new Header({
    $app,
    initialState: {
      pokeType: this.state.pokeType,
      searchWord: this.state.searchWord,
    },
    handleSearch: async (searchWord) => {
      history.pushState(
        null,
        null,
        `/${this.state.pokeType}${searchWord ? "?search=" + searchWord : ""}`
      );
      const pokemons = await request(searchWord, this.state.pokeType);
      this.setState({
        ...this.state,
        searchWord: searchWord,
        pokemons: pokemons,
      });
    },
  });
  const pokemonList = new PokemonList({
    $app,
    initialState: this.state.pokemons,
    handlePokemonTypeChange: async (pokeType) => {
      console.log(pokeType);
      const pageUrl = `/${pokeType}`;
      history.pushState(
        null,
        null,
        this.state.searchWord
          ? pageUrl + `?search=${this.state.searchWord}`
          : pageUrl
      );
      const pokemons = await request(this.state.searchWord, pokeType);
      this.setState({
        ...this.state,
        pokeType: pokeType,
        pokemons: pokemons,
      });
    },
  });
  const pokemonDetail = new PokemonDetail();

  this.setState = (newState) => {
    this.state = newState;
    pokemonList.setState(this.state.pokemons);
    header.setState({
      pokeType: this.state.pokeType,
      searchWord: this.state.searchWord,
    });
  };

  const init = async () => {
    try {
      const pokemons = await request();

      this.setState({
        ...this.state,
        pokemons: pokemons,
      });
    } catch (err) {
      console.log(err);
    }
  };

  init();
}
