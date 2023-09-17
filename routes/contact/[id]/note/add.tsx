import { Handlers } from "$fresh/server.ts";
import { addContactNote } from "../../../../lib/store.ts";
import { makeNote } from "../../../../lib/store.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const url = new URL(req.url);
    // /contact/8/note/add
    //          ^
    const contactId = Number(url.pathname.split("/")[2]);
    const userId = ctx.state.userId;
    const formData = await req.formData();
    const inputs = {};
    for (const [key, value] of formData.entries()) {
      inputs[key] = value;
    }

    // Only add a note if there _is_ one.
    if (inputs["new-note"].length > 0) {
      const note = makeNote(inputs["new-note"]);
      // FIXME: Test for failure.
      await addContactNote(userId, contactId, note);
    }

    const headers = new Headers();
    // This should trigger an event on the page that called this endpoint which
    // wil refresh the notes.
    headers.set("HX-Trigger", "newNote");
    return new Response(null, {
      status: 200,
      headers,
    });
  },
};
