import React from 'react';
import { Book, GraduationCap, BarChart3, ChevronDown } from 'lucide-react';

const textbooks = [
  { id: 'textbook1', title: 'みんなの日本語' },
  { id: 'textbook2', title: 'げんき' },
  { id: 'textbook3', title: 'まるごと' },
];

const courses = [
  { id: 'travel', title: '旅行コース' },
  { id: 'beginner', title: '初心者コース' },
];

interface SidebarProps {
  selectedTextbook: string | null;
  selectedCourse: string | null;
  setSelectedTextbook: (id: string | null) => void;
  setSelectedCourse: (id: string | null) => void;
  setShowDashboard: (show: boolean) => void;
}

export default function Sidebar({
  selectedTextbook,
  selectedCourse,
  setSelectedTextbook,
  setSelectedCourse,
  setShowDashboard,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center text-sm font-semibold text-gray-600 mb-4">
            <Book className="h-4 w-4 mr-2" />
            教科書を選択
          </h2>
          <div className="space-y-2">
            {textbooks.map((book) => (
              <button
                key={book.id}
                onClick={() => {
                  setSelectedTextbook(book.id);
                  setShowDashboard(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                  selectedTextbook === book.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {book.title}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center text-sm font-semibold text-gray-600 mb-4">
            <GraduationCap className="h-4 w-4 mr-2" />
            日本語コースを選択
          </h2>
          <div className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course.id);
                  setShowDashboard(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                  selectedCourse === course.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {course.title}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center text-sm font-semibold text-gray-600 mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            進捗確認
          </h2>
          <button
            onClick={() => setShowDashboard(true)}
            className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            ダッシュボード
          </button>
        </div>
      </div>
    </aside>
  );
}