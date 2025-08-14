import { useState } from 'react';
import { Star, ThumbsUp, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const MessCard = ({ mess }) => {
  // Default mess object with fallback values if props are missing
  const {
    id = '1',
    name = 'Mess Name',
    image = '/images/food1.jpg', 
    rating = 4.2,
    reviews = 120,
    specialties = ['North Indian', 'South Indian'],
    openingHours = '8:00 AM - 10:00 PM',
    location = '1.2 km away',
    price = '₹80 per meal',
    recommended = true,
    likes = 45
  } = mess || {};

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the like button
    setIsLiked(!isLiked);
    // Additional logic to update like count in database would go here
  };

  return (
    <Link to={`/mess/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image container with recommended badge */}
        <div className="relative h-48">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          {recommended && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              Recommended
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Header: Name and Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              <span className="text-xs text-gray-500 ml-1">({reviews})</span>
            </div>
          </div>
          
          {/* Specialties */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div className="flex flex-col gap-1 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{openingHours}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
            <div className="font-medium text-gray-800">{price}</div>
          </div>
          
          {/* Like button */}
          <div className="flex justify-end mt-2">
            <button 
              onClick={handleLike} 
              className={`flex items-center text-sm ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ThumbsUp size={14} className={`mr-1 ${isLiked ? 'fill-blue-500' : ''}`} />
              <span>{isLiked ? likes + 1 : likes}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MessCard;