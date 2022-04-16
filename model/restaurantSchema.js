const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;
const Restaurant = require('./restaurantMongooseSchema');

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        _id: { type: GraphQLID },
        address: { type: adressDetails },
        borough: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        grades: { type: new GraphQLList(gradeDetails) },
        name: { type: GraphQLString },
        restaurant_id: { type: GraphQLString }
    })
});



const gradeDetails = new GraphQLObjectType({
    name: 'gradeDetails',
    description: 'Grade details of restaurant',
    fields: {
        date: { type: GraphQLString },
        grade: { type: GraphQLString },
        score: { type: GraphQLInt }
    }
});
const adressDetails = new GraphQLObjectType({
    name: 'addressDetails',
    description: 'Address details of restaurant',
    fields: {
        building: { type: GraphQLString },
        coord: { type: new GraphQLList(GraphQLString) },
        street: { type: GraphQLString },
        zipcode: { type: GraphQLString }
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        findById: {
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return Restaurant.findById(args.id);
            }
        },
        findByName: {
            type: RestaurantType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return Restaurant.findOne({ name: args.name })
            }
        },
        findByRestaurantId: {
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return Restaurant.findOne({ restaurant_id: args.id })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRestaurant: {
            type: RestaurantType,
            args: {
                borough: { type: new GraphQLNonNull(GraphQLString) },
                cuisine: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                restaurant_id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                var data = {
                    borough: args.borough,
                    cuisine: args.cuisine,
                    name: args.name,
                    restaurant_id: args.restaurant_id
                }
                return Restaurant(data).save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

