/*
	The mock data to hold db
*/

const cache = require('./cache')

const ages = {
	John: '20',
	Michelle: '34',
	Amy: '31',
	Doug: '22'
}



const getAgeFromDb = async name => {
	console.log('Fetching Data From Db.')
	return new Promise(resolve => setTimeout(() => resolve(ages[name] || 'Does Not Exist'), 1000))
}

const getAgeFromCache = async (name, cb) => {
	// 1. Check if Item exists in cache
	cache.get(name, (err, age) => {
		if (age !== null){
			return cb(age)
		}

		// 2. Here, we are sure our data isnt in cache
		// So we query db as before
		getAgeFromDb(name).then( ageFromDb => {
			cache.set(name, ageFromDb, () => {
				//3. Our data is now stored in redis cache
				cb(ageFromDb)
			})
		})
	})
}

module.exports = getAgeFromCache
