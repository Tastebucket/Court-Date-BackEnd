const express = require('express')
const passport = require('passport')
const Court = require('../models/court')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// UPDATE
// PATCH /courts/5a7db6c74d55bc51bdf39793
router.patch('/courts/:id/upload', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.court.owner
	console.log(req.body)
	Court.findById(req.params.id)
		.then(handle404)
		.then((court) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, court)
			console.log(req.body.court)
			// pass the result of Mongoose's `.update` to the next `.then`
			return court.updateOne(req.body.court)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})