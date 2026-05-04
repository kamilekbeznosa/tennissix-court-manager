import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Reservations from "./pages/Reservations.tsx";
import Tournaments from "./pages/Tournaments.tsx";
import Service from "./pages/Service.tsx";
import Pricing from "./pages/Pricing.tsx";
import Profile from "./pages/Profile.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { RoleProvider } from "./contexts/RoleContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SettingsProvider>
        <NotificationsProvider>
          <RoleProvider>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/rejestracja" element={<Register />} />
                  <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/rezerwacje" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
                  <Route path="/turnieje" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
                  <Route path="/serwis" element={<ProtectedRoute><Service /></ProtectedRoute>} />
                  <Route path="/cennik" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                  <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </RoleProvider>
        </NotificationsProvider>
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
