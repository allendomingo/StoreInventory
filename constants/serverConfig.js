const DEV_MONGO_URL = 'mongodb://localhost/storeInventory' // change this to whatever the mongoose URL is on your local machine 

const getMongoUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return DEV_MONGO_URL
    case 'production':
      return process.env.MONGO_URL
    default:
      return process.env.MONGO_URL
  }
}

module.exports = {
  getMongoUrl
}
