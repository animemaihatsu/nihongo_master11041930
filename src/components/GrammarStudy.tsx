import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: {
    japanese: string;
    reading?: string;
    english: string;
  }[];
  exercises: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

const grammarPoints: GrammarPoint[] = [
  {
    id: 'desu',
    title: 'です・ます形',
    explanation: '「です」は名詞や形容詞の後ろに付けて丁寧な表現を作ります。「ます」は動詞の丁寧形を作ります。',
    examples: [
      {
        japanese: '私は学生です。',
        reading: 'わたしはがくせいです。',
        english: 'I am a student.'
      },
      {
        japanese: '毎日勉強します。',
        reading: 'まいにちべんきょうします。',
        english: 'I study every day.'
      }
    ],
    exercises: [
      {
        question: '私は___です。(teacher)',
        options: ['先生', '学生', '友達', '日本人'],
        correct: 0
      },
      {
        question: '日本語を___。(study)',
        options: ['勉強します', '勉強する', '勉強', '勉強です'],
        correct: 0
      }
    ]
  },
  {
    id: 'particle-wa',
    title: '助詞「は」',
    explanation: '「は」は文の主題を示す助詞です。文の主語や話題を示すために使用されます。',
    examples: [
      {
        japanese: '私は日本人です。',
        reading: 'わたしはにほんじんです。',
        english: 'I am Japanese.'
      },
      {
        japanese: '東京は大きい都市です。',
        reading: 'とうきょうはおおきいとしです。',
        english: 'Tokyo is a big city.'
      }
    ],
    exercises: [
      {
        question: '彼___学生です。',
        options: ['は', 'が', 'を', 'に'],
        correct: 0
      },
      {
        question: '日本語___難しいです。',
        options: ['は', 'が', 'を', 'で'],
        correct: 0
      }
    ]
  }
];

export default function GrammarStudy() {
  const navigate = useNavigate();
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [showExercise, setShowExercise] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentPoint = grammarPoints[currentPointIndex];
  const currentExercise = currentPoint.exercises[currentExerciseIndex];

  const handleNext = () => {
    if (showExercise) {
      if (currentExerciseIndex < currentPoint.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        setShowExercise(false);
        setCurrentExerciseIndex(0);
      }
    } else if (currentPointIndex < grammarPoints.length - 1) {
      setCurrentPointIndex(currentPointIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (showExercise) {
      if (currentExerciseIndex > 0) {
        setCurrentExerciseIndex(currentExerciseIndex - 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        setShowExercise(false);
        setCurrentExerciseIndex(0);
      }
    } else if (currentPointIndex > 0) {
      setCurrentPointIndex(currentPointIndex - 1);
    }
  };

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              戻る
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">文法学習</h2>
              <p className="text-sm text-gray-600">レッスン1の文法</p>
            </div>
          </div>
        </div>

        {!showExercise ? (
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {currentPoint.title}
              </h3>
              <p className="text-gray-700 mb-6">{currentPoint.explanation}</p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">例文：</h4>
                {currentPoint.examples.map((example, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 space-y-2">
                    <p className="text-lg font-medium text-gray-900">
                      {example.japanese}
                    </p>
                    {example.reading && (
                      <p className="text-sm text-gray-600">{example.reading}</p>
                    )}
                    <p className="text-gray-700">{example.english}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowExercise(true)}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              練習問題を始める
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                練習問題 {currentExerciseIndex + 1}/{currentPoint.exercises.length}
              </h3>
              
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-900">
                  {currentExercise.question}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {currentExercise.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSubmit(index)}
                      disabled={showAnswer}
                      className={`p-4 text-left rounded-lg border ${
                        showAnswer
                          ? index === currentExercise.correct
                            ? 'bg-green-50 border-green-200'
                            : index === selectedAnswer
                            ? 'bg-red-50 border-red-200'
                            : 'bg-white border-gray-200'
                          : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showAnswer && (
                  <div className={`p-4 rounded-md ${
                    selectedAnswer === currentExercise.correct
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      {selectedAnswer === currentExercise.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className="font-medium">
                        {selectedAnswer === currentExercise.correct
                          ? '正解です！'
                          : '不正解です。正しい答えは「' + currentExercise.options[currentExercise.correct] + '」です。'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevious}
            className="flex items-center text-gray-600 hover:text-gray-900"
            disabled={currentPointIndex === 0 && !showExercise}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            前へ
          </button>
          <button
            onClick={handleNext}
            className="flex items-center text-gray-600 hover:text-gray-900"
            disabled={currentPointIndex === grammarPoints.length - 1 && !showExercise}
          >
            次へ
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}