import { useEffect, useState } from "react";
import { fetchQuiz, submitQuiz } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function QuizPage({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [showRewardCard, setShowRewardCard] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const cooldownKey = currentUser
    ? `quizCooldownUntil_${currentUser._id}`
    : null;

  /* ================= LOAD QUIZ ================= */
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz();
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(null));
      } catch (err) {
        if (err.code === "QUIZ_COOLDOWN") {
          const until = Date.now() + err.remainingMs;
          setCooldownUntil(until);
          if (cooldownKey) {
            localStorage.setItem(cooldownKey, until);
          }

        } else {
          setError("Quiz not available");
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [cooldownKey]);

  /* ================= RESTORE TIMER ================= */
  useEffect(() => {
    if (!cooldownKey) return;

    const saved = localStorage.getItem(cooldownKey);
    if (saved && Date.now() < saved) {
      setCooldownUntil(Number(saved));
    }
  }, [cooldownKey]);


  /* ================= COUNTDOWN TIMER ================= */
  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = setInterval(() => {
      const diff = cooldownUntil - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setCooldownUntil(null);
        setTimeLeft("");
        if (cooldownKey) {
          localStorage.removeItem(cooldownKey);
        }

      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownUntil, cooldownKey]);

  /* ================= ANSWER SELECT ================= */
  const handleSelect = (qIndex, optionIndex) => {
    const copy = [...answers];
    copy[qIndex] = optionIndex;
    setAnswers(copy);
  };

  /* ================= SUBMIT QUIZ ================= */
  const handleSubmit = async () => {
    if (answers.includes(null)) {
      setError("Please answer all questions");
      return;
    }
    if (cooldownUntil) return;


    setSubmitting(true);
    try {
      const res = await submitQuiz(
        {
          answers,
          questionIds: questions.map(q => q._id),
        });
      setQuizScore(res.score);
      setQuizFinished(true);
      setCooldownUntil(res.nextQuizAt);
      if (cooldownKey) {
        localStorage.setItem(cooldownKey, res.nextQuizAt);
      }


      if (res.passed) {
        const updatedUser = {
          ...currentUser,
          tokens: res.tokens,
        };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setEarnedTokens(res.reward); // 20
        setShowRewardCard(true);
      }
    } catch {
      setError("Quiz submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading quiz...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8f5] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {showRewardCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl space-y-4">

              <h2 className="text-2xl font-semibold text-green-600">
                🎉 Quiz Completed!
              </h2>

              <p className="text-gray-700 text-lg">
                Your Score:
                <span className="font-bold text-gray-900">
                  {" "}{quizScore} / {questions.length}
                </span>
              </p>

              <div className="border rounded-xl py-3 bg-green-50">
                <p className="text-green-700 font-semibold text-lg">
                  {earnedTokens > 0
                    ? `+${earnedTokens} Tokens Added`
                    : "No tokens earned"}
                </p>

              </div>

              <div className="flex justify-center items-center gap-2 text-lg font-bold text-[#5b6f00]">
                <span>🪙</span>
                <span>{currentUser?.tokens}</span>
              </div>

              <button
                onClick={() => {
                  setShowRewardCard(false);
                  navigate(-1);
                }}
                className="w-full mt-4 rounded-lg bg-green-600 text-white py-2 hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {quizFinished && !showRewardCard && quizScore < 3 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl space-y-4">

              <h2 className="text-2xl font-semibold text-red-600">
                ❌ Quiz Failed
              </h2>

              <p className="text-gray-700 text-lg">
                Your Score:
                <strong> {quizScore} / {questions.length}</strong>
              </p>

              <p className="text-gray-500">
                You need at least 3 correct answers to earn tokens.
              </p>

              <button
                onClick={() => navigate(-1)}
                className="w-full mt-4 rounded-lg bg-gray-600 text-white py-2 hover:bg-gray-700"
              >
                Go Back
              </button>
            </div>
          </div>
        )}



        {/* PAGE TITLE */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Earn Free Tokens
          </h1>
          <p className="text-gray-500 mt-1">
            Answer the quiz correctly to earn rewards
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading quiz...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-600 font-medium">
            {error}
          </p>
        )}

        {/* COOLDOWN TIMER */}
        {cooldownUntil && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-center">
            <h2 className="text-lg font-semibold text-yellow-800">
              Quiz Locked ⏳
            </h2>
            <p className="text-yellow-700 mt-2">
              You can attempt the quiz again in:
            </p>
            <p className="text-2xl font-bold text-yellow-900 mt-2">
              {timeLeft}
            </p>
          </div>
        )}


        {/* QUIZ QUESTIONS */}
        {!loading && !cooldownUntil && questions.length > 0 && (
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div
                key={q._id}
                className="border rounded-xl p-4 space-y-3"
              >
                <p className="font-medium text-gray-800">
                  {i + 1}. {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={answers[i] === idx}
                        onChange={() => handleSelect(i, idx)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {!loading && questions.length > 0 && (
          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting || cooldownUntil}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        )}
        {/* TOKEN GUIDE */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-600 space-y-2">
          <h3 className="font-semibold text-gray-800">
            🪙 Token Guide
          </h3>

          <ul className="list-disc list-inside space-y-1">
            <li>Each correct quiz completion gives you <strong>+20 tokens</strong>.</li>
            <li>You need tokens to generate AI travel itineraries.</li>
            <li>Quiz rewards are limited to prevent abuse.</li>
            <li>If you fail the quiz, no tokens are added.</li>
            <li>Tokens are stored securely in your account database.</li>
          </ul>

          <p className="text-xs text-gray-500 pt-2">
            Tip: Use tokens wisely for longer or detailed trips.
          </p>
        </div>


      </div>


    </div>
  );

}
