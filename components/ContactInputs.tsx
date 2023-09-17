import { epochToLocale } from "../lib/utils.ts";

export default function ContactInputs({ contact, action, dateTimeFormat }) {
  // Possible action values are "add" and "edit" because this form is used
  // to add new contacts as well as edit existing contacts.
  const isEditing = action == "edit";
  // We only receive dateTimeFormat during edits (no need to display time during
  // adds).
  const { locale, timeZone } = dateTimeFormat || { undefined, undefined };
  // Returns a super grid 3 columns wide, with two nested grids; the first is 2
  // colums wide and the second is 1 column wide.
  return (
    <>
      {/* Super grid */}
      <div class="grid grid-cols-3 border border-solid border-gray-400 rounded-b-lg">
        {/* Contact details */}
        <div class="col-span-2 p-4 grid grid-cols-2">
          <div class="col-span-1 mt-2 mr-2">
            {/* "block" pushes the label above the input */}
            <label for="name" class="block text-sm pr-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              required
              value={contact?.name}
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="company" class="block text-sm pr-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              value={contact?.company}
            />
          </div>
          <div class="lg:col-span-1 mt-2 mr-2">
            <label for="phone" class="block text-sm pr-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={contact?.phone}
            />
          </div>
          <div class="lg:col-span-1 mt-2 mr-2">
            <label for="email" class="block text-sm pr-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
              placeholder="jane@jaiobee.com"
              value={contact?.email}
            />
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="description" class="block text-sm pr-1">
              Description
            </label>
            <textarea
              rows="3"
              name="description"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            >
              {contact?.description}
            </textarea>
          </div>
        </div>
        {/* Contacts */}
        <div class="w-full p-4 grid grid-cols-1">
          {/* We don't support editing the date the role was added. Just display it. */}
          {/* On add, pass createdAt along as a hidden input. */}
          {isEditing
            ? (
              <div class="col-span-1 mt-2 mr-2">
                <label for="createdAt" class="block text-sm pr-1 underline">
                  Created
                </label>
                <span
                  name="createdAt"
                  class="w-1/2 mt-1 text-sm"
                >
                  {epochToLocale(contact.createdAt, locale, timeZone)}
                </span>
              </div>
            )
            : (
              <div class="invisible col-span-1 mt-2 mr-2">
                <label for="createdAt" class="block text-sm pr-1 underline">
                  Created
                </label>
                <input
                  type="number"
                  name="createdAt"
                  class="w-1/2 mt-1 text-sm"
                  value={contact.createdAt}
                />
              </div>
            )}
          {
            /* I also don't have plans to expose "updatedAt" in the form.
            * Keep it secret. Keep it safe.
            */
          }
          <div class="invisible col-span-1 mt-2 mr-2">
            <label for="updatedAt" class="block text-sm pr-1 underline">
              Last Updated
            </label>
            <input
              type="number"
              name="updatedAt"
              class="w-1/2 mt-1 text-sm"
              value={contact.updatedAt}
            />
          </div>
        </div>
      </div>
    </>
  );
}
