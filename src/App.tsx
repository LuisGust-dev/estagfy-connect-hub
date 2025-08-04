
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCalendar from "./pages/student/Calendar";
import StudentProfile from "./pages/student/Profile";
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyProfile from "./pages/company/Profile";
import InternshipApplicants from "./pages/company/InternshipApplicants";
import EditInternship from "./pages/company/EditInternship";
import ChatPage from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/calendar" element={<ProtectedRoute><StudentCalendar /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
          <Route path="/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/company/dashboard" element={<ProtectedRoute><CompanyDashboard /></ProtectedRoute>} />
          <Route path="/company/profile" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
          <Route path="/company/internships/:id/applicants" element={<ProtectedRoute><InternshipApplicants /></ProtectedRoute>} />
          <Route path="/company/internships/:id/edit" element={<ProtectedRoute><EditInternship /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
