export const resolvers = {
  Query: {
    greet: () => {
      return {
        name: "Jane Doe",
        message: "Hello, world!",
      };
    },
  },
};
