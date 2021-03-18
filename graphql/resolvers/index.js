import mongoose from "mongoose";
import { connectMongo } from "../../util/dbConnect";

export const resolvers = {
  Query: {
    greet: async () => {
      console.log("before", mongoose.connection.readyState);
      await connectMongo();
      console.log("after", mongoose.connection.readyState);

      return {
        name: "Jane Doe",
        message: "Hello, world!",
      };
    },
  },
};
