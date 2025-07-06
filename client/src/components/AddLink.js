import React, { useState } from 'react';
import axios from 'axios';

function AddLink({ onAddBookmark }) {
  const [url, setUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresVpn, setRequiresVpn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (requiresVpn) {
        if (!htmlContent) throw new Error('Please paste the HTML from the verified browser page.');
        const response = await axios.post('/api/bookmarks/vpn/bookmarks', { url, html: htmlContent });
        onAddBookmark(response.data);
      } else {
        const response = await axios.post('/api/bookmarks', { url });
        onAddBookmark(response.data);
      }
      setUrl('');
      setHtmlContent('');
      setRequiresVpn(false);
    } catch (err) {
      console.error('Error adding bookmark:', err);
      setError(err.response?.data?.error || 'Failed to add bookmark. ' + err.message);
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
      {requiresVpn && (
        <div className="mb-4">
          <label className="block text-gray-700">Paste HTML (Right-click {'>'} View Page Source after verification)</label>
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="Copy the HTML from your browser after verifying age, then paste here."
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">Tip: Copy only the &lt;body&gt; section if the full page is too large.</p>
        </div>
      )}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="requiresVpn"
          checked={requiresVpn}
          onChange={(e) => setRequiresVpn(e.target.checked)}
          className="mr-2"
          disabled={loading}
        />
        <label htmlFor="requiresVpn" className="text-gray-700">Requires VPN/Age Verification</label>
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