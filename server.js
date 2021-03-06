const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require ('./typeDefs')
const resolvers = require ('./resolvers')
const mongoose = require ('mongoose')
const cors = require('cors')


async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app : app});

    app.use((req, res) => {
        res.send("hello from express apollo server")
    });
    await mongoose.connect("mongodb://localhost:27017/card",{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })

    console.log('Mongoose connected...')
    app.use(cors())
    app.listen(4000,()=>console.log("servr in running on prot 4000"))
}

startServer(); 