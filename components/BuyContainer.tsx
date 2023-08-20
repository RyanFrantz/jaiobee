// Lifted from https://tailwindui.com/components/marketing/sections/pricing
export default function BuyContainer() {
  return (
    <div id="buy-container">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div class="p-8 sm:p-10 lg:flex-auto">
            <h3 class="text-2xl font-bold tracking-tight text-gray-900">
            jaiobee: Find your next role!
            </h3>
            <p class="mt-6 text-base leading-7 text-gray-600">
            You're on the hunt for your next job and you could use help keeping things straight. Buy jaiobee once, use it forever.
            </p>
            <div class="mt-10 flex items-center gap-x-4">
              <h4 class="flex-none text-sm font-semibold leading-6 text-sky-600">What’s included</h4>
              <div class="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              <li class="flex gap-x-3">
                <svg class="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Unlimited roles
              </li>
              <li class="flex gap-x-3">
                <svg class="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Unlimited notes
              </li>
              <li class="flex gap-x-3">
                <svg class="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
              Future updates, free!
              </li>
              <li class="flex gap-x-3">
                <svg class="h-6 w-5 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Better than a spreadsheet!
              </li>
            </ul>
          </div>
          <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div class="mx-auto max-w-xs px-8">
                <p class="text-base font-semibold text-gray-600">It's all yours, forever.</p>
                <p class="mt-6 flex items-baseline justify-center gap-x-2">
                  <span class="text-5xl font-bold tracking-tight text-gray-900">$10</span>
                  <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a href="#" class="mt-10 block w-full rounded-md bg-sky-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
