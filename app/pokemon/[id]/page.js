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
        setError('Failed to fetch Pokemon details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemonDetails();
  }, [id]);
  
  const getTypeColor = (type) => {
    const colors = {
      normal: 'text-gray-300',
      fire: 'text-red-400',
      water: 'text-blue-400',
      electric: 'text-yellow-400',
      grass: 'text-green-400',
      ice: 'text-cyan-300',
      fighting: 'text-red-600',
      poison: 'text-purple-400',
      ground: 'text-yellow-600',
      flying: 'text-indigo-300',
      psychic: 'text-pink-400',
      bug: 'text-green-500',
      rock: 'text-yellow-700',
      ghost: 'text-purple-600',
      dragon: 'text-indigo-600',
      dark: 'text-gray-700',
      steel: 'text-gray-400',
      fairy: 'text-pink-300',
    };
    return colors[type] || 'text-gray-300';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center py-16">
        <div className="glass-effect rounded-xl p-8 w-full max-w-4xl loading-shimmer">
          <div className="h-10 bg-gray-700/50 rounded-lg w-3/4 mb-8"></div>
          <div className="h-80 bg-gray-700/50 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-600/50 rounded w-1/2"></div>
            <div className="h-6 bg-gray-600/50 rounded w-3/4"></div>
            <div className="h-6 bg-gray-600/50 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="glass-effect rounded-xl p-8 max-w-md mx-auto neon-border">
          <h2 className="text-3xl font-bold neon-text-pink mb-6">Error</h2>
          <p className="text-gray-300 mb-8 text-lg">{error}</p>
          <Link 
            href="/" 
            className="px-8 py-4 glass-effect neon-border rounded-lg neon-text-cyan hover-glow font-semibold text-lg transition-all inline-block"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }
  
  if (!pokemon) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center neon-text-cyan hover:neon-glow transition-all text-lg font-medium group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to all Pokemon
        </Link>
      </div>
      
      <div className="glass-effect rounded-xl overflow-hidden neon-border">
        {/* Pokemon Header */}
        <div className="glass-effect border-b border-cyan-500/30 p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold capitalize gradient-text">{pokemon.name}</h1>
            <div className="text-right">
              <p className="text-2xl font-mono neon-text-cyan">#{String(pokemon.id).padStart(3, '0')}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  className="relative w-72 h-72 object-contain float-animation"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name}
                    className={`px-4 py-2 rounded-lg text-sm font-bold glass-effect border border-current/30 ${getTypeColor(type.type.name)} hover:scale-105 transition-transform capitalize`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Info Sections */}
            <div className="md:col-span-2">
              {/* Base Stats */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 neon-text-cyan">Base Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name} className="glass-effect rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="capitalize font-semibold text-gray-200 text-lg">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="neon-text-purple font-bold text-lg">{stat.base_stat}</span>
                      </div>
                      <div className="w-full glass-effect rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Abilities */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 neon-text-cyan">Abilities</h2>
                <div className="flex flex-wrap gap-4">
                  {pokemon.abilities.map(ability => (
                    <span 
                      key={ability.ability.name}
                      className="px-4 py-2 glass-effect rounded-lg capitalize font-semibold text-gray-200 hover:scale-105 transition-transform neon-border"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && <span className="text-xs ml-2 neon-text-pink">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </section>
              
              {/* Physical Characteristics */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 neon-text-cyan">Physical Characteristics</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-effect rounded-lg p-6 text-center hover-glow">
                    <p className="text-gray-400 text-lg mb-2">Height</p>
                    <p className="text-3xl font-bold neon-text-purple">{pokemon.height / 10} m</p>
                  </div>
                  <div className="glass-effect rounded-lg p-6 text-center hover-glow">
                    <p className="text-gray-400 text-lg mb-2">Weight</p>
                    <p className="text-3xl font-bold neon-text-purple">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          {/* Moves Section */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold mb-6 neon-text-cyan">Moves</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pokemon.moves.slice(0, 20).map(move => (
                <span 
                  key={move.move.name}
                  className="px-3 py-2 glass-effect rounded-lg text-sm capitalize truncate text-gray-300 hover:text-white hover:scale-105 transition-all border border-gray-600/30"
                >
                  {move.move.name.replace('-', ' ')}
                </span>
              ))}
              {pokemon.moves.length > 20 && (
                <span className="px-3 py-2 glass-effect rounded-lg text-sm neon-text-pink font-semibold">
                  +{pokemon.moves.length - 20} more moves
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}