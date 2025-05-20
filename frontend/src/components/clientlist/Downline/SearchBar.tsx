import React from 'react';
import { Search } from 'lucide-react';

interface DownlineSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  handleSearch: () => void;
}

const DownlineSearch: React.FC<DownlineSearchProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  handleSearch,
}) => {
  return (
    <div className="w-full bg-gray-100 py-3 px-4 mb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search Username or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-10 left-5 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label className="text-sm text-gray-600 whitespace-nowrap">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="appearance-none bg-white border border-gray-300 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-44"
        >
          <option value="username">Username (A-Z)</option>
          <option value="balance">Balance (High-Low)</option>
          <option value="pl">P/L (High-Low)</option>
          <option value="exp">EXP (High-Low)</option>
          <option value="date">Newest First</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default DownlineSearch;