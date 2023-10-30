const { Router } = require('express');
const indexController = require('../controllers/indexController');

const router = Router();

// GET request for creating a short url
router.get('/', indexController.url_create_get);

// GET request using short url
router.get('/:urlCode', indexController.short_url_get);

// POST request for creating a short url
router.post('/', indexController.short_url_create_post);

module.exports = router;
