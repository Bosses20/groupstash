import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Index from "@/pages/Index";
import GetStarted from "@/pages/GetStarted";
import OnboardingFlow from "@/pages/onboarding/OnboardingFlow";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import MemberDashboard from "@/pages/dashboard/MemberDashboard";
import Circles from "@/pages/dashboard/Circles";
import CircleDetails from "@/pages/dashboard/CircleDetails";
import Transactions from "@/pages/dashboard/Transactions";
import Contribute from "@/pages/dashboard/Contribute";
import Withdraw from "@/pages/dashboard/Withdraw";
import CreateCircle from "@/pages/dashboard/CreateCircle";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Role-based route wrapper
function RoleRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useUser();

  if (!user) {
    return null;
  }

  return isAdmin ? <AdminDashboard /> : <MemberDashboard />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/circles"
              element={
                <ProtectedRoute>
                  <Circles />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/circles/create"
              element={
                <ProtectedRoute>
                  <CreateCircle />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/circles/:id"
              element={
                <ProtectedRoute>
                  <CircleDetails />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/contribute"
              element={
                <ProtectedRoute>
                  <Contribute />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/withdraw"
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TooltipProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
