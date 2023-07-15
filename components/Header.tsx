export default function Header() {
  return (
    <header>
      <nav class="min-h-full bg-gray-200 px-4 rounded-t-lg">
        <div class="flex justify-between">
          <div class="flex h-16 items-center">
            <a href="/roles" class="m-4">
            Roles
            </a>
            <a href="/contacts" class="m-4">
            Contacts
            </a>
          </div>
          <div class="flex items-center">
            <a href="/account">
            Account
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
