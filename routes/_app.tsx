// asset() will automate adding cache headers to static assets.
import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import Header from "../components/Header.tsx";
import { isAuthenticating } from "../lib/utils.ts";

export default function App({ Component, route }: AppProps) {
  const isAuthnPath = isAuthenticating(route);
  return (
    <>
      <Head>
        <meta name="author" content="frantz" />
        <script src={asset("/js/htmx@1.9.3.min.js")}></script>
      </Head>
      <main class="font-mono">
        <div class="px-6 py-12">
          <div class="text-lg">
            <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full">
              <Header isAuthenticating={isAuthnPath} />
              <Component />
              {/* Future footer */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
