const mongoose = require('mongoose');
const RecipientSchema = require('./recipients');

const surveySchema = new mongoose.Schema({
    title: String,
    from_email: String,
    content: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date,
});

module.exports = mongoose.model('Survey', surveySchema);