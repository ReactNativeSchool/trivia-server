import mongoose from "mongoose";
import { connectMongo } from "../../util/dbConnect";

export const resolvers = {
  Query: {
    greet: async () => {
      await connectMongo();

      return {
        name: "Jane Doe",
        message: "Hello, world!",
      };
    },
  },
};
