import mongoose from "mongoose";
import { unescape } from "lodash";

import { connectMongo } from "../../util/dbConnect";
import { Question } from "../../models/Question";

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

  Mutation: {
    fetchQuestions: async () => {
      await connectMongo();

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
