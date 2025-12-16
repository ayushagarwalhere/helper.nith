import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home_bg from "./components/Home_bg";
import Features from "./components/Features.jsx";
import About from "./components/About";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Support from "./components/support";

// Features sub-components
import Academic_guide from "./components/Features/academic_guide.jsx";
import Campus from "./components/Features/campus.jsx";
import ClubsPage from "./components/Features/clubs_page.jsx";

// Academic Guide sub-pages
import AcademicCalendar from "./components/Features/academic_guide/academic_calendar.jsx";
import DepFac from "./components/Features/academic_guide/dep&fac.jsx";
import EvalGrad from "./components/Features/academic_guide/eval&grad.jsx";
import ProgramsCourses from "./components/Features/academic_guide/programs&courses.jsx";
import RulesReg from "./components/Features/academic_guide/rules&reg.jsx";

// Campus sub-pages
import EventsFests from "./components/Features/campus/events-fests.jsx";
import FoodOptions from "./components/Features/campus/food-options.jsx";
import Infrastructure from "./components/Features/campus/infrastructure.jsx";
import LifeAroundCampus from "./components/Features/campus/life-around-campus.jsx";
import SportsFitness from "./components/Features/campus/sports-fitness.jsx";

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
            </Layout>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Layout>
              <Navbar />
              <LogIn />
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout>
              <Navbar />
              <Features />
            </Layout>
          }
        />
        <Route
          path="/About"
          element={
            <Layout>
              <Navbar />
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Navbar />
              <Support />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Navbar />
              <SignUp />
            </Layout>
          }
        />

        <Route
          path="/support"
          element={
            <Layout>
              <Navbar />
              <Support />
            </Layout>
          }
        />

        {/* Features Routes */}
        <Route
          path="/academic-guide"
          element={
            <Layout>
              <Navbar />
              <Academic_guide />
            </Layout>
          }
        />

        <Route
          path="/academic-guide/calendar"
          element={
            <Layout>
              <Navbar />
              <AcademicCalendar />
            </Layout>
          }
        />

        <Route
          path="/academic-guide/departments-faculties"
          element={
            <Layout>
              <Navbar />
              <DepFac />
            </Layout>
          }
        />

        <Route
          path="/academic-guide/evaluation-graduation"
          element={
            <Layout>
              <Navbar />
              <EvalGrad />
            </Layout>
          }
        />

        <Route
          path="/academic-guide/programs-courses"
          element={
            <Layout>
              <Navbar />
              <ProgramsCourses />
            </Layout>
          }
        />

        <Route
          path="/academic-guide/rules-regulations"
          element={
            <Layout>
              <Navbar />
              <RulesReg />
            </Layout>
          }
        />

        {/* Campus Routes */}
        <Route
          path="/campus"
          element={
            <Layout>
              <Navbar />
              <Campus />
            </Layout>
          }
        />

        <Route
          path="/campus/events-festivals"
          element={
            <Layout>
              <Navbar />
              <EventsFests />
            </Layout>
          }
        />

        <Route
          path="/campus/food-options"
          element={
            <Layout>
              <Navbar />
              <FoodOptions />
            </Layout>
          }
        />

        <Route
          path="/campus/infrastructure"
          element={
            <Layout>
              <Navbar />
              <Infrastructure />
            </Layout>
          }
        />

        <Route
          path="/campus/life-around-campus"
          element={
            <Layout>
              <Navbar />
              <LifeAroundCampus />
            </Layout>
          }
        />

        <Route
          path="/campus/sports-fitness"
          element={
            <Layout>
              <Navbar />
              <SportsFitness />
            </Layout>
          }
        />

        {/* Clubs Route */}
        <Route
          path="/clubs"
          element={
            <Layout>
              <Navbar />
              <ClubsPage />
            </Layout>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <Layout>
              <Navbar />
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
