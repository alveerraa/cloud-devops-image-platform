/**
 * Upload Routes - Handles image upload and retrieval operations
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToS3, listImagesFromS3 } = require('../services/s3Service');

// Configure multer for memory storage (files stored in RAM temporarily)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (AWS Free Tier safe)
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

/**
 * POST /api/upload
 * Upload an image to S3
 */
router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    console.log(`📤 Uploading file: ${req.file.originalname} (${req.file.size} bytes)`);

    // Upload to S3
    const result = await uploadToS3(req.file);

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.Location,
      key: result.Key,
      bucket: result.Bucket
    });

  } catch (error) {
    console.error('Upload error:', error);
    next(error);
  }
});

/**
 * GET /api/images
 * Retrieve list of all uploaded images
 */
router.get('/images', async (req, res, next) => {
  try {
    const images = await listImagesFromS3();
    
    res.status(200).json({
      count: images.length,
      images: images
    });

  } catch (error) {
    console.error('List images error:', error);
    next(error);
  }
});

module.exports = router;