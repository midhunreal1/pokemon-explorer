import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/pokemonService';

export default function PokemonCard({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(pokemon.name);
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [pokemon.name]);
  
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
      <div className="glass-effect rounded-xl p-6 h-72 loading-shimmer">
        <div className="h-36 bg-gray-700/50 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-600/50 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-600/50 rounded w-1/2"></div>
      </div>
    );
  }
  
  return (
    <Link href={`/pokemon/${details.id}`}>
      <div className="glass-effect rounded-xl p-6 hover-glow cursor-pointer  !bg-black">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={details.sprites.front_default} 
              alt={details.name} 
              className="h-36 w-36 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
        <h2 className="text-xl font-bold capitalize text-center mb-4 neon-text-cyan group-hover:neon-glow transition-all">{details.name}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {details.types.map(type => (
            <span 
              key={type.type.name}
              className={`px-3 py-2 rounded-lg text-sm font-semibold glass-effect border border-current/30 ${getTypeColor(type.type.name)} hover:scale-105 transition-transform`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-xs text-gray-400 font-mono">#{String(details.id).padStart(3, '0')}</span>
        </div>
      </div>
    </Link>
  );
}