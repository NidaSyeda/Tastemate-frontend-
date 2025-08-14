import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const MessFilter = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: [],
    rating: 0,
    price: '',
    sortBy: 'recommended'
  });

  const cuisineOptions = [
    'North Indian', 
    'South Indian', 
    'Chinese', 
    'Continental', 
    'Punjabi', 
    'Gujarati'
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (< ₹70)' },
    { value: 'medium', label: 'Medium (₹70 - ₹120)' },
    { value: 'premium', label: 'Premium (> ₹120)' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'distance', label: 'Distance' }
  ];

  const handleSearchChange = (e) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCuisineChange = (cuisine) => {
    let newCuisines;
    if (filters.cuisine.includes(cuisine)) {
      newCuisines = filters.cuisine.filter(item => item !== cuisine);
    } else {
      newCuisines = [...filters.cuisine, cuisine];
    }

    const newFilters = { ...filters, cuisine: newCuisines };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (e) => {
    const newFilters = { ...filters, rating: Number(e.target.value) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newFilters = { ...filters, price: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sortBy: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search bar */}
      <div className="flex items-center border rounded-lg p-2 mb-4">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search for mess, cuisine, location..."
          className="w-full focus:outline-none"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter toggle button */}
      <button 
        className="flex items-center text-sm font-medium text-gray-700 mb-4"
        onClick={toggleFilters}
      >
        <Filter size={16} className="mr-2" />
        Filters
        <ChevronDown 
          size={16} 
          className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable filters section */}
      {isFilterOpen && (
        <div className="space-y-4">
          {/* Cuisine filters */}
          <div>
            <h4 className="font-medium text-sm mb-2">Cuisine Type</h4>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineChange(cuisine)}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    filters.cuisine.includes(cuisine)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div>
            <h4 className="font-medium text-sm mb-2">Rating</h4>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={handleRatingChange}
                className="w-full"
              />
              <span className="ml-2 text-sm font-medium">
                {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
              </span>
            </div>
          </div>

          {/* Price filter */}
          <div>
            <h4 className="font-medium text-sm mb-2">Price Range</h4>
            <select
              value={filters.price}
              onChange={handlePriceChange}
              className="w-full p-2 border rounded-md text-sm"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort options */}
          <div>
            <h4 className="font-medium text-sm mb-2">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="w-full p-2 border rounded-md text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessFilter;