// Lifted from https://tailwindui.com/components/marketing/sections/feature-sections
export default function FeatureRoleDetails() {
  return (
    <div class="overflow-hidden py-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-sky-600">
                Every note and status update captured
              </h2>
              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900">
                    <svg
                      class="absolute left-1 top-1 h-7 w-7 fill-transparent stroke-2 stroke-sky-600"
                      viewBox="-6.4 -6.4 76.80 76.80"
                      transform="rotate(270)"
                    >
                        <path d="M55.5,23.9V53.5a2,2,0,0,1-2,2h-43a2,2,0,0,1-2-2v-43a2,2,0,0,1,2-2H41.64">
                        </path>
                        <path d="M19.48,38.77l-.64,5.59a.84.84,0,0,0,.92.93l5.56-.64a.87.87,0,0,0,.5-.24L54.9,15.22a1.66,1.66,0,0,0,0-2.35L51.15,9.1a1.67,1.67,0,0,0-2.36,0L19.71,38.28A.83.83,0,0,0,19.48,38.77Z">
                        </path>
                        <line x1="44.87" y1="13.04" x2="50.9" y2="19.24"></line>
                    </svg>
                    Track everything.
                  </dt>
                  <dd class="inline">
                    <span class="pl-1">Take</span> all the notes you need and see them in reverse chronological
                    order.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <img
            src="/img/role-details.png"
            alt="Product screenshot"
            class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width="2432"
            height="1442"
          />
        </div>
      </div>
    </div>
  );
}
