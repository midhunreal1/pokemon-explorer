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
  
  if (loading) {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white animate-pulse h-60">
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }
  
  return (
    <Link href={`/pokemon/${details.id}`}>
      <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-center mb-4">
          <img 
            src={details.sprites.front_default} 
            alt={details.name} 
            className="h-32 w-32 object-contain"
          />
        </div>
        <h2 className="text-xl font-semibold capitalize text-center mb-2">{details.name}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {details.types.map(type => (
            <span 
              key={type.type.name}
              className="px-2 py-1 rounded text-xs font-semibold text-white bg-blue-500"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}