import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas/index";
import { resolvers } from "../../graphql/resolvers/index";
import { connectMongo } from "../../util/dbConnect";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectMongo();

    return {};
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
