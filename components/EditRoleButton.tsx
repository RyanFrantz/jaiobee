// FIXME: Same vibe as AddRoleButton.tsx
// I imagine using htmx markup here to replace an existing role container
// with the same form as used in /role/add but with values already filled
// from the existing role.
// The link to '#' is a placeholder, for now.
export default function EditRoleButton({roleId}) {
  return (
    <div class="flex justify-end m-2">
      <button
        class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
         hx-get={"/role/" + roleId + "/edit"} hx-trigger="click"
         hx-target="role-container" hx-swap="outerHTML"
      >
      Edit Role
      </button>
    </div>
  );
}
