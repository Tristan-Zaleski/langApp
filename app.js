const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/langDB";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

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

const Card = mongoose.model("Card", cardSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  Card.find({}, function(err, cards){

    res.render("startV", {
      cards: cards
    });
  });
});

app.get("/newCard", function(req,res){
  res.render("newCard")
});

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

app.listen(3000, function(){
  console.log("Server started on port 3000... SUCCESS");
});
