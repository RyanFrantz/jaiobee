export default function RoleList({roles}) {
  // Adapted from https://tailwindui.com/components/application-ui/lists/stacked-lists
  return (
    <>
    <div class="flex justify-end m-2">
      <button class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">
      Add Role
      </button>
    </div>
    <div class="border border-solid border-gray-400 rounded-b-lg px-4">
    <ul role="list" class="divide-y divide-gray-100">
      {roles.map((role) => (
        <li class="flex justify-between gap-x-6 py-5" id={role.id}>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{role.company}</p>
            <a href="#">
              <p class="mt-1 truncate text-xs leading-5 text-gray-500 hover:underline">{role.title}</p>
            </a>
          </div>
            <p class="text-sm leading-6 text-gray-900">Last Active</p>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="mt-1 text-xs leading-5 text-gray-500">{role.lastActive}</p>
          </div>
        </li>
      ))} 
    </ul>
    </div>
    </>
  );
}
