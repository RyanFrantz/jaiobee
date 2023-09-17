import { Handlers } from "$fresh/server.ts";
import EditContactButton from "../../components/EditContactButton.tsx";
import ContactDetails from "../../components/ContactDetails.tsx";
import { getContact, updateContact } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // Grab the first part of the pathname to use as input for a contact ID.
    const contactId = Number(url.pathname.split("/contact/")[1]);
    const userId = ctx.state.userId;
    let [statusCode, contact] = await getContact(userId, contactId);
    if (statusCode !== 200) {
      contact = {};
    }
    const props = { ...ctx.state, contact: contact, contactId: contactId };
    return ctx.render(props);
  },

  // The user clicked 'Save Contact'.
  async POST(req, ctx) {
    const url = new URL(req.url);
    const formData = await req.formData();
    const contact = {};
    for (const [key, value] of formData.entries()) {
      contact[key] = value;
    }
    const contactId = Number(url.pathname.split("/contact/")[1]);
    const userId = ctx.state.userId;
    const [statusCode, response] = await updateContact(userId, contactId, contact);

    const headers = new Headers();
    // Redirect to the contact page on successful update.
    if (statusCode == 200) {
      const { contactId } = response;
      headers.set("location", `/contact/${contactId}`);
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }

    return new Response(null, {
      status: 404, // blanket response, for now
    });
  },
};

export default function Contact(props) {
  const { contact, contactId, dateTimeFormat } = props.data;
  return (
    <>
      <div id="contact-container">
        <EditContactButton contactId={contactId} />
        <ContactDetails contact={contact} dateTimeFormat={dateTimeFormat} />
      </div>
      <div
        id="note-container"
        class="mt-4"
        hx-get={"/contact/" + contactId + "/notes"}
        hx-trigger="load"
        hx-target="#note-container"
        hx-swap="outerHTML"
      >
      </div>
    </>
  );
}
