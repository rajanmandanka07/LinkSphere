import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLink from './AddLink';
import Bookmarks from './Bookmarks';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const [bookmarks, setBookmarks] = useState([]);

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
    switch (type) {
      case 'success':
        toast.success(message, { autoClose: duration > 0 ? duration : false });
        break;
      case 'error':
        toast.error(message, { autoClose: duration > 0 ? duration : false });
        break;
      default:
        toast.info(message, { autoClose: duration > 0 ? duration : false });
    }
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
      <ToastContainer position="top-right" className="mt-4" />
    </div>
  );
}

export default Home;