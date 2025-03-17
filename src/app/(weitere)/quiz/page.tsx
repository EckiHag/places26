import { Button } from "@heroui/react";
import React from "react";

export default function QuizPage() {
  return (
    <div className="mt-24 flex flex-col items-center h-[calc(100dvh-100px)]">
      <h1>Quiz bei © EckiHag</h1>
      <Button className="bg-primary-400">
        <a href="https://quiznextquestion.vercel.app/" target="_blank" rel="noopener noreferrer">
          GotoQuiz
        </a>
      </Button>

      <h3>Login: quiz@quiz.com</h3>
      <h3>Password: quizquiz</h3>
    </div>
  );
}
