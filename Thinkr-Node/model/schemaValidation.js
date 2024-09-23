const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate');

const thinkr = Joi.object({
    product: Joi.object({
        name: Joi.string()
            .pattern(new RegExp('^[a-zA-Z ]*$'))
            .min(3)
            .required(),
        qty: Joi.number()
            .integer()
            .required()
            .min(0),
        u_price: Joi.number()
            .integer()
            .required()
            .min(0),
        category: Joi.string()
    })

})

    ;

module.exports = thinkr;
/*
const fun = async () => {
    try {
        const value = await thinkr.validateAsync({ name: 'acb23', qty: 56, u_price: 1 });
        console.log("Success");
    }
    catch (err) {

        console.log("Ki hoilo bro");
    }
}

fun()

*/