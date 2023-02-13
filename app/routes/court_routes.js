const express = require('express')
const passport = require('passport')
const Court = require('../models/court')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX
// GET /courts
router.get('/courts', (req, res, next) => {
	Court.find()
		.then((courts) => {
			return courts.map((court) => court.toObject())
		})
		// respond with status 200 and JSON of the courts
		.then((courts) => res.status(200).json({ courts: courts }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /courts/5a7db6c74d55bc51bdf39793
router.get('/courts/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Court.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "court" JSON
		.then((court) => res.status(200).json({ court: court.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /courts
router.post('/courts', requireToken, (req, res, next) => {
	// set owner of new court to be current user
	req.body.court.owner = req.user.id
	// grab body from front end and assign to a variable
	// body will be form from frontend
	Court.create(req.body.court)
		// respond to succesful `create` with status 201 and JSON of new "court"
		.then((court) => {
			res.status(201).json({ court: court.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /courts/5a7db6c74d55bc51bdf39793
router.patch('/courts/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.court.owner

	Court.findById(req.params.id)
		.then(handle404)
		.then((court) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, court)

			// pass the result of Mongoose's `.update` to the next `.then`
			return court.updateOne(req.body.court)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /courts/5a7db6c74d55bc51bdf39793
router.delete('/courts/:id', requireToken, (req, res, next) => {
	Court.findById(req.params.id)
		.then(handle404)
		.then((court) => {
			// throw an error if current user doesn't own `court`
			requireOwnership(req, court)
			// delete the court ONLY IF the above didn't throw
			court.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
