import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 151, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${nameOrId}:`, error);
    throw error;
  }
};

export const searchPokemon = async (name) => {
  try {
    // Get all Pokemon and filter client-side
    const response = await getPokemonList(151);
    return {
      ...response,
      results: response.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      )
    };
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    throw error;
  }
};