import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import { getNotes } from "../../../lib/store.ts";
import { epochToLocale } from "../../../lib/utils.ts";
import NewNoteContainer from "../../../components/NewNoteContainer.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // /role/8/notes
    //       ^
    const roleId = Number(url.pathname.split("/")[2]);
    const userId = ctx.state.userId;
    const notes = await getNotes(userId, roleId);
    const body = render(
      <>
        {
          /* Use an event trigger of "newNote" to re-render the notes after a new
          one has been added via the "Add Note" button.
        */
        }
        <div
          id="note-container"
          class="mt-4"
          hx-get={url.pathname}
          hx-trigger="newNote from:body"
        >
          <NewNoteContainer roleId={roleId} />
          {/* Reverse chronological order */}
          {notes.reverse().map((note) => (
            <div class="w-full mt-1 p-2 border border-solid rounded-lg text-sm flex justify-start border-gray-400">
              <div class="px-2 text-white bg-emerald-500 rounded-full">
                {epochToLocale(note["created-at"])}
              </div>
              <div class="mx-2">
                {note.message}
              </div>
            </div>
          ))}
        </div>
      </>,
    );
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(
      body,
      {
        headers: headers,
      },
    );
  },
};
