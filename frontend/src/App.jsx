import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/navbar';
import Home_bg from './components/Home_bg';
import Features from './components/Features';
import About from './components/About';
import Academic_guide from './components/academic_guide';
import Campus from './components/campus';
import EventsFests from './components/events-fests';

// Simple Layout component with Navbar
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App component
function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* Home Route */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Navbar />
              <Home_bg />
              <Features />
              <About />
              <Academic_guide />
              <Campus />
            </Layout>
          } 
        />
        
        {/* Events & Fests Route */}
        <Route 
          path="/events-fests" 
          element={
            <Layout>
              <EventsFests />
            </Layout>
          } 
        />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="min-h-[80vh] flex items-center justify-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
