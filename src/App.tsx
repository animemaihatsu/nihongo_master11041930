import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Book, GraduationCap, BarChart3, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CourseContent from './components/CourseContent';
import VocabularyStudy from './components/VocabularyStudy';
import GrammarStudy from './components/GrammarStudy';
import ComprehensiveStudy from './components/ComprehensiveStudy';
import Footer from './components/Footer';

export type Course = {
  id: string;
  title: string;
  type: 'textbook' | 'course';
};

function App() {
  const [selectedTextbook, setSelectedTextbook] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <div className="flex-1 flex">
          <Sidebar
            selectedTextbook={selectedTextbook}
            selectedCourse={selectedCourse}
            setSelectedTextbook={setSelectedTextbook}
            setSelectedCourse={setSelectedCourse}
            setShowDashboard={setShowDashboard}
          />
          
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={showDashboard ? <Dashboard /> : <CourseContent textbook={selectedTextbook} course={selectedCourse} />} />
              <Route path="/vocabulary-study" element={<VocabularyStudy />} />
              <Route path="/grammar-study" element={<GrammarStudy />} />
              <Route path="/comprehensive-study" element={<ComprehensiveStudy />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;