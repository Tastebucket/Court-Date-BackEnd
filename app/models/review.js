const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema(
    {
        note: {
            type: String
        },
        rating: {
            type: Number, min: 1, max: 5
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}, {timestamps: true}
)

module.exports = reviewSchema