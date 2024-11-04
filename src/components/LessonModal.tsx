import React from 'react';
import { BookOpen, MessageSquare, Brain, Layout, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    title: string;
    grammar: string[];
    vocabulary: string[];
  };
  onSelectType: (type: string) => void;
}

export default function LessonModal({ isOpen, onClose, lesson, onSelectType }: LessonModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const studyTypes = [
    {
      id: 'vocabulary',
      title: '単語学習',
      description: '新しい単語とフレーズを効率的に学びましょう',
      icon: BookOpen,
      items: lesson.vocabulary,
      onClick: () => navigate('/vocabulary-study'),
    },
    {
      id: 'grammar',
      title: '文法学習',
      description: '文法のルールと使い方を理解しましょう',
      icon: MessageSquare,
      items: lesson.grammar,
      onClick: () => navigate('/grammar-study'),
    },
    {
      id: 'comprehensive',
      title: '総合学習',
      description: '単語と文法を組み合わせて総合的に学習します',
      icon: Brain,
      items: [...lesson.vocabulary, ...lesson.grammar],
      onClick: () => navigate('/comprehensive-study'),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
            <p className="text-sm text-gray-600 mt-1">学習タイプを選択してください</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {studyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                if (type.onClick) {
                  type.onClick();
                } else {
                  onSelectType(type.id);
                }
                onClose();
              }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200 group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200">
                  <type.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-medium text-gray-900">{type.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {type.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 text-xs bg-white text-gray-600 border border-gray-200 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}