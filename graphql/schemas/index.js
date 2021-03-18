import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    greet: ExampleResponse
  }

  type ExampleResponse {
    name: String
    message: String
  }
`;
