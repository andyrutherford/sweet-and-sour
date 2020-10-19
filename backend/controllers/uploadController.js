import cloudinary from 'cloudinary';
import dotEnv from 'dotenv';

dotEnv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
