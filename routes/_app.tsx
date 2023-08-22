// asset() will automate adding cache headers to static assets.
import { asset, Head } from "$fresh/runtime.ts";
import { AppContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import { isAuthenticated } from "../lib/utils.ts";
import GoogleAnalytics from "../components/GoogleAnalytics.tsx";

export default async function App(_req: Request, ctx: AppContext) {
  const isAuthned = isAuthenticated(ctx);
  return (
    <>
      <Head>
        <meta name="author" content="frantz" />
        <script src={asset("/js/htmx@1.9.3.min.js")}></script>
        <script src={asset("/js/hyperscript.org@0.9.9.js")}></script>
        <link rel="stylesheet" href={asset("/css/tailwind.css")} />
      </Head>
      <GoogleAnalytics />
      <main class="font-mono">
        <div class="px-6 py-12">
          <div class="text-lg">
            <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full">
              <Header isAuthenticated={isAuthned} />
              <ctx.Component />
              {/* Future footer */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
