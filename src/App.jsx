import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Dashboard from './pages/auth/dashboard'
import Profile from './pages/auth/profile'
import AdminDashboard from './pages/auth/admindashboard'
import EditSurvey from './pages/survey/editsurvey'
import ListSurvey from './pages/survey/listsurvey'
import CreateSurvey from './pages/survey/createsurvey'
import SurveyStats from './pages/stats/surveystats'
import UserStats from './pages/stats/userstats'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/surveys" element={<ListSurvey />} />
        <Route path="/surveys/create" element={<CreateSurvey />} />
        <Route path="/surveys/edit/:id" element={<EditSurvey />} />
        <Route path="/stats/survey/:id" element={<SurveyStats />} />
        <Route path="/stats/users/:id" element={<UserStats />} />
      </Routes>
    </BrowserRouter>
  )
}
