import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import { getNotes } from "../../../lib/store.ts";
import { epochToLocale } from "../../../lib/utils.ts";
import AddNoteButton from "../../../components/AddNoteButton.tsx";

// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    // /role/8/notes
    //       ^
    const roleId =  Number(url.pathname.split("/")[2]);
    const userId = "1"; // Hard-coded for testing.
    const notes = await getNotes(userId, roleId);
    console.log(notes)
    const body = render(
      <>
      <div id="note-container" class="mt-4">
        <AddNoteButton />
        {notes.map((note) => (
          <div class="w-full px-2 py-1 border border-solid rounded-lg text-sm flex justify-start border-gray-300">
              <div class="px-2 text-white bg-emerald-500 border rounded-full">
                {epochToLocale(note["created-at"])}
              </div>
              <div class="mx-2">
              {note.message}
              </div>
          </div>
        ))}
      </div>
      </>
    );
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(
      body,
      {
        headers: headers
      }
    );
    
  },
};
