import React, { useState } from 'react';
import axios from 'axios';

const BookmarkCard = ({ bookmark, onDelete }) => {
  const [cardWidth, setCardWidth] = useState(300); // Default width in pixels
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = (e) => {
    const img = e.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const maxWidth = 400; // Maximum card width
    const minWidth = 200; // Minimum card width
    const baseHeight = 200; // Base height for calculating width

    let newWidth = baseHeight * aspectRatio;
    newWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
    setCardWidth(newWidth);
    setIsLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.delete(`/api/bookmarks/${bookmark._id}`);
      onDelete(bookmark._id);
    } catch (err) {
      console.error('Error deleting bookmark:', err);
    }
  };

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow-lg transition-all duration-300 flex flex-col hover:shadow-xl"
      style={{ width: `${cardWidth}px` }}
    >
      <div className="relative w-full bg-gray-100 border border-gray-200 rounded-t-xl overflow-hidden group">
        {isLoading && (
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '4px solid #3b82f6',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: 'auto'
            }}
          ></div>
        )}
        <img
          src={bookmark.thumbnail}
          alt={bookmark.title}
          className={`w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 ${isLoading ? 'invisible' : ''}`}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x200';
            setCardWidth(300);
            setIsLoading(false);
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <span className="text-white font-medium">Visit</span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate w-full text-center group relative">
          {bookmark.title}
          <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded py-1 px-2 z-10 bottom-full mb-2 left-1/2 -translate-x-1/2">
            {bookmark.title}
          </span>
        </h3>
        <p className="text-sm text-gray-500 truncate w-full text-center group relative">
          {bookmark.url}
          <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded py-1 px-2 z-10 bottom-full mb-2 left-1/2 -translate-x-1/2">
            {bookmark.url}
          </span>
        </p>
        <button
          onClick={handleDelete}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </a>
  );
};

export default BookmarkCard;