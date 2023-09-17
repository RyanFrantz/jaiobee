import { Handlers, PageProps } from "$fresh/server.ts";
import AddContactButton from "../components/AddContactButton.tsx";
import ContactTable from "../components/ContactTable.tsx";
import { getContactNoteActivity, getContacts } from "../lib/store.ts";

// TODO: Build support for storing and retrieving contacts.
export const handler: Handlers = {
  async GET(_req, ctx) {
    const { dateTimeFormat, userId } = ctx.state;
    const contacts = await getContacts(userId);
    const contactNoteActivity = await getContactNoteActivity(userId);
    return await ctx.render({ contacts, contactNoteActivity, dateTimeFormat });
  },
};

export default function Profile(props: PageProps) {
  const { contacts, contactNoteActivity, dateTimeFormat } = props.data;
  return (
    <>
      <div id="contacts-container">
       <AddContactButton />
       <ContactTable
         contacts={contacts}
         contactNoteActivity={contactNoteActivity}
         dateTimeFormat={dateTimeFormat}
       />
      </div>
    </>
  );
}
