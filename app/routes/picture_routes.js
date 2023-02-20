const express = require('express')
const passport = require('passport')
const Court = require('../models/court')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const { post } = require('../models/picture')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Post
router.post('/pictures/:courtId', requireToken, (req, res, next) => {
	const courtId = req.params.courtId
    const picture = req.body.picture
    // const owner = req.body.
	console.log('this is user', req.user)
    req.body.picture.owner = req.user.id
    console.log ("req user log", req.user.id)
    Court.findById(courtId)
		// respond to succesful `create` with status 201 and JSON of new "court"
		.then((court) => {
			court.picture.push(picture)
            console.log ('this picture is being posted', picture)
            res.status(201).json({ court: court.toObject() })
            return court.save()
		})
		.catch(next)
})

// Delete
router.delete('/pictures/:courtId/:pictureId', requireToken, (req, res, next) => {
	// delete req.body.court.owner
    const courtId = req.params.courtId
    const pictureId = req.params.pictureId
    // console.log ('this picture has been updated', picture)
    
	Court.findById(courtId)
		.then(handle404)
		.then((court) => {
            // console.log ('Court picture is', court.picture)
			// console.log ('Court returns', court)
            const thePicture = court.picture.id(pictureId)
            // console.log('this is the picture', thePicture)
            // console.log ('the owner is', thePicture.owner)
            requireOwnership(req, thePicture)
            thePicture.remove()
			return court.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router