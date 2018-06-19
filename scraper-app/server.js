const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// SCRAPE FOR NEWS --------------------//
// SCRAPE route
app.get("/scrape", function(req,res){

  // Scrape for news------------------------------
  axios.get("http://www.nytimes.com", ).then(function(response) {
  
      // Load the HTML into cheerio 
      var $ = cheerio.load(response.data);

      // Scrape for latest posted articles
      $("article").each(function(i, element) {
          // Array for scraped data 
          var results = {};

          results.link = $(this).children("h2").attr("href");
          results.title = $(this).children("h2").text();
          results.date = $(this).children().children("time").attr("datestamp");
          
          
          // Create new Article from model using results
          if (results.title && results.link && results.summary){
              
              db.Article.create(results) 
              .then(function(dbArticle){
                  console.log(dbArticle);
              })
              .catch(function(err){
                  console.log(err);
              });
          }

      });

      // Log the results once you've looped through each of the elements found with cheerio
      res.send("scraped!");
      });
  //--------------------------------------
});







//-----------------------------------//


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
