const redis = require('redis')
const client = redis.createClient()

// log errors
client.on('error', err => {
  console.log("Error " + err)
})


module.exports = client
