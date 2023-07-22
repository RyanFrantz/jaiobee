// On click, fetches hypermedia representing a new note and prepends it
// to the notes section.
export default function AddNoteButton() {
  return (
    <div class="flex justify-end m-2">
      <button
        class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
        hx-get="/role/note/add" hx-target="#new-note"
        hx-swap="outerHTML" hx-trigger="click"
      >
      Add Note
      </button>
    </div>
  );
}
