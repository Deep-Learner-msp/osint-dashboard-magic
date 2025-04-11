
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-600 mr-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Button>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Search className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Search</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex w-full max-w-lg items-center space-x-2 mb-6">
          <Input 
            type="text" 
            placeholder="Enter domain, IP, email, or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-500 text-sm">Search functionality is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
