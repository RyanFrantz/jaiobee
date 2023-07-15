export default function Roles({roles}) {
  return (
    <div class="border border-solid border-gray-400 rounded-b-lg px-2">
    <ul role="list" class="divide-y divide-gray-100">
      {roles.map((role) => (
        <li class="flex justify-between gap-x-6 py-5" id={role.id}>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{role.company}</p>
            <a href="#">
              <p class="mt-1 truncate text-xs leading-5 text-gray-500 hover:underline">{role.title}</p>
            </a>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">Last Active</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">{role.lastActive}</p>
          </div>
        </li>
      ))} 
    </ul>
    </div>
  );
}
