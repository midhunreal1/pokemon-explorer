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
      <div className="text-center mb-12">
        {/* <h1 className="text-5xl font-bold mb-6 gradient-text float-animation">Pokemon Explorer</h1> */}
        <p className="text-xl neon-text-cyan">Discover information about your favorite Pokemon!</p>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="glass-effect border-l-4 border-red-500 neon-border p-6 mb-8 rounded-r-lg">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 h-72 loading-shimmer">
              <div className="h-36 bg-gray-700/50 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-600/50 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-600/50 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {pokemonList.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-3xl text-gray-300 mb-6">No Pokemon found with that name.</p>
              <button 
                onClick={fetchPokemon}
                className="px-8 py-4 glass-effect neon-border rounded-lg neon-text-cyan hover-glow font-semibold text-lg transition-all"
              >
                Show All Pokemon
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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