import mongoose from "mongoose";
import { unescape, shuffle } from "lodash";
import { ApolloError } from "apollo-server-micro";

import { Question } from "../../models/Question";
import { User } from "../../models/User";

export const resolvers = {
  Query: {
    greet: async () => {
      return {
        name: "Jane Doe",
        message: "Hello, world!",
      };
    },

    question: async () => {
      // const questions = await Question.find({}, null, { limit: 1 }).exec();
      const questions = await Question.aggregate([
        {
          $sample: { size: 1 },
        },
      ]);

      if (questions.length === 0) {
        throw new ApolloError("Sorry, you've run out of questions!");
      }

      const question = questions[0];

      return {
        _id: question._id,
        question: question.question,
        category: question.category,
        difficulty: question.difficulty,
        answers: shuffle(question.answers),
      };
    },
  },

  Mutation: {
    register: async (parent, args) => {
      const { username, password } = args.user;

      const user = await new User({ username, password }).save();

      return {
        username: user.username,
        token: "example token",
      };
    },

    fetchQuestions: async () => {
      const url = "https://opentdb.com/api.php?amount=3";
      const response = await fetch(url);
      const { results } = await response.json();

      const formattedResults = results.map((result) => {
        return {
          ...result,
          question: unescape(result.question),
          answers: [
            {
              answer: result.correct_answer,
              correct: true,
            },
            ...result.incorrect_answers.map((answer) => {
              return {
                answer: answer,
                correct: false,
              };
            }),
          ],
        };
      });

      const insertResult = await Question.insertMany(formattedResults);

      return { questionsSaved: insertResult.length };
    },
  },
};
