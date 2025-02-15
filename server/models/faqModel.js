import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ;
