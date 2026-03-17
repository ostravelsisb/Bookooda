import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Support from './Pages/Support'
import Search from './Pages/Search'
import AuthPage from './Auth/AuthPage'
import ScrollToTop from './Components/ScrollToTop'

// Dashboard imports
import { AuthProvider } from './context/AuthContext'
import DashboardLayout from './Components/layout/DashboardLayout'
import ProtectedRoute from './Components/layout/ProtectedRoute'

// Auth / Verification
import VerificationPage from './Pages/auth/VerificationPage'
import HotelOnboardingPage from './Auth/forms/hotel/HotelOnboardingPage'
import TravelOnboardingPage from './Auth/forms/travel/TravelOnboardingPage'

// User pages
import UserDashboard from './Pages/user/UserDashboard'
import MyBookings from './Pages/user/MyBookings'
import VisaApplications from './Pages/user/VisaApplications'
import SavedAgents from './Pages/user/SavedAgents'
import PaymentHistory from './Pages/user/PaymentHistory'
import Notifications from './Pages/user/Notifications'
import ProfileSettings from './Pages/user/ProfileSettings'

// Agent / Provider pages
import AgentDashboard from './Pages/agent/AgentDashboard'
import IncomingRequests from './Pages/agent/IncomingRequests'
import ActiveClients from './Pages/agent/ActiveClients'
import CompletedCases from './Pages/agent/CompletedCases'
import Earnings from './Pages/agent/Earnings'
import ReviewsRatings from './Pages/agent/ReviewsRatings'
import AgentProfile from './Pages/agent/AgentProfile'
import AddPackagePage from './Pages/agent/AddPackagePage'

// Admin pages
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminVerificationReview from './Pages/admin/AdminVerificationReview'
import AdminVerifications from './Pages/admin/AdminVerifications'
import AdminUsers from './Pages/admin/AdminUsers'
import AdminCategoryPage from './Pages/admin/AdminCategoryPage'
import AdminSettings from './Pages/admin/AdminSettings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ── Public Routes (with Navbar/Footer) ── */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/support" element={<><Navbar /><Support /><Footer /></>} />
          <Route path="/search" element={<><Navbar /><Search /><Footer /></>} />
          <Route path="/auth" element={<><Navbar /><AuthPage /><Footer /></>} />

          {/* ── Hotel & Travel Onboarding (standalone full-page) ── */}
          <Route path="/onboarding/hotel" element={<HotelOnboardingPage />} />
          <Route path="/onboarding/travel" element={<TravelOnboardingPage />} />

          {/* ── Verification Page (standalone, no dashboard layout) ── */}
          <Route path="/verification" element={<VerificationPage />} />

          {/* ── User Dashboard (user + customer) ── */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={['user', 'customer']} requireVerification={false}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="visa" element={<VisaApplications />} />
            <Route path="agents" element={<SavedAgents />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>

          {/* ── Agent / Provider Dashboard ── */}
          <Route
            path="/dashboard/agent"
            element={
              <ProtectedRoute allowedRoles={['agent', 'travel_tours', 'car_rental', 'trip_provider', 'umrah_provider', 'hotel_provider']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AgentDashboard />} />
            <Route path="requests" element={<IncomingRequests />} />
            <Route path="clients" element={<ActiveClients />} />
            <Route path="completed" element={<CompletedCases />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="reviews" element={<ReviewsRatings />} />
            <Route path="profile" element={<AgentProfile />} />
            <Route path="add-package" element={<AddPackagePage />} />
          </Route>

          {/* ── Admin Dashboard ── */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']} requireVerification={false}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="verifications" element={<AdminVerifications />} />
            <Route path="review/:id" element={<AdminVerificationReview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="category/:category" element={<AdminCategoryPage />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
