const express = require('express')
const passport = require('passport')
const Court = require('../models/court')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const { post } = require('../models/review')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Post
router.post('/reviews/:courtId', requireToken, (req, res, next) => {
	const courtId = req.params.courtId
    const review = req.body.review
	const rating = req.body.rating
	// review.owner = req.user.id
  	// review.rating = req.body.rating
	console.log('this is the rating', req.body)
    // const owner = req.body.
	console.log('this is user', req.user)
    req.body.review.owner = req.user.id
    console.log ("req user log", req.user.id)
    Court.findById(courtId)
		// respond to succesful `create` with status 201 and JSON of new "court"
		.then((court) => {
			court.review.push(review)
			court.review.push(rating)
			
			console.log ('this review is being posted', review)
            res.status(201).json({ court: court.toObject() })
            return court.save()
		})
		.catch(next)
})

// Patch
router.patch('/reviews/:courtId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
	// delete req.body.court.owner
    const review = req.body.review
    const courtId = req.params.courtId
    const reviewId = req.params.reviewId
    // console.log ('this review has been updated', review)
    
	Court.findById(courtId)
		.then(handle404)
		.then((court) => {
            // console.log ('Court review is', court.review)
			// console.log ('Court returns', court)
            const theReview = court.review.id(reviewId)
            // console.log('this is the review', theReview)
            // console.log ('the owner is', theReview.owner)
            requireOwnership(req, theReview)
            theReview.set(review)
			return court.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// Delete
router.delete('/reviews/:courtId/:reviewId', requireToken, (req, res, next) => {
	// delete req.body.court.owner
    const courtId = req.params.courtId
    const reviewId = req.params.reviewId
    // console.log ('this review has been updated', review)
    
	Court.findById(courtId)
		.then(handle404)
		.then((court) => {
            // console.log ('Court review is', court.review)
			// console.log ('Court returns', court)
            const theReview = court.review.id(reviewId)
            // console.log('this is the review', theReview)
            // console.log ('the owner is', theReview.owner)
            requireOwnership(req, theReview)
            theReview.remove()
			return court.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router