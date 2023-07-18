// FIXME: Same vibe as AddRoleButton.tsx
// I imagine using htmx markup here to replace an existing role container
// with the same form as used in /role/add but with values already filled
// from the existing role.
// The link to '#' is a placeholder, for now.
export default function EditRoleButton() {
  return (
    <div class="flex justify-end m-2">
      <a href="#">
        <button class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">
        Edit Role
        </button>
      </a>
    </div>
  );
}
