const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  images: { 
    loader: 'imgix',
    path: 'http://localhost:5171',  
  },
  env: {
    SERVER_URL: 'http://localhost:5171',
    API_URL: 'http://localhost:5171/api/v1/pwa/',
  }
});