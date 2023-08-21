export default function Header({ isAuthenticated }) {
  // Adapted from https://tailwindui.com/components/application-ui/application-shells/stacked
  // Also lifted some navbar functionality from
  // https://tailwindui.com/components/application-ui/navigation/navbars
  //
  // If we're on an authentication-related route, make most of the navigation
  // invisible/inaccessible.
  return (
    <header>
      <div class="flex justify-center">
        <a
          href="/"
          class="block p-2 text-2xl hover:underline">
        jaiobee
        </a>
      </div>
      <nav class="min-h-full bg-gray-200 px-4 border border-solid border-gray-400  rounded-t-lg">
        <div class="flex justify-between">
          <div class="flex h-16 items-center">
            <a
              href={isAuthenticated ? "/roles" : "/"}
              class="m-4 px-2 hover:bg-gray-300 rounded-full"
            >
              {isAuthenticated ? "Roles" : "Home"}
            </a>
            <a
              href="/contacts"
              class={"m-4 px-2 hover:bg-gray-300 rounded-full" +
                (isAuthenticated ? "" : " invisible")}
            >
              Contacts
            </a>
          </div>
          <div class="relative ml-3 flex items-center">
            { isAuthenticated ? (
            <>
            <button
              _="on click toggle .hidden on #account-menu"
              class={"px-2 hover:bg-gray-300 rounded-full" +
                (isAuthenticated ? "" : " invisible")}
            >
              Account
            </button>
            <div
              class="hidden absolute top-10 right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg"
              role="menu"
              id="account-menu"
              aria-orientation="vertical"
              tabindex="-1"
            >
              <a
                href="/profile"
                class="block px-4 py-2 text-sm hover:underline"
                role="menuitem"
                tabindex="-1"
                id="account-profile"
              >
                Profile
              </a>
              <a
                href="/signout"
                class="block px-4 py-2 text-sm hover:underline"
                role="menuitem"
                tabindex="-1"
                id="account-signout"
              >
                Sign out
              </a>
            </div>
            </>
            ) : (
            <a
              href="/login"
              class="m-4 px-2 hover:bg-gray-300 rounded-full"
            >
              Login
            </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
