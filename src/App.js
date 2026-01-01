import Header from "./components/Header.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";

import { request, requestPokemonDetail } from "./components/api.js";

export default function App($app) {
  const getSeartchWord = () => {
    if (window.location.search && window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }

    return "";
  };

  this.state = {
    startIdx: 0,
    searchWord:
      window.location.search && window.location.search.includes("search=")
        ? window.location.search.split("search=")[1]
        : "",
    pokeType: window.location.pathname.replace("/", "")
      ? window.location.pathname.replace("/", "")
      : "",
    pokemons: [],
    currentPage: window.location.pathname,
  };

  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        pokeType: this.state.pokeType,
        searchWord: this.state.searchWord,
        currentPage: this.state.currentPage,
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
  };
  const renderPokemonList = () => {
    new PokemonList({
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
      handleItemClick: (pokemonId) => {
        history.pushState(null, null, `/detail/${pokemonId}`);
        this.setState({
          ...this.state,
          currentPage: `/detail/${pokemonId}`,
        });
      },
    });
  };
  const renderPokemonDetail = async (pokemonId) => {
    try {
      const pokemonDetailData = await requestPokemonDetail(pokemonId);
      console.log(pokemonDetailData);
      new PokemonDetail({ $app, initialState: pokemonDetailData });
    } catch (err) {
      console.log(err);
    }
  };

  const render = () => {
    const path = this.state.currentPage;
    console.log("render path:", path);
    $app.innerHTML = "";
    if (path.startsWith("/detail/")) {
      const pokemonId = path.split("/detail/")[1];
      renderHeader();
      renderPokemonDetail(pokemonId);
    } else {
      console.log("render list");

      renderHeader();
      renderPokemonList();
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    render();
  };

  window.addEventListener("popstate", async () => {
    const urlPath = window.location.pathname;

    const prevType = urlPath.replace("/", "");
    const prevSearchWord = getSeartchWord();
    const prevPokemons = await request(prevSearchWord, prevType);

    this.setState({
      ...this.state,
      searchWord: prevSearchWord,
      pokeType: prevType,
      pokemons: prevPokemons,
      currentPage: urlPath,
    });
  });

  const init = async () => {
    const path = this.state.currentPage;

    if (path.startsWith("/detail/")) {
      render();
    } else {
      const pokemons = await request(
        this.state.searchWord,
        this.state.pokeType
      );
      this.setState({
        ...this.state,
        pokemons: pokemons,
      });
    }
  };

  init();
}
