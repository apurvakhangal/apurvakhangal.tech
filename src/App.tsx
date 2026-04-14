import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader } from "@/components/Loader";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const getHasVisited = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("hasVisited") === "true";
};

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    if (location.pathname !== "/") return false;
    return !getHasVisited();
  });

  useEffect(() => {
    if (location.pathname !== "/") {
      setLoading(false);
      return;
    }

    if (getHasVisited()) {
      setLoading(false);
    }
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasVisited", "true");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {loading && location.pathname === "/" ? (
        <Loader key="loader" onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#111625]">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter key="main-app">
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
