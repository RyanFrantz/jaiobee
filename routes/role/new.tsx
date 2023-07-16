import { Handlers } from "$fresh/server.ts";

// content-type: text/html
export const handler: Handlers = {
  async GET(_req, _ctx) {

    const headers = new Headers();
    headers.set("content-type", "text/html");
    const body = `
      <li class="flex justify-between gap-x-6 py-5">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">SNAFU</p>
          <a href="#">
            <p class="mt-1 truncate text-xs leading-5 text-gray-500 hover:underline">Lead Unfucker</p>
          </a>
        </div>
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">Last Active</p>
          <p class="mt-1 text-xs leading-5 text-gray-500">7/16/2023</p>
        </div>
      </li>
      `;
    return new Response(
      body,
      {
        headers: headers
      }
    )
  },
};
