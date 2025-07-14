// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "@/components/theme-provider";
// import NotFound from "@/pages/not-found";
// import Home from "@/pages/home";
// import LoanForm from "@/pages/loan-form";
// import About from "@/pages/about";
// import Contact from "@/pages/contact";
// import AdminLogin from "@/pages/admin-login";
// import AdminDashboard from "@/pages/admin-dashboard";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />
//       <Route path="/apply" component={LoanForm} />
//       <Route path="/about" component={About} />
//       <Route path="/contact" component={Contact} />
//       <Route path="/admin" component={AdminLogin} />
//       <Route path="/admin/dashboard" component={AdminDashboard} />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Router />
//         </TooltipProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;


import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import LoanForm from "@/pages/loan-form";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={LoanForm} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          {/* 👇 Add Wouter's base path wrapper */}
          <WouterRouter base="/LoanVeda">
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
