import ContactInputs from "./ContactInputs.tsx";

export default function ContactForm({ contact, action, dateTimeFormat }) {
  return (
    <form id="add-contact" method="post" class="mt-1">
      <ContactInputs contact={contact} action={action} dateTimeFormat={dateTimeFormat} />
    </form>
  );
}
