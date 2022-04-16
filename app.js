const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./model/restaurantSchema')
const mongoose = require('mongoose');

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

app.listen(3000, () => {
    console.log('Listening on port 3000');
});