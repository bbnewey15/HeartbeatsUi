const withPWA = require('next-pwa')

module.exports = withPWA({
	assetPrefix: process.env.NODE_ENV === 'development' ? '' : '',
    publicRuntimeConfig: {
      ENDPOINT_PORT: process.env.PORT || "8000",
	    basePath: process.env.NODE_ENV === 'development' ? '' : '',
    },
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      scope: '/',
      subdomainPrefix: '',
    }
  })
