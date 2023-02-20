const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const pictureSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}, {timestamps: true}
)

module.exports = pictureSchema