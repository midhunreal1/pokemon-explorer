import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="flex w-full max-w-lg mx-auto group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokemon..."
          className="flex-grow px-6 py-4 glass-effect rounded-l-lg border border-cyan-500/30 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-400 text-lg transition-all focus:shadow-lg focus:shadow-cyan-500/25"
        />
        <button
          type="submit"
          className="px-8 py-4 glass-effect  rounded-r-lg neon-text-cyan hover-glow font-semibold text-lg transition-all group-hover:neon-glow border-l-0"
        >
          Search
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">Try searching for "pikachu", "charizard", or any Pokemon name</p>
      </div>
    </form>
  );
}