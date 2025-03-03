'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { getPokemonDetails } from '../../services/pokemonService';

export default function PokemonDetail() {
  const params = useParams();
  const id = params.id;
  
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (err) {
        setError('Failed to fetch Pokémon details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemonDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center py-16">
        <div className="animate-pulse w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="mb-6">{error}</p>
        <Link 
          href="/" 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go Back
        </Link>
      </div>
    );
  }
  
  if (!pokemon) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-red-600 hover:text-red-800"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to all Pokémon
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Pokemon Header */}
        <div className="bg-red-600 text-white p-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <div className="text-right">
            <p className="text-xl">#{String(pokemon.id).padStart(3, '0')}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-64 h-64 object-contain"
              />
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name}
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white bg-blue-500"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Info Sections */}
            <div className="md:col-span-2">
              {/* Base Stats */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
                <div className="space-y-3">
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span>{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-red-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Abilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(ability => (
                    <span 
                      key={ability.ability.name}
                      className="px-3 py-1 bg-gray-100 rounded-full capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && <span className="text-xs ml-1 text-gray-500">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </section>
              
              {/* Physical Characteristics */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Physical Characteristics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Height</p>
                    <p className="text-xl">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Weight</p>
                    <p className="text-xl">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          {/* Moves Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Moves</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {pokemon.moves.slice(0, 20).map(move => (
                <span 
                  key={move.move.name}
                  className="px-3 py-1 bg-gray-100 rounded text-sm capitalize truncate"
                >
                  {move.move.name.replace('-', ' ')}
                </span>
              ))}
              {pokemon.moves.length > 20 && (
                <span className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-500">
                  And {pokemon.moves.length - 20} more moves...
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}