/** @type {import('next').NextConfig} */


module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'files.stripe.com'
        },
      ],
    },
    reactStrictMode:false
  }
