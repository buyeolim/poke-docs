const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

export const request = async (searchWord, pokeType) => {
    try {
        let url = `${API_URL}`;
        
        const response = await fetch(url);

        if (response) {
            let json = await response.json();
            let data = json.data;
            return data;
        }
    } catch (err) {
        console.log(err);
    }
}