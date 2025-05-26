import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { LoanQuery } from "@shared/schema";
import {
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Download,
  LogOut,
  Eye,
  Trash2,
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [loanTypeFilter, setLoanTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check admin authentication
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      setLocation("/admin");
    }
  }, [setLocation]);

  // Fetch loan queries
  const { data: queries = [], isLoading } = useQuery<LoanQuery[]>({
    queryKey: ["/api/queries"],
  });

  // Update query status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PUT", `/api/query/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Query status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/queries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update query status.",
        variant: "destructive",
      });
    },
  });

  // Delete query mutation
  const deleteQueryMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/query/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Query Deleted",
        description: "Query has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/queries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete query.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setLocation("/admin");
  };

  const handleMarkResponded = (id: number) => {
    updateStatusMutation.mutate({ id, status: "responded" });
  };

  const handleDeleteQuery = (id: number) => {
    if (confirm("Are you sure you want to delete this query?")) {
      deleteQueryMutation.mutate(id);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      "Name,Email,Mobile,Loan Type,Amount,City,Status,Date",
      ...filteredQueries.map(q => 
        `"${q.name}","${q.email}","${q.mobile}","${q.loanType}","${q.amount}","${q.city}","${q.status}","${q.createdAt.toLocaleDateString()}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loan-queries.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded.",
    });
  };

  // Filter queries based on search and filters
  const filteredQueries = queries.filter(query => {
    const matchesSearch = 
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.mobile.includes(searchTerm);
    
    const matchesLoanType = !loanTypeFilter || query.loanType === loanTypeFilter;
    const matchesStatus = !statusFilter || query.status === statusFilter;

    return matchesSearch && matchesLoanType && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === "pending").length,
    responded: queries.filter(q => q.status === "responded").length,
    today: queries.filter(q => 
      new Date(q.createdAt).toDateString() === new Date().toDateString()
    ).length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  const getLoanTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      personal: "Personal Loan",
      business: "Business Loan",
      home: "Home Loan",
      car: "Car Loan",
      education: "Education Loan",
      gold: "Gold Loan",
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="sm" />
              <h1 className="text-xl font-poppins font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={exportToCSV}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FileText className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stats.total}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Queries
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Clock className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stats.pending}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Pending
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stats.responded}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Responded
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Calendar className="text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stats.today}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Today
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <Input
                  placeholder="Search by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Type
                </label>
                <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="education">Education Loan</SelectItem>
                    <SelectItem value="gold">Gold Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setLoanTypeFilter("");
                    setStatusFilter("");
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Queries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Loan Queries ({filteredQueries.length})
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Loan Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQueries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-gray-500 dark:text-gray-400">
                          No queries found matching your criteria.
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredQueries.map((query) => (
                      <TableRow key={query.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">
                              {query.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {query.email}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {query.mobile}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">
                              {getLoanTypeLabel(query.loanType)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {query.city}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="font-medium">
                          {formatCurrency(query.amount)}
                        </TableCell>
                        
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(query.createdAt)}
                        </TableCell>
                        
                        <TableCell>
                          <Badge
                            variant={query.status === "pending" ? "secondary" : "default"}
                            className={
                              query.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }
                          >
                            {query.status}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex space-x-2">
                            {query.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkResponded(query.id)}
                                disabled={updateStatusMutation.isPending}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteQuery(query.id)}
                              disabled={deleteQueryMutation.isPending}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
