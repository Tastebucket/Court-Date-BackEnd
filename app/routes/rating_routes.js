const express = require('express')
const passport = require('passport')
const Court = require('../models/court')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Post
router.post('/ratings/:courtId', requireToken, (req, res, next) => {
	const courtId = req.params.courtId
    const rating = { rating: req.body.rating, owner: req.user.id}
    console.log('this is req.body',req.body)
	console.log('this is user', req.user)
    req.body.rating.owner = req.user.id
    console.log ("req user log", req.user.id)
    Court.findById(courtId)
		// respond to succesful `create` with status 201 and JSON of new "court"
		.then((court) => {
            console.log(court)
			court.rating.push(rating)
            
            // console.log ('this rating is being posted', rating)
            res.status(201).json({ court: court.toObject() })
            return court.save()
		})
		.catch(next)
})

// Patch
router.patch('/ratings/:courtId/:ratingId', requireToken, removeBlanks, (req, res, next) => {
	// delete req.body.court.owner
    const rating = req.body.rating
    const courtId = req.params.courtId
    const ratingId = req.params.ratingId
    // console.log ('this review has been updated', review)
    
	Court.findById(courtId)
		.then(handle404)
		.then((court) => {
            // console.log ('Court review is', court.review)
			// console.log ('Court returns', court)
            const theRating = court.rating.id(ratingId)
            // console.log('this is the review', theReview)
            // console.log ('the owner is', theReview.owner)
            requireOwnership(req, theRating)
            theRating.set(rating)
			return court.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router