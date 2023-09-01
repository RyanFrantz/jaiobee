import RoleInputs from "./RoleInputs.tsx";

export default function RoleForm({ role, action, dateTimeFormat }) {
  return (
    <form id="add-role" method="post" class="mt-1">
      <RoleInputs role={role} action={action} dateTimeFormat={dateTimeFormat} />
    </form>
  );
}
