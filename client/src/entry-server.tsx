/**
 * Server-side render of the public site.
 *
 * The client is a single-page app, so without this the HTML a crawler receives
 * has an empty <div id="root">. Search engines render JavaScript late, and AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot) do not render it at all. The
 * server calls render() and places the result inside #root, so every public
 * page ships its headings and text in the initial HTML. The browser then mounts
 * the normal client app over it.
 *
 * Built with: vite build --ssr src/entry-server.tsx --outDir dist-ssr
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "./PublicApp";

export function render(url: string, initialData: Record<string, unknown> = {}): string {
  // Queries never run during a server render; data the page needs is passed in
  // through initialData. The no-op queryFn only silences the missing-queryFn warning.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity, queryFn: () => Promise.resolve(null) },
    },
  });
  for (const [key, data] of Object.entries(initialData)) {
    queryClient.setQueryData([key], data);
  }

  return renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router ssrPath={url}>
          <PublicLayout />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
