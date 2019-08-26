interface Config {
  dbConnectionString: string
  dbName: string
  accessTokenSecret: string
  refreshTokenSecret: string
  cloudinary: CloudinaryConfig
}

interface CloudinaryConfig {
  apiKey: string
  apiSecret: string
  baseEndpoint: string
  uploadPreset: string
  cloudName: string
}

export const config: Config = {
  dbConnectionString:
    '***REMOVED***',
  dbName: '***REMOVED***',
  accessTokenSecret: '***REMOVED***',
  refreshTokenSecret: '***REMOVED***',
  cloudinary: {
    apiKey: '***REMOVED***',
    apiSecret: '***REMOVED***',
    baseEndpoint: 'https://api.cloudinary.com/v1_1',
    uploadPreset: 'stenstroem-dev-upload-preset',
    cloudName: 'stnstrm',
  },
}
