// jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = new mongoose.Schema({
    name : String
});

let list_items = [];

const Item = mongoose.model("item" , itemSchema);

function insert_db(req){
    
    const item = new Item ({
        name: req
    });
    item.save().then(() => {reload_list(list_items);});
    
}
function reload_list(list){ 
    Item.find((err , items) => {
        if(err){
            console.log(err);
        } else {
            list.length = 0;
            items.forEach((item) => {

                list.push(item.name);
            });
        }
    });

}
const options_date = { weekday : 'long', month: 'short' ,day : 'numeric' }
const day = new Date().toLocaleDateString('en-us' , options_date);


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');

app.listen(5000 , function(){
    console.log("Server is on");
});

app.get("/", function(req , res){
    //here
    reload_list(list_items)  ;    
    setTimeout(() => {
        res.render('list' ,{ListTitle:day , list_items:list_items});
    }, 1000);
    
});

app.post("/", (req, res) =>{
    if(req.body.list === "Work"){
        // here
        work_list.push(req.body.list_item);
        res.redirect("/work");

    } else {
        //here
        insert_db(req.body.list_item);
        // list_items.push(req.body.list_item);
        res.redirect("/");
    }

})

app.get("/work" , (req , res) =>{
    res.render('list' ,{ListTitle : "Work" , list_items:work_list});
})


