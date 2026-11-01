import { Switch, Route, Redirect } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Tutorials from "@/pages/tutorials";
import Contact from "@/pages/contact";
import Games from "@/pages/games";
import Offerings from "@/pages/offerings";
import Model from "@/pages/model";
import Privacy from "@/pages/privacy";
import Investor from "@/pages/investor";
import DataRoom from "@/pages/dataroom";
import Partners from "@/pages/partners";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import ContentDetail from "@/pages/content-detail";
import Thanks from "@/pages/thanks";
import ChangeReadinessQuizPage from "@/pages/change-readiness-quiz";

/**
 * The public site: header, routes and footer. Kept separate from the admin
 * routes so the server can render it to HTML for crawlers (entry-server.tsx)
 * without pulling in the admin editor and upload code.
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug">{() => <ContentDetail contentType="blog" />}</Route>
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/tutorials/:slug">{() => <ContentDetail contentType="tutorial" />}</Route>
          <Route path="/contact" component={Contact} />
          <Route path="/games" component={Games} />
          <Route path="/change-readiness-quiz" component={ChangeReadinessQuizPage} />
          <Route path="/method" component={Model} />
          <Route path="/model">
            <Redirect to="/method" />
          </Route>
          <Route path="/offerings" component={Offerings} />
          <Route path="/partners" component={Partners} />
          <Route path="/pricing">
            <Redirect to="/offerings" />
          </Route>
          <Route path="/privacy" component={Privacy} />
          <Route path="/thanks" component={Thanks} />
          <Route path="/terms" component={Terms} />
          <Route path="/investor" component={Investor} />
          <Route path="/dataroom" component={DataRoom} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
