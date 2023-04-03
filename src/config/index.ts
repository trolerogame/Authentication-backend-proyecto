import dotenv from 'dotenv'
dotenv.config()
export const config = {
    cloudinaryCloudName:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET,
    port:process.env.PORT,
    originCors:process.env.ORIGINS_CORS,
    serverDb:process.env.SERVER_DB,
    secretKey:process.env.SECRET_KEY,
}