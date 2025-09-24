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


import { Route, Router as WouterRouter } from "wouter";
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
    <>
      <Route path="/">{() => <Home />}</Route>
      <Route path="/apply">{() => <LoanForm />}</Route>
      <Route path="/about">{() => <About />}</Route>
      <Route path="/contact">{() => <Contact />}</Route>
      <Route path="/admin">{() => <AdminLogin />}</Route>
      <Route path="/admin/dashboard">{() => <AdminDashboard />}</Route>
      <Route>{() => <NotFound />}</Route>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          {/* Use Vite's BASE_URL in production, but force '/' during local development so routes match localhost. */}
          {/** import.meta.env.DEV is true when running vite in dev mode */}
          {/*
            Wouter's `base` should not end with a trailing slash (except for root '/').
            Vite sets import.meta.env.BASE_URL to '/LoanVeda/' for GH Pages, which can
            make route matching fail and cause the NotFound page to render. Normalize
            the base so '/LoanVeda/' becomes '/LoanVeda'.
          */}
          {(() => {
            const rawBase = import.meta.env.DEV ? "/" : import.meta.env.BASE_URL || "/";
            const normalized = rawBase === "/" ? "/" : rawBase.replace(/\/$/, "");
            return (
              <WouterRouter base={normalized}>
                <Router />
              </WouterRouter>
            );
          })()}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
