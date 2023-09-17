// FIXME: Think through how to have this call a resource via htmx and replace a
// container. I'll need to revisit the /role/[id].tsx page to accommodate that.
// I hope that using an htmx-based solution also cuts down on copypasta.
export default function CancelContactEditButton({ contactId }) {
  return (
    <div class="flex justify-end m-2">
      <a href={"/contact/" + contactId}>
        <button class="px-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm">
          Cancel
        </button>
      </a>
    </div>
  );
}
