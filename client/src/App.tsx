import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import Blog from "@/pages/blog";
import Tutorials from "@/pages/tutorials";
import Contact from "@/pages/contact";
import Games from "@/pages/games";
import Offerings from "@/pages/offerings";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminContentEditor from "@/pages/admin-content-editor";
import ContentDetail from "@/pages/content-detail";

function Router() {
  return (
    <Switch>
      {/* Admin routes (no header/footer) */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/content/:id" component={AdminContentEditor} />
      
      {/* Public routes (with header/footer) */}
      <Route path="*">
        {() => (
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:slug">
                  {() => <ContentDetail contentType="blog" />}
                </Route>
                <Route path="/tutorials" component={Tutorials} />
                <Route path="/tutorials/:slug">
                  {() => <ContentDetail contentType="tutorial" />}
                </Route>
                <Route path="/contact" component={Contact} />
                <Route path="/games" component={Games} />
                <Route path="/offerings" component={Offerings} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/terms" component={Terms} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        )}
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleAnalytics />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
