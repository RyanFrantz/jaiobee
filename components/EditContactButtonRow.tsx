import CancelContactEditButton from "./CancelContactEditButton.tsx";
import SaveContactButton from "./SaveContactButton.tsx";

export default function EditContactButtonRow({ contactId }) {
  return (
    <div class="flex justify-end m-2">
      <CancelContactEditButton contactId={contactId} />
      <SaveContactButton />
    </div>
  );
}
