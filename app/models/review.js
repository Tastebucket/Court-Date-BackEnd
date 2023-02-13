const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
    }
)

module.exports = reviewSchema