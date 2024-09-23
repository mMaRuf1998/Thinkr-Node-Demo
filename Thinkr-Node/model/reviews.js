const mongoose = require('mongoose')
const express = require('express');
const { type } = require('./schemaValidation');
const app = express();

const { Schema } = mongoose;



const reviewSchema = new Schema({

    description: String,
    rating: Number ,
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
});


const Review = mongoose.model('Review', reviewSchema);

const createMany = async () => {
    await Review.create({ description: 'Unga Bunga', rating: 5 });
    await Review.create({ description: 'Unga 2', rating: 2 });
    await Review.create({ description: '3 Bunga', rating: 4 });

}

//createMany();


module.exports = { Review };



