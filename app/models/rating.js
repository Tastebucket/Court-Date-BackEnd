const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const ratingSchema = new mongoose.Schema(
    {
        rating: {
            type: Number
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
            // required: true
    }
}, {timestamps: true}
)

module.exports = ratingSchema