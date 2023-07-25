import AddNoteButton from "./AddNoteButton.tsx";

export default function NewNoteContainer({roleId}) {
  return (
  <div
    id="new-note-container"
    class="w-full px-2 py-1 border border-solid rounded-lg text-sm border-gray-400 flex j  ustify-between"
  >
    <form
      id="new-note"
      class="flex justify-between"
      hx-post={"/role/" + roleId + "/note/add"}
    >
      <textarea
        rows="1"
        class="w-5/6 border border-solid border-gray-400 rounded-lg"
        name="new-note"
      >
      </textarea>
      <AddNoteButton />
    </form>
  </div>
  );
}
