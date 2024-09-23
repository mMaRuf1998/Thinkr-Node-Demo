const mongoose = require('mongoose');
const Review = require('./reviews');

const imageSchema = new mongoose.Schema({
    _id: false ,
    url : {
        type : String 
    } , 
    filename : {
        type : String 
    }
})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    qty: {
        type: Number,
        min: 0,
        required: true,
    },

    price: {
        type: Number,
        min: 0,
    },
    u_price: {
        type: Number,
        min: 0,
        required: true
    },

    images : [imageSchema] ,

    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'fast food', 'drinks', 'household', 'others'],
        default: 'others'
    },

    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    } ,

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]


});

imageSchema.methods.thumbnail = function () {
    
    return this.url.replace("upload/","upload/c_thumb,g_face,h_100,w_100/")
}


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }

/*

let itemList = [
    {
        id: uuid(),
        name: "Chicken",
        qty: 1,
        u_price: 150,
        price: 150
    },
    {
        id: uuid(),
        name: "Beef",
        qty: 1,
        u_price: 750,
        price: 750
    },
    {
        id: uuid(),
        name: "Goat",
        qty: 1,
        u_price: 990,
        price: 990
    }
];

*/