const mongoose = require('mongoose');
const productShema = new mongoose.Schema({
    _id:String,
    name:String,
    imageUrls:Array,
    stock:Number,
    price:Number,
    createdDate:Date,
    isActive:Boolean,
    categories:[{type:string, ref:'Category'}],
});

const Product = mongoose.model('Product', productShema);
module.exports = Product;