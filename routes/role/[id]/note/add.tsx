import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import NewNoteContainer from "../../../../components/NewNoteContainer.tsx";
import { addNote } from "../../../../lib/store.ts";
import { epoch } from "../../../../lib/utils.ts";

// TODO: Add POST support that saves form input and them prepends the text
// to the rows of notes.
// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    // /role/8/note/add
    //       ^
    const roleId =  Number(url.pathname.split("/")[2]);
    const userId = "1"; // Hard-coded for testing.
    const formData = await req.formData();
    console.log(formData);
    const inputs = {};
    for (const [key, value] of formData.entries()) {
        inputs[key] = value;
    }
    const note = {
        "created-at": epoch(),
        message: inputs["new-note"]
      }
    await addNote(userId, roleId, note)
    const headers = new Headers();
    // This should trigger an event on the page that called this endpoint which
    // wil refresh the notes.
    headers.set("HX-Trigger", "newNote");
    return new Response(null, {
      status: 200,
      headers,
    });
  },
  async GET() {
    const fragment = render(
      <NewNoteContainer />
    );
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(
      fragment,
      {
        headers: headers
      }
    );
    
  },
};
