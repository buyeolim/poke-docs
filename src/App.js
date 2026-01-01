import Header from "./components/Header.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";

import { request } from "./components/api.js";

export default function App($app) {

  this.state = {
    startIdx: 0,
    searchWord: '',
    pokeType: '',
    pokemons: [],
  };
  
console.log(this.state);
  const header = new Header();
  const pokemonList = new PokemonList({$app, initialState: this.state.pokemons});
  const pokemonDetail = new PokemonDetail();

  this.setState = (newState) => {
    this.state = newState;
    pokemonList.setState(this.state.pokemons);
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
