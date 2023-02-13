const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema(
    {
        note: {
            type: String
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}, {timestamps: true}
)

module.exports = reviewSchema