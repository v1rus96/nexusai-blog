"use client";

import { useState, useEffect, useCallback } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface ArticleQuizProps {
  slug: string;
  questions: Question[];
}

const STORAGE_KEY = "techlion-quiz-scores";

function getQuizScores(): Record<string, { score: number; total: number }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function ArticleQuiz({ slug, questions }: ArticleQuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState<{
    score: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const scores = getQuizScores();
    if (scores[slug]) {
      setPreviousScore(scores[slug]);
    }
  }, [slug]);

  const selectOption = useCallback((questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (Object.keys(answers).length < questions.length) return;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);

    const scores = getQuizScores();
    scores[slug] = { score: correct, total: questions.length };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));

    // Dispatch event for achievement tracking
    window.dispatchEvent(new CustomEvent("quiz-completed", { detail: { slug, score: correct, total: questions.length } }));
  }, [answers, questions, slug]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }, []);

  if (questions.length === 0) return null;

  const allAnswered = Object.keys(answers).length === questions.length;
  const ratio = questions.length > 0 ? score / questions.length : 0;

  const scoreGradient =
    ratio >= 0.9
      ? "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
      : ratio >= 0.5
        ? "bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
        : "bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent";

  const scoreMessage =
    ratio >= 0.9
      ? "Perfect! 🎉"
      : ratio >= 0.5
        ? "Almost there! 💪"
        : "Keep reading! 📚";

  return (
    <div className="mt-8 mx-auto max-w-2xl">
      <div className="bg-gradient-to-r from-[#E91E90] to-[#E91E90] rounded-2xl p-[1px] pt-[2px]">
        <div className="bg-gray-950/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-1">
            🧠 Test Your Knowledge
          </h3>
          <p className="text-sm text-white/50 mb-6">
            {questions.length} questions about this article
            {previousScore && !submitted && (
              <span className="ml-2 text-[#E91E90]">
                (Previous: {previousScore.score}/{previousScore.total})
              </span>
            )}
          </p>

          <div className="space-y-6">
            {questions.map((q, qi) => (
              <div key={qi}>
                <p className="text-sm font-semibold text-[#E91E90] mb-2">
                  Question {qi + 1} of {questions.length}
                </p>
                <p className="text-base font-medium text-white mb-3">
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = answers[qi] === oi;
                    const isCorrect = q.correct === oi;
                    let optionClasses =
                      "flex items-center gap-3 w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer text-sm ";

                    if (submitted) {
                      if (isCorrect) {
                        optionClasses +=
                          "bg-green-500/20 border-green-500/50 text-green-300";
                      } else if (isSelected && !isCorrect) {
                        optionClasses +=
                          "bg-red-500/20 border-red-500/50 text-red-300";
                      } else {
                        optionClasses +=
                          "opacity-50 pointer-events-none border-white/10 bg-white/5 text-white/80";
                      }
                    } else if (isSelected) {
                      optionClasses +=
                        "bg-white/10 border-[#E91E90]/50 text-white/80";
                    } else {
                      optionClasses +=
                        "bg-white/5 hover:bg-white/10 border-white/10 text-white/80";
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => selectOption(qi, oi)}
                        className={optionClasses}
                        disabled={submitted}
                      >
                        {submitted ? (
                          isCorrect ? (
                            <span className="text-green-400 w-5 h-5 flex-shrink-0 flex items-center justify-center font-bold">
                              ✓
                            </span>
                          ) : isSelected ? (
                            <span className="text-red-400 w-5 h-5 flex-shrink-0 flex items-center justify-center font-bold">
                              ✗
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full border-2 border-white/20 flex-shrink-0" />
                          )
                        ) : (
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                              isSelected
                                ? "bg-[#E91E90] border-[#E91E90]"
                                : "border-white/20"
                            }`}
                          />
                        )}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`mt-6 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 ${
                allAnswered
                  ? "bg-gradient-to-r from-[#E91E90] to-[#E91E90] hover:from-[#C61884] hover:to-[#C61884] hover:shadow-lg hover:shadow-[#E91E90]/25 active:scale-[0.98] cursor-pointer"
                  : "opacity-50 cursor-not-allowed bg-gradient-to-r from-[#E91E90] to-[#E91E90]"
              }`}
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center py-6 mt-6 border-t border-white/10">
              <p className={`text-4xl font-bold ${scoreGradient}`}>
                {score}/{questions.length}
              </p>
              <p className="text-sm text-white/50 mt-2">correct answers</p>
              <p className="text-base text-white/70 mt-3">{scoreMessage}</p>
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 text-sm text-[#E91E90] hover:text-blue-300 transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
