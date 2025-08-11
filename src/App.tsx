import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";   // <-- changed from "@/..."
import { TooltipProvider } from "./components/ui/tooltip";     // <-- changed from "@/..."
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
       <Router>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</Router>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
