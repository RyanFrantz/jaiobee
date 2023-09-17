import AddNoteButton from "./AddNoteButton.tsx";

// Return a <form> element. The POST URL is based on whether we are adding a
// contact note or a role note.
// parentType = "contact" | "role"
// parentId is the ID of either a contact or role.
export default function NewNoteForm({ parentType, parentId }) {
  return (
      <form
        id="new-note"
        class="w-full px-2 py-1 border border-solid rounded-lg text-sm border-gray-400 flex justify-between"
        hx-post={"/" + parentType + "/" + parentId + "/note/add"}
      >
        <textarea
          rows="1"
          class="w-5/6 p-1 border border-solid border-gray-400 rounded-lg"
          name="new-note"
        >
        </textarea>
        <div class="flex justify-end">
          <AddNoteButton />
        </div>
      </form>
  ) ;
};
