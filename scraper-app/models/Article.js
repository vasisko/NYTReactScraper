var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

// Schema object for articles
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
