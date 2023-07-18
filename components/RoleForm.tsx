import RoleInputs from "./RoleInputs.tsx";
import SaveRoleButton from "./SaveRoleButton.tsx";

export default function RoleForm() {
  return (
    <div id="role-container">
      <SaveRoleButton />
      <form id="add-role" method="post" class="mt-1">
        <RoleInputs role={{}}/>
      </form>
    </div>
  );
}
