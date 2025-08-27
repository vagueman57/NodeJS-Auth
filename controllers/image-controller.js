const Image = require('../models/Image'); 
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async(req, res ) => {
  try{
    // check if file is missing  in req object
    if(!req.file){
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image"
      })
    }

     // Debug: Log file info
    console.log('File info:', req.file);

    // upload to cloudinary
    const {url, publicId} = await uploadToCloudinary(req.file.path);
    
     // Debug: Log cloudinary response
    console.log('Cloudinary upload:', {url, publicId});

    // Debug: Log user info
    console.log('User info:', req.userInfo);

    // store the image url and public id along with the uploaded user id 
    const newlyUploadedImage = new Image({
      url, 
      publicId,
      uploadedBy: req.userInfo.userId,
    })

    await newlyUploadedImage.save();

    // delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage
    })

  } catch(error){
    console.log(error);
     res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again'
     })
  }
};

const fetchImagesController = async(req, res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const sortBy =req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if(images){
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch(e){
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Something went wrong while fetching! Please try again",
    })
  }
};

const deleteImageController = async(req, res) => {
  try{
    const ImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(ImageToBeDeleted);

    if(!image){
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }

    // check if this image is uploaded bt the current user who is trying to delete this image
    if(image.uploadedBy.toString() !== userId){
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image"
      })
    }

    // delete this image first from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    // now delete the image form mongoDB database
    await Image.findByIdAndDelete(ImageToBeDeleted);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    })

  } catch(error){
    res.status(500).json({
      success: false,
      message: "something went wrong while deleting the image! Please try again",
    })
  }
}

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};