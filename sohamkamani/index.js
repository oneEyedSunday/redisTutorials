const express = require('express')
const app = express()

const ageService = require('./ageservice')

app.get('/', async (req, res) => {
	const {name} = req.query
	ageService(name, age => {
		res.end(age)
	})
})

app.listen(3000, () => {console.log('App listening on port 3000')})
