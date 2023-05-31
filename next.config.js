/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.us-west-2.amazonaws.com",
      "images.unsplash.com",
      "res.cloudinary.com"
    ],
  },
}

module.exports = nextConfig
