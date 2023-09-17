import { Handlers } from "$fresh/server.ts";
import SaveContactButton from "../../components/SaveContactButton.tsx";
import ContactForm from "../../components/ContactForm.tsx";
import { addContact } from "../../lib/store.ts";
import { epoch } from "../../lib/utils.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const formData = await req.formData();
    const contact = {};
    for (const [key, value] of formData.entries()) {
      contact[key] = value;
    }
    const userId = ctx.state.userId;
    const [statusCode, response] = await addContact(userId, contact);

    const headers = new Headers();
    // Redirect to the new contact page.
    if (statusCode == 201) {
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

export default function AddContact() {
  // The user is adding the contact for the first time so we'll pre-populate the
  // important bits.
  const now = epoch();
  const contact = { createdAt: now, updatedAt: now };
  return (
    <div id="contact-container">
      <SaveContactButton />
      <ContactForm contact={contact} action="add" />
    </div>
  );
}
