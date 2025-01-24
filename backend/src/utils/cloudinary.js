import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import dotenv from 'dotenv';
// dotenv.config();
// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             console.error("No file path provided.");
//             return null;
//         }

//         if (!fs.existsSync(localFilePath)) {
//             console.error(`File does not exist at path: ${localFilePath}`);
//             return null;
//         }

//         console.log("Uploading file to Cloudinary:", localFilePath);
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto",  // You can change this to "image" for specific image files
//         });

//         console.log("File uploaded successfully:", response.url);

//         // Clean up local file after upload
//         fs.unlinkSync(localFilePath);

//         return response;
//     } catch (error) {
//         console.error("Error uploading avatar:", error);
//         fs.unlinkSync(localFilePath); // Remove the temporary file in case of error
//         return null;
//     }
// };

// export { uploadOnCloudinary };
