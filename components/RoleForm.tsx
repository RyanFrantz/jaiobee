import RoleInputs from "./RoleInputs.tsx";

export default function RoleForm({role, action}) {
  return (
    <form id="add-role" method="post" class="mt-1">
      <RoleInputs role={role} action={action}/>
    </form>
  );
}
