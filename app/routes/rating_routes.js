// const express = require('express')
// const passport = require('passport')
// const Court = require('../models/court')
// const customErrors = require('../../lib/custom_errors')
// const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
// const { post } = require('../models/rating')
// const requireToken = passport.authenticate('bearer', { session: false })

// const router = express.Router()

// // Post
// router.post('/ratings/:courtId', requireToken, (req, res, next) => {
// 	const courtId = req.params.courtId
//     const rating = req.body.rating
//     // const owner = req.body.
// 	console.log('this is user', req.user)
//     req.body.rating.owner = req.user.id
//     console.log ("req user log", req.user.id)
//     Court.findById(courtId)
// 		// respond to succesful `create` with status 201 and JSON of new "court"
// 		.then((court) => {
// 			court.rating.push(rating)
//             console.log ('this rating is being posted', rating)
//             res.status(201).json({ court: court.toObject() })
//             return court.save()
// 		})
// 		.catch(next)
// })

// // Patch
// router.patch('/ratings/:courtId/:ratingId', requireToken, removeBlanks, (req, res, next) => {
// 	// delete req.body.court.owner
//     const rating = req.body.rating
//     const courtId = req.params.courtId
//     const ratingId = req.params.ratingId
//     // console.log ('this rating has been updated', rating)
    
// 	Court.findById(courtId)
// 		.then(handle404)
// 		.then((court) => {
//             // console.log ('Court rating is', court.rating)
// 			// console.log ('Court returns', court)
//             const therating = court.rating.id(ratingId)
//             // console.log('this is the rating', therating)
//             // console.log ('the owner is', therating.owner)
//             requireOwnership(req, therating)
//             therating.set(rating)
// 			return court.save()
// 		})
// 		// if that succeeded, return 204 and no JSON
// 		.then(() => res.sendStatus(204))
// 		// if an error occurs, pass it to the handler
// 		.catch(next)
// })

// // Delete
// router.delete('/ratings/:courtId/:ratingId', requireToken, (req, res, next) => {
// 	// delete req.body.court.owner
//     const courtId = req.params.courtId
//     const ratingId = req.params.ratingId
//     // console.log ('this rating has been updated', rating)
    
// 	Court.findById(courtId)
// 		.then(handle404)
// 		.then((court) => {
//             // console.log ('Court rating is', court.rating)
// 			// console.log ('Court returns', court)
//             const therating = court.rating.id(ratingId)
//             // console.log('this is the rating', therating)
//             // console.log ('the owner is', therating.owner)
//             requireOwnership(req, therating)
//             therating.remove()
// 			return court.save()
// 		})
// 		// if that succeeded, return 204 and no JSON
// 		.then(() => res.sendStatus(204))
// 		// if an error occurs, pass it to the handler
// 		.catch(next)
// })

// module.exports = router