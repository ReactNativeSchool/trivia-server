import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas/index";
import { resolvers } from "../../graphql/resolvers/index";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
