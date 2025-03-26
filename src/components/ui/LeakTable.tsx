
import { DataLeak } from "@/types/data";
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LeakTableProps {
  leaks: DataLeak[];
}

const LeakTable: React.FC<LeakTableProps> = ({ leaks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleRows, setVisibleRows] = useState(10);
  
  const filteredLeaks = leaks.filter(leak => 
    leak.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (leak.name && leak.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (leak.database_name && leak.database_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const loadMore = () => {
    setVisibleRows(prev => prev + 10);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by email, name or database..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead>Database</TableHead>
              <TableHead>Password/Hash</TableHead>
              <TableHead>Name/Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaks.slice(0, visibleRows).map((leak) => (
              <TableRow key={leak.id} className="animate-fade-in">
                <TableCell className="font-medium">{leak.email}</TableCell>
                <TableCell>{leak.database_name}</TableCell>
                <TableCell>
                  {leak.password ? (
                    <span className="text-osint-red">{leak.password}</span>
                  ) : leak.hashed_password ? (
                    <span className="text-osint-orange text-xs">{leak.hashed_password}</span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{leak.name || leak.username || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {visibleRows < filteredLeaks.length && (
        <div className="text-center">
          <button 
            onClick={loadMore}
            className="px-4 py-2 bg-osint-blue text-white rounded-md hover:bg-osint-blue/90 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground">
        Showing {Math.min(visibleRows, filteredLeaks.length)} of {filteredLeaks.length} results
      </div>
    </div>
  );
};

export default LeakTable;
