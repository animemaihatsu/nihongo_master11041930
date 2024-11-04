import React from 'react';
import { Trophy, Target, Clock, Sparkles } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">学習進捗</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">今日の目標</span>
              <Target className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">80%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">学習時間</span>
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45分</div>
            <p className="text-sm text-gray-600 mt-2">今日の学習時間</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">達成バッジ</span>
              <Trophy className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12個</div>
            <p className="text-sm text-gray-600 mt-2">獲得済みバッジ</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">最近の学習履歴</h2>
        <div className="space-y-4">
          {[
            { title: '旅行コース - レッスン3', time: '2時間前', progress: 100 },
            { title: 'みんなの日本語 - 第2課', time: '昨日', progress: 75 },
            { title: '初心者コース - 文法編', time: '2日前', progress: 60 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.time}</p>
                </div>
              </div>
              <div className="w-24">
                <div className="text-sm text-right text-gray-600 mb-1">{item.progress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}