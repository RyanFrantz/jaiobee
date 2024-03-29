import SortArrow from "./SortArrow.tsx";
import { epochToLocale } from "../lib/utils.ts";

// NOTE: Tailwind offers table layout support via the `table` class like so:
// https://tailwindcss.com/docs/display#table

// TODO: Don't show sort arrow if that column is the one that we're sorting on.
export default function RoleTable({ roles, noteActivity, dateTimeFormat }) {
  const { locale, timeZone } = dateTimeFormat;
  return (
    <>
      <div class="border border-solid border-gray-400 rounded-b-lg px-4">
        <table class="table-auto text-sm">
          <thead>
            <tr>
              <th class="p-4">
                <div class="flex justify-center">
                  Role
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Company
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Last Active
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Status
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div
                  id="role-archive-header"
                  class="flex justify-center hidden"
                >
                  Archived?
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                class={role.isArchived == "yes" ? "role-archived bg-gray-100 hidden" : "role-active"}
              >
                <td class="p-4">
                  <a href={"/role/" + role.id} class="hover:underline">
                    {role.title}
                  </a>
                </td>
                <td class="p-4">{role.company}</td>
                <td class="p-4">
                  {epochToLocale(
                    Math.max(role.updatedAt, noteActivity[role.id]),
                    locale,
                    timeZone
                  )}
                </td>
                <td class="p-4">{role.status}</td>
                <td class="archive-column p-4 flex justify-center hidden">{role.isArchived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
