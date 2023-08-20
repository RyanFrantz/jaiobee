// Lifted from https://tailwindui.com/components/marketing/sections/feature-sections
export default function FeatureAllRoles() {
  return (
    <div class="overflow-hidden py-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-sky-600">
                All your job opportunities in one place
              </h2>
              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900">
                    <svg
                      class="absolute left-1 top-1 h-7 w-7 fill-current stroke-1 stroke-sky-600"
                      viewBox="0 0 64 64"
                      transform="rotate(270)"
                    >
                        <path d="M31.714 11.864l-11.505-11.563c-0.248-0.249-0.605-0.35-0.948-0.266-0.341 0.083-0.613 0.339-0.717 0.674-0.692 2.228-0.773 4.245-0.244 6.084-0.049 0.034-0.095 0.070-0.138 0.113l-5.347 5.346c-1.725-0.8-3.579-1.233-5.428-1.233-1.175 0-2.327 0.174-3.424 0.515-0.334 0.104-0.59 0.375-0.674 0.714s0.014 0.698 0.261 0.947l6.843 6.887-9.568 9.72-0.832 2.192 2.011-0.777 9.793-9.72 6.932 6.977c0.189 0.192 0.447 0.295 0.709 0.295 0.079 0 0.159-0.010 0.238-0.029 0.341-0.084 0.613-0.34 0.717-0.675 0.905-2.913 0.64-6.042-0.636-8.848l5.459-5.46c0.020-0.020 0.033-0.041 0.051-0.063 0.824 0.236 1.678 0.361 2.564 0.361 1.101 0 2.268-0.158 3.468-0.531 0.334-0.104 0.59-0.375 0.674-0.714s-0.015-0.697-0.262-0.945zM18.849 25.755l-12.587-12.669c3.23-0.377 6.714 0.925 9.236 3.447 2.51 2.509 3.735 5.978 3.351 9.221zM18.757 17.392c-0.526-0.804-1.14-1.568-1.845-2.274-0.702-0.702-1.469-1.321-2.28-1.854l4.504-4.503c0.459 0.799 1.052 1.563 1.782 2.291 0.745 0.745 1.534 1.348 2.363 1.814zM22.332 9.639c-1.923-1.923-2.664-4.067-2.271-6.653l8.966 9.012c-2.583 0.37-4.738-0.403-6.695-2.36z">
                        </path>
                    </svg>
                    Track all your job prospects.
                  </dt>
                  <dd class="inline">
                    <span class="pl-1 text-sky-600">jaiboee</span>{" "}
                    is clean and simple, making it easy to track and update all
                    of your opportunities.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <img
            src="/img/roles-all.png"
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
