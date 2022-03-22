/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://bsu-application.herokuapp.com',
    ID:'bd143f21-9130-46e4-b93b-30e3b68854a3'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
}

module.exports = nextConfig

// env: {
//   API_URL: 'https://bsu-application.herokuapp.com',
//       ID:'bd143f21-9130-46e4-b93b-30e3b68854a3'
//
// API_URL: 'http://localhost:8080',
//     ID:'6338b801-4ed2-47e0-8a44-88f0d8da2ea2'
// },
