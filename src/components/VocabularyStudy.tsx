import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Repeat, CheckCircle2, XCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VocabularyWord {
  japanese: string;
  reading?: string;
  english: string;
  category: string;
}

const vocabularyList: VocabularyWord[] = [
  // School
  { japanese: '大学', reading: 'だいがく', english: 'college; university', category: 'School' },
  { japanese: '高校', reading: 'こうこう', english: 'high school', category: 'School' },
  { japanese: '学生', reading: 'がくせい', english: 'student', category: 'School' },
  { japanese: '大学生', reading: 'だいがくせい', english: 'college student', category: 'School' },
  { japanese: '留学生', reading: 'りゅうがくせい', english: 'international student', category: 'School' },
  { japanese: '先生', reading: 'せんせい', english: 'teacher; Professor', category: 'School' },
  { japanese: '一年生', reading: 'いちねんせい', english: 'first-year student', category: 'School' },
  { japanese: '専攻', reading: 'せんこう', english: 'major', category: 'School' },
  
  // Person
  { japanese: '私', reading: 'わたし', english: 'I', category: 'Person' },
  { japanese: '友達', reading: 'ともだち', english: 'friend', category: 'Person' },
  { japanese: '日本人', reading: 'にほんじん', english: 'Japanese people', category: 'Person' },
  
  // Time
  { japanese: '今', reading: 'いま', english: 'now', category: 'Time' },
  { japanese: '午前', reading: 'ごぜん', english: 'A.M.', category: 'Time' },
  { japanese: '午後', reading: 'ごご', english: 'P.M.', category: 'Time' },
  { japanese: '半', reading: 'はん', english: 'half', category: 'Time' },
  
  // Others
  { japanese: '日本', reading: 'にほん', english: 'Japan', category: 'Others' },
  { japanese: 'アメリカ', english: 'U.S.A.', category: 'Others' },
  { japanese: '日本語', reading: 'にほんご', english: 'Japanese language', category: 'Others' },
  { japanese: '電話', reading: 'でんわ', english: 'telephone', category: 'Others' },
];

type StudyMode = 'flashcard' | 'quiz';

export default function VocabularyStudy() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcard');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = ['All', ...new Set(vocabularyList.map(word => word.category))];
  const filteredWords = selectedCategory === 'All' 
    ? vocabularyList 
    : vocabularyList.filter(word => word.category === selectedCategory);

  const currentWord = filteredWords[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
    setIsFlipped(false);
    setShowAnswer(false);
    setQuizAnswer('');
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    setIsFlipped(false);
    setShowAnswer(false);
    setQuizAnswer('');
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnswer(true);
  };

  const isCorrectAnswer = () => {
    const answers = [
      currentWord.english.toLowerCase(),
      currentWord.japanese,
      currentWord.reading,
    ].filter(Boolean);
    return answers.some(answer => answer?.toLowerCase() === quizAnswer.toLowerCase());
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
              <h2 className="text-2xl font-bold text-gray-900">単語学習</h2>
              <p className="text-sm text-gray-600">レッスン1の単語一覧</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setStudyMode('flashcard')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  studyMode === 'flashcard'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                フラッシュカード
              </button>
              <button
                onClick={() => setStudyMode('quiz')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                  studyMode === 'quiz'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                クイズ
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[300px] mb-6">
          {studyMode === 'flashcard' ? (
            <div className="w-full max-w-md">
              <div
                className={`relative w-full aspect-[3/2] cursor-pointer transition-all duration-300 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="absolute inset-0 backface-hidden">
                  <div className="w-full h-full bg-white border-2 border-indigo-100 rounded-xl p-8 flex flex-col items-center justify-center">
                    <span className="text-4xl mb-4">{currentWord.japanese}</span>
                    {currentWord.reading && (
                      <span className="text-lg text-gray-600">{currentWord.reading}</span>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
                  <div className="w-full h-full bg-indigo-50 border-2 border-indigo-100 rounded-xl p-8 flex flex-col items-center justify-center">
                    <span className="text-2xl text-gray-900">{currentWord.english}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="bg-white border-2 border-indigo-100 rounded-xl p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl mb-2 block">{currentWord.japanese}</span>
                  {currentWord.reading && (
                    <span className="text-lg text-gray-600">{currentWord.reading}</span>
                  )}
                </div>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="英語の意味を入力してください"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    disabled={showAnswer}
                  />
                  {!showAnswer ? (
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      回答を確認
                    </button>
                  ) : (
                    <div className={`text-center p-4 rounded-md ${
                      isCorrectAnswer() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      <div className="flex items-center justify-center mb-2">
                        {isCorrectAnswer() ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mr-2" />
                        )}
                        <span className="font-medium">
                          {isCorrectAnswer() ? '正解です！' : '不正解です'}
                        </span>
                      </div>
                      {!isCorrectAnswer() && (
                        <p>正解: {currentWord.english}</p>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevious}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {filteredWords.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}