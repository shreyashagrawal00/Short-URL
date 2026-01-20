const express = require("express");
const { handleGenerateNewShortUrl, handleRedirectUrl, handleGetAnalytics, handleDeleteUrl } = require("../controllers/url")
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
router.post('/delete/:id', handleDeleteUrl);

module.exports = router;