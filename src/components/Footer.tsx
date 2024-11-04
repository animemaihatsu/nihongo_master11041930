import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900">利用規約</a>
          <span className="border-l border-gray-300"></span>
          <a href="#" className="hover:text-gray-900">プライバシーポリシー</a>
          <span className="border-l border-gray-300"></span>
          <a href="#" className="hover:text-gray-900">お問い合わせ</a>
        </div>
        <div className="mt-2 text-center text-sm text-gray-400">
          © 2024 日本語マスター. All rights reserved.
        </div>
      </div>
    </footer>
  );
}