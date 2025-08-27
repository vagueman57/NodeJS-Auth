const express = require('express');
const authMiddleWare = require('../middleware/auth-middleware');
const router = express.Router();


router.get("/welcome", authMiddleWare,  (req, res) => {
  const {username, userId, role} = req.userInfo;
  res.json({
    message: "Welcome to the home page",
    user: {
      _id: userId,
      username,
      role 
    } 
  }); 
});

module.exports = router;