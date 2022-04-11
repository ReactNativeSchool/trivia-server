import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import jwt from "jsonwebtoken";

import { typeDefs } from "../../graphql/schemas/index";
import { resolvers } from "../../graphql/resolvers/index";
import { connectMongo } from "../../util/dbConnect";
import { User } from "../../models/User";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await connectMongo();
    const context = {};

    if (req?.headers?.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ _id: decoded._id }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid user. Please sign in.");
      }

      context.user = user;
    }

    return context;
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
