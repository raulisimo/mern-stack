require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// DeprecationWarning: Mongoose: the strictQuery option will be switched back to false by default in Mongoose 7.
// Use mongoose.set('strictQuery', false); if you want to prepare for this change.
// Or use mongoose.set('strictQuery', true); to suppress this warning.
mongoose.set('strictQuery', true)

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method, req.url)
	next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				`Connected to db and listening on port ${process.env.PORT}`
			)
		})
	})
	.catch((error) => {
		console.log(error)
	})
