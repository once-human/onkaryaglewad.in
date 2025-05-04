'use client'; // Mark this as a Client Component

import { FiHeart } from 'react-icons/fi';

// Placeholder LikeButton component (implement state/API call later)
const LikeButton = ({ slug }: { slug: string }) => {
  // Placeholder state/logic
  const handleClick = () => {
    console.log(`Liking post: ${slug}`);
    // TODO: Implement API call to increment like count
    // TODO: Add state to show liked status, update count visually
    alert('Like functionality requires a backend service and is not implemented yet!');
  };

  return (
    <button 
      onClick={handleClick}
      className="mt-8 inline-flex items-center gap-2 rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Like this post"
    >
      <FiHeart className="h-5 w-5" />
      <span>Like</span>
      {/* Placeholder for like count */}
      <span className="ml-1 text-gray-400">( -- )</span> 
    </button>
  );
};

export default LikeButton; 