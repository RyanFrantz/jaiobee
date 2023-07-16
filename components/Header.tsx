export default function Header() {
  // Adapted from https://tailwindui.com/components/application-ui/application-shells/stacked
  return (
    <header>
      <nav class="min-h-full bg-gray-200 px-4 border border-solid border-gray-400  rounded-t-lg">
        <div class="flex justify-between">
          <div class="flex h-16 items-center">
            <a href="/roles" class="m-4 px-2 hover:bg-gray-300 rounded-full">
            Roles
            </a>
            <a href="/contacts" class="m-4 px-2 hover:bg-gray-300 rounded-full">
            Contacts
            </a>
          </div>
          <div class="flex items-center">
            <a href="/account" class="px-2 hover:bg-gray-300 rounded-full">
            Account
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
