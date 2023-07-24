import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import NewNoteContainer from "../../../components/NewNoteContainer.tsx";

// TODO: Add POST support that saves form input and them prepends the text
// to the rows of notes.
// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
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
