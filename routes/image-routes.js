const express = require('express');
const authMiddleWare = require('../middleware/auth-middleware');
const adminMiddleWare = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware')
const {
  uploadImageController, 
  fetchImagesController, 
  deleteImageController
} = require('../controllers/image-controller'); 

const router = express.Router()

// upload image
router.post(
  "/upload", 
  authMiddleWare, 
  adminMiddleWare, // this line is ensuring that the only admin users can upload
  uploadMiddleware.single('image'), 
  uploadImageController
);

// to get all the images
router.get("/get", authMiddleWare, fetchImagesController);

// delete image route 
// 68a6e43e7c31c38ca6bfa0e1
// 68a6e4a27c31c38ca6bfa0e4
router.delete('/:id', authMiddleWare, adminMiddleWare, deleteImageController);

module.exports = router