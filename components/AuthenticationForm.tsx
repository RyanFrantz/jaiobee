export default function AuthenticationForm({ signup }) {
  return (
    <div class="flex flex-1 flex-col justify-center px-6 py-12">
      <div
        id={signup ? "signup-form" : "login-form"}
        class="mx-auto flex flex-1 flex-col justify-center border border-solid border-gray-400 rounded-lg p-6"
      >
        <form method="post" action={signup ? "/api/signup" : "/api/login"}>
          {signup
            ? (
              <>
                <div>
                  <label
                    for="preferredName"
                    class="mt-2"
                  >
                    Preferred Name
                  </label>
                </div>
                <div>
                  <input
                    class="w-full mt-1 border border-solid border-gray-400 rounded-lg p-2"
                    type="text"
                    name="preferredName"
                    placeholder="Jane"
                    maxlength="100"
                  />
                </div>
              </>
            )
            : <></>}
          <div>
            <label
              for="email"
              class="mt-2"
            >
              Email
            </label>
          </div>
          <div>
            <input
              class="w-full mt-1 border border-solid border-gray-400 rounded-lg p-2"
              type="email"
              name="email"
              placeholder="jane@hire.me"
              autocomplete="email"
              pattern="^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="mt-2"
            >
              Password
            </label>
          </div>
          <div>
            <input
              class="w-full mt-1 border border-solid border-gray-400 rounded-lg p-2"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              class="w-full mt-2 text-white bg-sky-500 hover:bg-sky-600 px-2 rounded flex justify-center"
            >
              {signup ? "Create Account" : "Login"}
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm">
          {signup ? "Already have an account?" : "Don't have an account?"}
          <a
            href={signup ? "/login" : "/signup"}
            class="ml-1 text-blue-600 hover:underline"
          >
            {signup ? "Login here!" : "Sign up here!"}
          </a>
        </p>
      </div>
    </div>
  );
}
