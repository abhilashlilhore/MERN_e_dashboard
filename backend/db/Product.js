const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    productName:String,
    category:String,
    company:String,
    userid:String,
    price:String


})
module.exports=mongoose.model("product",productSchema);