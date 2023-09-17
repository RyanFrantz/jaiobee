export default function EditContactButton({ contactId }) {
  return (
    <div class="flex justify-end m-2">
      <button
        class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
        hx-get={"/contact/" + contactId + "/edit"}
        hx-trigger="click"
        hx-target="#contact-container"
        hx-swap="outerHTML"
      >
        Edit Contact
      </button>
    </div>
  );
}
