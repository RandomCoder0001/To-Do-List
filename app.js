// jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var list_items = ["wake up"];
const value = "Hello";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');

app.listen(5000 , function(){
    console.log("Server is on");
});

app.get("/", function(req , res){
    res.render('list' ,{key:value , list_items:list_items});
});

app.post("/", (req, res) =>{
    list_items.push(req.body.list_item);
    res.redirect("/");
})

