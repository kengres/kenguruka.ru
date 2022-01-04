require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./api/typeDefs");
const resolvers = require("./api/resolvers");
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    return {};
  },
});

const app = express();
const apiPath = '/graphql';

app.get('*', (req, res, next) => {
  console.log(req.method, req.url)
  const customPort = process.env.NODE_ENV === "production" ? "" : `:${PORT}`;
  const webAddress = `${req.protocol}://${req.hostname}${customPort}${req.baseUrl}${req.path}`;
  console.log(`req url: `, webAddress)
  next()
})

app.get('/', (req, res) => res.send('Hello World!'))

server.applyMiddleware({ app, apiPath });

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
  .catch(e => console.log(`could not start apollo server: `, e));
