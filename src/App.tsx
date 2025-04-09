
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import DataDiscovery from "./pages/DataDiscovery";
import CorrelatedIntelligence from "./pages/CorrelatedIntelligence";
import IntelligenceReporting from "./pages/IntelligenceReporting";
import IntelligentMapping from "./pages/IntelligentMapping";
import ExtractedData, { ExtractedDataProps } from "./pages/ExtractedData"; // Import both the component and its props

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Import mock data from Index.tsx
import { mockData } from "./pages/Index";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index data={mockData} />} />
          <Route path="/data-discovery" element={<DataDiscovery data={mockData} />} />
          <Route path="/correlated-intelligence" element={<CorrelatedIntelligence data={mockData} />} />
          <Route path="/intelligence-reporting" element={<IntelligenceReporting data={mockData} />} />
          <Route path="/intelligent-mapping" element={<IntelligentMapping data={mockData} />} />
          <Route path="/extracted-data" element={<ExtractedData data={mockData} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
