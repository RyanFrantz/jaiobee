import CancelEditButton from "./CancelEditButton.tsx";
import SaveRoleButton from "./SaveRoleButton.tsx";

export default function EditButtonRow({roleId}) {
  return (
    <div class="flex justify-end m-2">
      <CancelEditButton roleId={roleId} />
      <SaveRoleButton />
    </div>
  );
}
