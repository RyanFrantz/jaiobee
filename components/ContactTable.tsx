import SortArrow from "./SortArrow.tsx";
import { epochToLocale } from "../lib/utils.ts";

export default function ContactTable({ contacts, contactNoteActivity, dateTimeFormat }) {
  const { locale, timeZone } = dateTimeFormat;
  return (
    <>
      <div class="border border-solid border-gray-400 rounded-b-lg px-4">
        <table class="table-auto text-sm">
          <thead>
            <tr>
              <th class="p-4">
                <div class="flex justify-center">
                  Name
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Company
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Phone
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Email
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Last Active
                  <SortArrow />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr>
                <td class="p-4">
                  <a href={"/contact/" + contact.id} class="hover:underline">
                    {contact.name}
                  </a>
                </td>
                <td class="p-4">{contact.company}</td>
                <td class="p-4">{contact.phone}</td>
                <td class="p-4">{contact.email}</td>
                <td class="p-4">
                  {epochToLocale(
                    Math.max(contact.updatedAt, contactNoteActivity[contact.id]),
                    locale,
                    timeZone
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
