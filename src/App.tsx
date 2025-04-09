
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExtractedData from "./pages/ExtractedData";
import IntelligentMapping from "./pages/IntelligentMapping";
import ExecutiveView from "./pages/ExecutiveView";
import Settings from "./pages/Settings";
import OsintReportPage from "./pages/OsintReportPage";
import SearchPage from "./pages/SearchPage";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

// Import mockData from the dedicated file
import { mockData } from "./data/mockData";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/data" element={<ExtractedData data={mockData} />} />
          <Route
            path="/intelligent-mapping"
            element={<IntelligentMapping data={mockData} />}
          />
          <Route path="/executive-view" element={<ExecutiveView data={mockData} />} />
          <Route path="/report" element={<OsintReportPage data={mockData} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
