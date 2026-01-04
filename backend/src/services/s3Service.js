/**
 * AWS S3 Service - Handles all S3 operations
 * Implements best practices for cloud storage
 */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

/**
 * Upload file to S3 bucket
 * @param {Object} file - Multer file object
 * @returns {Promise} S3 upload result
 */
async function uploadToS3(file) {
  // Validate bucket name
  if (!BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME environment variable is not set');
  }

  // Generate unique filename to avoid collisions
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;
  const key = `images/${fileName}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Make objects publicly readable (adjust based on security requirements)
    ACL: 'public-read',
    // Add metadata for tracking
    Metadata: {
      originalname: file.originalname,
      uploaddate: new Date().toISOString()
    }
  };

  try {
    const result = await s3.upload(params).promise();
    console.log(`✅ File uploaded successfully: ${result.Key}`);
    return result;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
}

/**
 * List all images from S3 bucket
 * @returns {Promise<Array>} Array of image objects
 */
async function listImagesFromS3() {
  if (!BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME environment variable is not set');
  }

  const params = {
    Bucket: BUCKET_NAME,
    Prefix: 'images/', // Only list files in images/ folder
    MaxKeys: 100 // Limit for Free Tier safety
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    
    // Transform S3 objects into user-friendly format
    const images = data.Contents
      .filter(item => item.Size > 0) // Exclude folder markers
      .map(item => ({
        key: item.Key,
        url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${item.Key}`,
        size: item.Size,
        lastModified: item.LastModified
      }));

    return images;
  } catch (error) {
    console.error('S3 list error:', error);
    throw new Error(`Failed to list S3 objects: ${error.message}`);
  }
}

module.exports = {
  uploadToS3,
  listImagesFromS3
};