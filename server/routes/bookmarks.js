const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { url } = req.body;
  let title = 'Untitled Bookmark';
  let thumbnail = 'https://placehold.co/400x200';

  try {
    // Fetch webpage to extract title and thumbnail
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);

    // Extract title from og:title or <title> tag
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const pageTitle = $('title').text();
    title = ogTitle || pageTitle || title;

    // Extract thumbnail from og:image
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && ogImage.startsWith('http')) {
      thumbnail = ogImage;
    }

    const bookmark = new Bookmark({
      url,
      title,
      thumbnail
    });

    const newBookmark = await bookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error('Error fetching metadata:', err.message);
    // Save bookmark with default title and thumbnail if fetching fails
    const bookmark = new Bookmark({
      url,
      title,
      thumbnail
    });
    try {
      const newBookmark = await bookmark.save();
      res.status(201).json(newBookmark);
    } catch (saveErr) {
      res.status(400).json({ message: saveErr.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bookmark deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updated VPN POST route to parse client-provided HTML
router.post('/vpn/bookmarks', async (req, res) => {
  const { url, html } = req.body;
  try {
    if (!html) throw new Error('HTML content is required');
    const $ = cheerio.load(html);
    const title = $('title').text() || 'Untitled';
    const thumbnail = $('meta[property="og:image"]').attr('content') || 'https://placehold.co/400x200';
    const bookmark = new Bookmark({ url, title, thumbnail });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to save VPN bookmark' });
  }
});

module.exports = router;