const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

export const request = async (searchWord, pokeType) => {
  try {
    let url = `${API_URL}`;

    console.log("pokeType:", pokeType);
    console.log("searchWord:", searchWord);

    if (pokeType && searchWord) {
      console.log("both");
      url += `${pokeType}?search=${searchWord}`;
    } else if (pokeType) {
      console.log("type only");
      url += `${pokeType}`;
    } else if (searchWord) {
      console.log("search only");
      url += `?search=${searchWord}`;
    }

    const response = await fetch(url);

    if (response) {
      let json = await response.json();
      let data = json.data;
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
