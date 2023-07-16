// asset() will automate adding cache headers to statiic assets.
import { Head, asset } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import Header from "../components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta name="author" content="frantz" />
        <script src={asset("/js/htmx@1.9.3.min.js")}></script>
      </Head>
      {/*
      <div class="dark:bg-gray-900 text-lg">
        <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full dark:text-white">
      */}
      <main class="font-mono">
      <div class="px-6 py-12">
      <div class="text-lg">
        <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full">
          <Header />
          <Component />
          {/* Future footer */}
        </div>
      </div>
      </div>
      </main>
    </>
  );
}
