// implement your API here
const express = require('express')
const users = require('./data/db.js')
const server = express();

const port = 5000
const parser = express.json()


server.use(parser)

server.get('/api/users', (req, res) => {
	users.find()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			console.log(err)
		})
})

server.get(`/api/users/:id`, (req, res) => {
	const id = req.params.id
	users.findById(id)
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			console.log(error)
		})
})

server.post('/api/users', (req, res) => {
	users.insert(req.body)
		.then(user => {
			res.status(201).json({success: true})
		})
		.catch(err => console.log(err))
})

server.listen(port, () => {
	console.log(`Server is running on Port: ${port}`)
})

