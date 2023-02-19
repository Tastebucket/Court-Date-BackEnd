const mongoose = require('mongoose')
const reviewSchema = require('./review')
const ratingSchema = require('./rating')

const courtSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
		picture: {
			type: [String]
		},
		nets: {
			type: Boolean
		},
		isIndoor: {
			type: Boolean
		},
		hasLight: {
			type: Boolean
		},
		cost: {
			type: Number
		},
		hours: {
			type: String
		},
		surface: {
			type: String,
			enum: ['blacktop/asphalt', 'hardwood', 'rubber'],
			default: 'blacktop/asphalt'
		},
		numberOfHoops: {
			type: Number,
			required: true
		},
		numberOfCourts: {
			type: Number,
			required: true
		},
		typeOfRims: {
			type: String,
			enum: ['single', 'double'],
			default: 'single'
		},
		review: [reviewSchema],
		rating: [ratingSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Court', courtSchema)
