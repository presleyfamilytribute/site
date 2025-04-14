
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/auth/AuthPage";
import AuthCallback from "./components/auth/AuthCallback";
import { AuthProvider } from "./hooks/useAuth";
import AdminPanel from "./pages/AdminPanel";
import { useEffect } from "react";
import { 
  setupCSPReporting,
  setupCSRFProtection,
  setupSecurityHeaders,
  protectAgainstXSS
} from "./utils/security";

const queryClient = new QueryClient();

const App = () => {
  // Set up enhanced security measures
  useEffect(() => {
    // Setup CSP violation reporting
    setupCSPReporting();
    
    // Setup CSRF protection
    setupCSRFProtection();
    
    // Setup additional security headers
    setupSecurityHeaders();
    
    // Protect against XSS attacks
    protectAgainstXSS();
    
    // In development mode, scan for XSS vulnerabilities
    if (process.env.NODE_ENV === 'development') {
      import('./utils/security').then(({ scanForXSSVulnerabilities }) => {
        scanForXSSVulnerabilities();
      });
    }
    
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
