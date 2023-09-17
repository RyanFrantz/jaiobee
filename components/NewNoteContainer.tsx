import NewNoteForm from "./NewNoteForm.tsx";

// Either one of a contactId or a roleId prop will be passed in.
// Use their presence to determine which URL to POST to.
export default function NewNoteContainer({ contactId, roleId }) {
  const isContactNote = contactId !== undefined;
  return (
    <div id="new-note-container">
      {isContactNote ?
      (
        <NewNoteForm parentType="contact" parentId={contactId} />
      ) : (
        <NewNoteForm parentType="role" parentId={roleId} />
      )}
    </div>
  );
}
