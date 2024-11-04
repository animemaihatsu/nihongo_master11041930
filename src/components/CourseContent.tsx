import React from 'react';
import { BookOpen, Play, FileText, ArrowRight, Star, Clock } from 'lucide-react';
import GenkiLessons from './GenkiLessons';

interface CourseContentProps {
  textbook: string | null;
  course: string | null;
}

export default function CourseContent({ textbook, course }: CourseContentProps) {
  const title = textbook ? 
    textbooks[textbook as keyof typeof textbooks] :
    courses[course as keyof typeof courses];

  // Show Genki lessons if Genki textbook is selected
  if (textbook === 'textbook2') {
    return <GenkiLessons />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">文法進捗</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">60%</div>
            <div className="w-full bg-white rounded-full h-2.5 mt-2">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">単語進捗</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">40%</div>
            <div className="w-full bg-white rounded-full h-2.5 mt-2">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">総合評価</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">良好</div>
            <p className="text-sm text-gray-600 mt-2">順調に進んでいます</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">このレッスンで学ぶ内容</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3">単語カテゴリー</h4>
              <div className="flex flex-wrap gap-2">
                {['挨拶', '数字', '時間', '場所'].map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3">文法ポイント</h4>
              <div className="flex flex-wrap gap-2">
                {['です・ます', '助詞「は」', '助詞「を」'].map((point) => (
                  <button
                    key={point}
                    className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50"
                  >
                    {point}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">学習リソース</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Play className="h-5 w-5 text-indigo-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">ビデオレッスン</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">練習問題</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">補足資料</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const textbooks = {
  textbook1: 'みんなの日本語',
  textbook2: 'げんき',
  textbook3: 'まるごと',
};

const courses = {
  travel: '旅行コース',
  beginner: '初心者コース',
};