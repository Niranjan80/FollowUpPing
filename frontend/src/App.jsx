import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import AddFollowUpPage from './pages/AddFollowUpPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/new" element={<AddFollowUpPage />} />
      </Routes>
    </Router>
  )
}

export default App
