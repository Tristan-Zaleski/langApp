// IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// CONNECTION TO DB/BACKEND
//const uri = "mongodb+srv://BRiNK:BRiNK@cluster0.37kbk.mongodb.net/?retryWrites=true&w=majority"
const uri = "mongodb://localhost:27017/langDB";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// CONSTRUCTION OF EXPRESS.JS APPs
const app = express();

// SCHEMA DECLARATION FOR INFO TO GO IN DB
const cardSchema = {
  foreignW: {
    type: String,
    required: true
  },
  englishW: {
    type: String,
    required: true
  },
  exampleP: {
    type: String,
  }
};

// CREATION OF MONGO MODEL FROM SCHEMA
const Card = mongoose.model("Card", cardSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ROOT/HOME ROUTE, RENDERS START VIEW, PASSING IN ALL CARDS FOUND IN DB
app.get("/", function(req,res){

  Card.find({}, function(err, cards){

    res.render("startV", {
      cards: cards
    });

  });
});

// NEW CARD ROUTE, RENDERS NEW CARD VIEW FOR GETTING CARD INFO
app.get("/newCard", function(req,res){
  res.render("newCard")
});

// NEW CARD POST ROUTE, SAVES GIVEN INFO TO DB, REDIRECTS TO ROOT/HOME ROUTE
app.post("/newCard", function(req,res){
  const card = new Card({
    foreignW: req.body.foreignWord,
    englishW: req.body.englishWord,
    exampleP: req.body.examplePhrases
  });
  console.log(card);

  card.save(function(err){
    if(!err){
      console.log("Uploaded new card!");
      res.redirect("/")
    }
  });
});

// APP DEPLOYMENT CALL, RUNS ON SET PORT, LISTENS FOR ACTIVITY
app.listen(3000, function(){
  console.log("Server started on port 3000... SUCCESS");
});
