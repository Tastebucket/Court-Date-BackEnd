const mongoose = require('mongoose')
const commentSchema = require('./review')

const courtSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		location: {
			required: true
		},
		rating: {
			type: [Number]
		},
		picture: {
			type: []
		},
		review: {
			type: [commentSchema]
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
			type: Number
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
			type: NUmber
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Court', courtSchema)
