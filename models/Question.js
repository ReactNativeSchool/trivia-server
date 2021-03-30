import * as mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  answers: [
    {
      answer: String,
      correct: Boolean,
    },
  ],
});

export const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
