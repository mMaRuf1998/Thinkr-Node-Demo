const { Product } = require('./model/model.js')

const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/thinkr');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
    .then(evt => {
        console.log("Mongo Connection is Done !");
    })
    .catch(err => console.log(err));



let itemList = [
    {

        name: "Chicken",
        qty: 1,
        u_price: 150,
        price: 150
    },
    {

        name: "Beef",
        qty: 1,
        u_price: 750,
        price: 750
    },
    {
        name: "Goat",
        qty: 1,
        u_price: 990,
        price: 990
    }
];

const itemSeed = Product.insertMany(itemList)

    .then(evt => {
        console.log("Insertion Done !");
    })
    .catch(err => {
        console.log("Error !");
    })
