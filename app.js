/******************************************************************************
***
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member Name: Balraj Singh - N01415998,Vishal Gami - N01452433 Date: 16-04-2022
*
*
******************************************************************************
**/
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./model/restaurantSchema')
const mongoose = require('mongoose');
const { eventNames } = require('./model/restaurantMongooseSchema');

mongoose.connect('mongodb+srv://vishalgami:vishalgami@cluster0.dc0fv.mongodb.net/sample_restaurants?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

const app = express();

//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

app.get('/',function (req, res) {
    res.redirect('/graphql');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});