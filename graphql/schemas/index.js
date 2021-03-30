import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    greet: ExampleResponse
  }

  type Mutation {
    fetchQuestions: FetchQuestionsResponse
  }

  type ExampleResponse {
    name: String
    message: String
  }

  type FetchQuestionsResponse {
    questionsSaved: Int
  }
`;
