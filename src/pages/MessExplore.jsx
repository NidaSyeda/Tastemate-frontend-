import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessCard from '../components/mess/MessCard';
import MessFilter from '../components/mess/MessFilter';
import './MessExplore.css';

// Mock data for mess options
const mockMessData = [
  {
    id: 1,
    name: 'Culinary Haven',
    location: '123 College Street',
    rating: 4.7,
    distance: 0.5,
    priceRange: '₹₹',
    image: '/images/food1.jpg',
    tags: ['North Indian', 'South Indian', 'Chinese'],
  },
  {
    id: 2,
    name: 'Flavour Junction',
    location: '456 University Road',
    rating: 4.5,
    distance: 1.2,
    priceRange: '₹',
    image: '/images/food2.jpg',
    tags: ['North Indian', 'Continental'],
  },
  {
    id: 3,
    name: 'Spice Garden',
    location: '789 Campus Avenue',
    rating: 4.8,
    distance: 0.8,
    priceRange: '₹₹₹',
    image: '/images/food3.jpg',
    tags: ['South Indian', 'Chinese'],
  },
  {
    id: 4,
    name: 'Hostel Bites',
    location: '234 Hostel Lane',
    rating: 4.2,
    distance: 0.3,
    priceRange: '₹',
    image: '/images/food1.jpg',
    tags: ['North Indian', 'Fast Food'],
  },
  {
    id: 5,
    name: 'Green Plate',
    location: '567 Library Road',
    rating: 4.6,
    distance: 1.5,
    priceRange: '₹₹',
    image: '/images/food2.jpg',
    tags: ['Pure Veg', 'Healthy'],
  },
  {
    id: 6,
    name: 'Campus Delights',
    location: '890 Science Block',
    rating: 4.3,
    distance: 0.7,
    priceRange: '₹₹',
    image: '/images/food3.jpg',
    tags: ['Multi Cuisine', 'Fast Food'],
  },
];

const MessExplore = () => {
  const [messOptions, setMessOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    sortBy: 'rating',
    cuisineType: 'all',
    priceRange: 'all',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setMessOptions(mockMessData);
      setFilteredOptions(mockMessData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, messOptions]);

  const applyFilters = () => {
    let filtered = [...messOptions];

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (mess) =>
          mess.name.toLowerCase().includes(query) ||
          mess.location.toLowerCase().includes(query) ||
          mess.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply cuisine type filter
    if (filters.cuisineType !== 'all') {
      filtered = filtered.filter((mess) =>
        mess.tags.includes(filters.cuisineType)
      );
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((mess) => mess.priceRange === filters.priceRange);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'priceAsc':
        filtered.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      default:
        break;
    }

    setFilteredOptions(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="mess-explore">
      <div className="container">
        <div className="mess-explore-header">
          <h1>Explore Mess Options</h1>
          <p>Find the best mess options near your campus</p>
        </div>

        <MessFilter filters={filters} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading mess options...</p>
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className="no-results">
            <h3>No mess options found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="mess-grid">
            {filteredOptions.map((mess) => (
              <Link to={`/mess/${mess.id}`} key={mess.id} className="mess-card-link">
                <MessCard mess={mess} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessExplore;