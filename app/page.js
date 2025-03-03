'use client';

import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import { getPokemonList, searchPokemon } from './services/pokemonService';

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPokemon();
  }, []);
  
  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const data = await getPokemonList(151); // Fetch first 151 Pokemon
      setPokemonList(data.results);
    } catch (err) {
      setError('Failed to fetch Pokemon. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (term) => {
    if (!term.trim()) {
      return fetchPokemon();
    }
    
    try {
      setLoading(true);
      const data = await searchPokemon(term);
      setPokemonList(data.results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Pokemon Explorer</h1>
        <p className="text-gray-600">Discover information about your favorite Pokemon!</p>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md bg-white animate-pulse h-60">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {pokemonList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-2xl text-gray-600">No Pokemon found with that name.</p>
              <button 
                onClick={fetchPokemon}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Show All Pokemon
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pokemonList.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}