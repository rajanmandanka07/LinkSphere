import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLink from './AddLink';
import Bookmarks from './Bookmarks';
import Toster from './Toster';

function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  });

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('/api/bookmarks');
      setBookmarks(response.data);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      addToast('error', 'Failed to load bookmarks', 0);
    }
  };

  const handleAddBookmark = (bookmark) => {
    setBookmarks([bookmark, ...bookmarks]);
    addToast('success', 'Bookmark added successfully!', 3000);
  };

  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
  };

  const addToast = (type, message, duration) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message, duration, visible: true }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-5">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">LinkSphere</h1>
        <AddLink onAddBookmark={handleAddBookmark} />
      </div>
      <div className="mt-8 w-full">
        <Bookmarks bookmarks={bookmarks} onDelete={handleDelete} />
      </div>
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toster
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;