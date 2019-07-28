var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    imgLink: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        
        // 'type': {type: String},
		// value: [Schema.Types.ObjectId]
    }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;