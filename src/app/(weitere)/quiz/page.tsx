import { Button } from "@heroui/react";
import React from "react";
import Link from "next/link";
export default function QuizPage() {
  return (
    <div className="mt-24 flex flex-col items-center h-[calc(100dvh-100px)]">
      <h1>Quiz bei © EckiHag</h1>
      <Button as={Link} href="https://quiznextquestion.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-primary-400">
        GotoQuiz
      </Button>

      <h3>Login: quiz@quiz.com</h3>
      <h3>Password: quizquiz</h3>
    </div>
  );
}
