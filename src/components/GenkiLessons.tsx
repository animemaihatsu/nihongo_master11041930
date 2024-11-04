import React, { useState } from 'react';
import { BookOpen, Star, Clock, ArrowRight } from 'lucide-react';
import LessonModal from './LessonModal';

const lessons = [
  {
    id: 1,
    title: 'レッスン1: 新しい友達',
    description: '自己紹介、挨拶、基本的な会話',
    grammar: ['です/ます', '〜は〜です', '〜の'],
    vocabulary: ['挨拶', '数字', '職業'],
    progress: 85,
    estimatedTime: '2時間',
    difficulty: '初級'
  },
  {
    id: 2,
    title: 'レッスン2: 買い物',
    description: '買い物、値段、好みを表現する',
    grammar: ['〜を', '〜が', '〜たい'],
    vocabulary: ['食べ物', '飲み物', '形容詞'],
    progress: 60,
    estimatedTime: '2.5時間',
    difficulty: '初級'
  },
  {
    id: 3,
    title: 'レッスン3: 日常生活',
    description: '日課、時間、予定を話す',
    grammar: ['〜ます形', '時間表現', '〜ましょう'],
    vocabulary: ['動詞', '時間', '場所'],
    progress: 30,
    estimatedTime: '3時間',
    difficulty: '初級'
  },
  {
    id: 4,
    title: 'レッスン4: 週末の予定',
    description: '趣味、約束、予定を立てる',
    grammar: ['〜ませんか', '〜ましょうか', '〜たいです'],
    vocabulary: ['趣味', '場所', '時間'],
    progress: 0,
    estimatedTime: '2.5時間',
    difficulty: '初級'
  }
];

export default function GenkiLessons() {
  const [selectedLesson, setSelectedLesson] = useState<typeof lessons[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartLesson = (lesson: typeof lessons[0]) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleSelectStudyType = (type: string) => {
    // Here you would handle the navigation to the specific study content
    console.log(`Starting ${type} study for lesson ${selectedLesson?.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">げんき</h2>
            <p className="text-sm text-gray-600 mt-1">
              初級日本語の総合的な学習
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              総合進捗率: <span className="font-semibold text-gray-900">43%</span>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '43%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                <span className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                  {lesson.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase">文法ポイント</h4>
                  <div className="flex flex-wrap gap-1">
                    {lesson.grammar.map((point) => (
                      <span
                        key={point}
                        className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase">語彙カテゴリー</h4>
                  <div className="flex flex-wrap gap-1">
                    {lesson.vocabulary.map((vocab) => (
                      <span
                        key={vocab}
                        className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full"
                      >
                        {vocab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.estimatedTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1" />
                    {lesson.progress}%完了
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartLesson(lesson)}
                  className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  レッスンを始める
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLesson && (
        <LessonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          lesson={selectedLesson}
          onSelectType={handleSelectStudyType}
        />
      )}
    </div>
  );
}