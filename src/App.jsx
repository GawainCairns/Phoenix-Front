import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Importing pages
// Auth Pages
import Landing from './pages/landing'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Dashboard from './pages/auth/dashboard'
import Profile from './pages/auth/profile'
import AdminDashboard from './pages/auth/admindashboard'
// Survey Pages
import EditSurvey from './pages/survey/editsurvey'
import ListSurvey from './pages/survey/listsurvey'
import CreateSurvey from './pages/survey/createsurvey'
import PublicSurveys from './pages/survey/publicsurveys'
import Response from './pages/survey/response'
import SurveyResults from './pages/survey/surveyresults'
import ViewSurvey from './pages/survey/viewsurvey'
// Stats Pages
import SurveyStats from './pages/stats/surveystats'
import UserStats from './pages/stats/userstats'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Page Route */}

        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Landing />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/services" element={<Landing />} />

        {/* Auth Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Survey Routes */}

        <Route path="/surveys" element={<ListSurvey />} />
        <Route path="/surveys/create" element={<CreateSurvey />} />
        <Route path="/surveys/edit/:id" element={<EditSurvey />} />
        <Route path="/surveys/public" element={<PublicSurveys />} />
        <Route path="/surveys/response/:id" element={<Response />} />
        <Route path="/surveys/results/:id" element={<SurveyResults />} />
        <Route path="/surveys/view/:id" element={<ViewSurvey />} />
        <Route path="/surveys/responselist/:id" element={<Response />} />

        {/* Stats Routes */}

        <Route path="/stats/survey/:id" element={<SurveyStats />} />
        <Route path="/stats/users/:id" element={<UserStats />} />
      </Routes>
    </BrowserRouter>
  )
}
