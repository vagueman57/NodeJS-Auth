const express = require('express');
const authMiddleWare = require('../middleware/auth-middleware');
const adminMiddleWare = require('../middleware/admin-middleware')

const router = express.Router();

router.get('/welcome', authMiddleWare,adminMiddleWare, (req, res) => {

  res.json({
    message: "Welcome to the admin page",
  })
})

module.exports = router;