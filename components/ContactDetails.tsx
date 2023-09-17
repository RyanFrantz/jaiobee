import { epochToLocale } from "../lib/utils.ts";

export default function ContactDetails({ contact, dateTimeFormat }) {
  const { locale, timeZone } = dateTimeFormat || { undefined, undefined };
  // Returns a super grid 3 columns wide, with two nested grids; the first is 2
  // colums wide and the second is 1 column wide.
  const isEditing = false;
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
            <span
              name="name"
              class="w-full mt-1 text-sm">
              {contact?.name}
            </span>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="company" class="block text-sm pr-1">
              Company
            </label>
            <span
              name="company"
              class="w-full mt-1 text-sm">
              {contact?.company || "N/A"}
            </span>
          </div>
          <div class="lg:col-span-1 mt-2 mr-2">
            <label for="phone" class="block text-sm pr-1">
              Phone
            </label>
            <span
              name="phone"
              class="w-full mt-1 text-sm">
              {contact?.phone || "N/A"}
            </span>
          </div>
          <div class="lg:col-span-1 mt-2 mr-2">
            <label for="email" class="block text-sm pr-1">
              Email
            </label>
            <span
              name="email"
              class="w-full mt-1 text-sm">
              {contact?.email || "N/A"}
            </span>
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="description" class="block text-sm pr-1">
              Description
            </label>
            <span
              name="description"
              class="w-full mt-1 text-sm">
              {contact?.description || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
