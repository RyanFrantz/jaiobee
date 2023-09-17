import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import { getContact } from "../../../lib/store.ts";
import EditContactButtonRow from "../../../components/EditContactButtonRow.tsx";
import ContactForm from "../../../components/ContactForm.tsx";

// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // /contact/8/edit
    //          ^
    const contactId = Number(url.pathname.split("/")[2]);
    const { dateTimeFormat, userId } = ctx.state;
    let [statusCode, contact] = await getContact(userId, contactId);
    if (statusCode !== 200) {
      role = {};
    }
    // Let's give hypermedia a whirl, here.
    const body = render(
      <div id="contact-container">
        <EditContactButtonRow contactId={contactId} />
        <ContactForm contact={contact} action="edit" dateTimeFormat={dateTimeFormat} />
      </div>,
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
