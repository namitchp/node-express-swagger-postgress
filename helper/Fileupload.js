import Config from "../config";

//import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: Config.COULD_NAME,
//   api_key: Config.API_KEY,
//   api_secret: Config.API_SCREAT,
// });      
cloudinary.config({ 
  cloud_name: 'duf3xr8z4', 
  api_key: '936999589567835', 
  api_secret: '7I0513ngEhhcpiV-Qj3STRLD4N8' 
});
export function Base64ImageUploader(base64Url) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(`${base64Url}`, (error, result) => {
      if (error) {
        console.log(error, "hh");
        reject(false); // If there's an error, reject the Promise
      } else {
        //console.log(result, "jij");
        resolve(result.secure_url); // If successful, resolve with the URL
      }
    });
  });
}

export function Base64PdfUploader(base64Url) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(`${base64Url}`, (error, result) => {
      if (error) {
        reject(false); // If there's an error, reject the Promise
      } else {
        resolve(result.secure_url); // If successful, resolve with the URL
      }
    });
  });
}
