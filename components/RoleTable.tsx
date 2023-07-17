import SortArrow from "./SortArrow.tsx";

// NOTE: Tailwind offers table layout support via the `table` class like so:
// https://tailwindcss.com/docs/display#table

// TODO: Don't show sort arrow if that column is the one that we're sorting on.
export default function RoleTable({roles}) {
  return (
    <>
    <div class="flex justify-end m-2">
      <a href="/role/new">
        <button class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">
        Add Role
        </button>
      </a>
    </div>
    <div class="border border-solid border-gray-400 rounded-b-lg px-4">
      <table class="table-auto text-sm">
        <thead>
          <tr>
            <th class="p-4">
              <div class="flex justify-center">
              Role
              <SortArrow/>
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
              Company
              <SortArrow/>
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
              Last Active
              <SortArrow/>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
          <tr>
            <td class="p-4">
              <a href="#" class="hover:underline">
              {role.title}
              </a>
            </td>
            <td class="p-4">{role.company}</td>
            <td class="p-4">{role.lastActive}</td>
          </tr>
          ))} 
        </tbody>
      </table>
    </div>
    </>
  );
}
