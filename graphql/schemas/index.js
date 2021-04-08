import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    greet: ExampleResponse
    question: Question
    me: User
  }

  type Mutation {
    fetchQuestions: FetchQuestionsResponse
    register(user: NewUser!): AuthResponse
    signin(username: String!, password: String!): AuthResponse
    completeQuestion(questionId: String!, correct: Boolean!): Stats
  }

  input NewUser {
    username: String!
    password: String!
  }

  type User {
    username: String
    stats: Stats
  }

  type Stats {
    questionsAnswered: Int
    questionsAnsweredCorrectly: Int
  }

  type AuthResponse {
    username: String
    token: String
  }

  type ExampleResponse {
    name: String
    message: String
  }

  type FetchQuestionsResponse {
    questionsSaved: Int
  }

  type Question {
    _id: String
    question: String
    category: String
    difficulty: String
    answers: [QuestionAnswer]
  }

  type QuestionAnswer {
    answer: String
    correct: Boolean
  }
`;
