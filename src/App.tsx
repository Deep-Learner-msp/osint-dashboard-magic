
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import ExtractedData from "./pages/ExtractedData";
import IntelligentMapping from "./pages/IntelligentMapping";
import ExecutiveView from "./pages/ExecutiveView";

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

// Add sample news data to mockData
mockData.recentNews = [
  {
    title: "TradeFi Global Expands Cryptocurrency Trading Services",
    date: "2023-12-10",
    source: "Financial Times",
    url: "#",
    summary: "TradeFi Global announced plans to expand its cryptocurrency trading services, adding support for NFTs and DeFi protocols starting Q1 2024.",
    sentiment: "positive",
    relevance: 0.95,
    tags: ["cryptocurrency", "expansion", "strategic", "trading"]
  },
  {
    title: "Regulatory Inquiry into TradeFi's Singapore Operations",
    date: "2023-11-28",
    source: "Bloomberg",
    url: "#",
    summary: "The Monetary Authority of Singapore (MAS) has opened an inquiry into TradeFi Global's compliance procedures following a series of high-volume transactions.",
    sentiment: "negative",
    relevance: 0.89,
    tags: ["regulatory", "compliance", "risk", "singapore"]
  },
  {
    title: "TradeFi in Advanced Talks to Acquire Asian Fintech Startup",
    date: "2023-12-05",
    source: "Reuters",
    url: "#",
    summary: "Sources close to the matter reveal TradeFi is in advanced negotiations to acquire a Singapore-based fintech startup specializing in AI-driven trading algorithms.",
    sentiment: "positive",
    relevance: 0.92,
    tags: ["acquisition", "M&A", "fintech", "AI"]
  },
  {
    title: "Executive Shuffle: TradeFi Appoints New CTO from Google",
    date: "2023-11-15",
    source: "Wall Street Journal",
    url: "#",
    summary: "TradeFi Global has appointed Dr. Lisa Xu, former Google Cloud engineering director, as its new Chief Technology Officer to lead its digital transformation efforts.",
    sentiment: "positive",
    relevance: 0.88,
    tags: ["executive", "leadership", "technology", "digital transformation"]
  },
  {
    title: "Data Breach Investigation at TradeFi Subsidiary",
    date: "2023-12-02",
    source: "CyberSecurity Today",
    url: "#",
    summary: "A TradeFi subsidiary is investigating a potential data breach after unusual activity was detected in their client portal system. No confirmation of compromised data yet.",
    sentiment: "negative",
    relevance: 0.97,
    tags: ["security", "breach", "risk", "data protection"]
  }
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/extracted-data" element={<ExtractedData data={mockData} />} />
          <Route path="/intelligent-mapping" element={<IntelligentMapping data={mockData} />} />
          <Route path="/executive-view" element={<ExecutiveView data={mockData} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
