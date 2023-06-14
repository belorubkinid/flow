const express = require('express');
const router = express.Router();
const userRouter = require('../routes/user.routes');
const profileRouter = require('../routes/profile.routes');

router.use('/', userRouter);
router.use('/', profileRouter);

module.exports = router;
