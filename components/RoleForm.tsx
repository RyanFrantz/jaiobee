import RoleInputs from "./RoleInputs.tsx";

export default function RoleForm({ role, contacts, action, dateTimeFormat }) {
  return (
    <form id="add-role" method="post" class="mt-1">
      <RoleInputs role={role} contacts={contacts} action={action} dateTimeFormat={dateTimeFormat} />
    </form>
  );
}
