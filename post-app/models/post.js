var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post", postSchema);