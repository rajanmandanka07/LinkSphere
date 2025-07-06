import React, { useState } from 'react';
import axios from 'axios';

function AddLink({ onAddBookmark }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/api/bookmarks', { url });
      onAddBookmark(response.data);
      setUrl('');
    } catch (err) {
      console.error('Error adding bookmark:', err);
      setError(err.response?.data?.error || 'Failed to add bookmark. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Video URL (Any Platform)</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
          placeholder="e.g., https://www.youtube.com/watch?v=VIDEO_ID"
          disabled={loading}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  );
}

export default AddLink;