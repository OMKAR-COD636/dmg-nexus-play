import { useState } from "react"
import { useParams, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, CheckCircle, XCircle } from "lucide-react"

const quizData = {
  fire: {
    title: "Fire Safety Quiz",
    questions: [
      {
        question: "What should you do first when you discover a fire?",
        options: ["Try to put it out", "Sound the alarm", "Look for the cause", "Open windows"],
        correct: 1
      },
      {
        question: "How should you exit a smoke-filled room?",
        options: ["Walk upright", "Crawl low", "Run quickly", "Cover your nose"],
        correct: 1
      }
    ]
  },
  earthquake: {
    title: "Earthquake Response Quiz", 
    questions: [
      {
        question: "During an earthquake, what is the safest action?",
        options: ["Run outside", "Stand in doorway", "Drop, cover, hold", "Hide under stairs"],
        correct: 2
      },
      {
        question: "After an earthquake, you should:",
        options: ["Use elevators", "Check for injuries", "Light candles", "Rush outside"],
        correct: 1
      }
    ]
  },
  flood: {
    title: "Flood Survival Quiz",
    questions: [
      {
        question: "How much water can knock you down?",
        options: ["12 inches", "6 inches", "18 inches", "2 feet"],
        correct: 1
      },
      {
        question: "During a flood warning, you should:",
        options: ["Wait and see", "Move to higher ground", "Drive through water", "Stay in basement"],
        correct: 1
      }
    ]
  }
}

const QuizPage = () => {
  const { disaster } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const quiz = quizData[disaster as keyof typeof quizData]
  
  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground">Quiz not found</h1>
        <Button asChild className="mt-4">
          <NavLink to="/">Go Home</NavLink>
        </Button>
      </div>
    )
  }

  const handleAnswer = () => {
    if (selectedAnswer === null) return
    
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    
    if (selectedAnswer === quiz.questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-foreground">{quiz.title} Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-primary">
              {score}/{quiz.questions.length}
            </div>
            <p className="text-xl text-muted-foreground">
              {score === quiz.questions.length 
                ? "Perfect! You're well-prepared for emergencies!" 
                : score >= quiz.questions.length / 2
                ? "Good job! Keep studying to improve your emergency preparedness."
                : "Keep learning! Emergency preparedness is crucial for safety."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                Retake Quiz
              </Button>
              <Button asChild>
                <NavLink to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </NavLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-foreground">{quiz.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {quiz.questions.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            {quiz.questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-accent/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          
          <Button 
            onClick={handleAnswer} 
            disabled={selectedAnswer === null}
            className="w-full"
          >
            {currentQuestion + 1 === quiz.questions.length ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizPage