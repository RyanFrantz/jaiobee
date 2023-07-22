import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";

// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
  async GET() {
    const body = render(
      <div
        class="w-full px-2 py-1 border border-solid rounded-lg text-sm border-gray-400 flex justify-between">
      <textarea
        rows="1"
        class="w-5/6 border border-solid border-gray-400 rounded-lg"
        name="new-note"
      ></textarea>
      <button
        class="border border-solid rounded bg-sky-500 hover:bg-sky-600 text-white px-1"
      >
      Save Note
      </button>
      </div>
    );
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(
      body,
      {
        headers: headers
      }
    );
    
  },
};
