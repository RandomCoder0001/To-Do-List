// jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var list_items = [];
var work_list = [];
const options_date = { weekday : 'long', month: 'short' ,day : 'numeric' }
const day = new Date().toLocaleDateString('en-us' , options_date);


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');

app.listen(5000 , function(){
    console.log("Server is on");
});

app.get("/", function(req , res){
    res.render('list' ,{ListTitle:day , list_items:list_items});
});

app.post("/", (req, res) =>{
    if(req.body.list === "Work"){
        work_list.push(req.body.list_item);
        res.redirect("/work");

    } else {
        list_items.push(req.body.list_item);
        res.redirect("/");
    }

})

app.get("/work" , (req , res) =>{
    res.render('list' ,{ListTitle : "Work" , list_items:work_list});
})


