import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FAQ from "./models/faqModel.js";
import connectDB from "./db.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({ origin: "http://localhost:5173" })); // Adjust port if needed

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    // Check if the question is in the database first
    const faq = await FAQ.findOne({ question: message });
    if (faq) {
      return res.json({ response: faq.answer }); // Return pre-stored answer
    }

    // If not found, ask Gemini AI
    const response = await model.generateContent(message);
    const aiResponse = response.response.text();

    // Store new question-answer pair in MongoDB
    await FAQ.create({ question: message, answer: aiResponse });

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get response" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
