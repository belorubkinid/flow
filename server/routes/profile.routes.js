const express = require('express');
const router = express.Router();
const { eventPost, eventInit } = require('../controllers/profile.controller');

router.post('/profile/event', eventPost);
router.get('/profile/:id', eventInit);


module.exports = router;
