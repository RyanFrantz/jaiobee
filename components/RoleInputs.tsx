import { epochToLocale } from "../lib/utils.ts";
import { roleStatusTypes } from "./roleStatusTypes.ts";

export default function RoleInputs({ role, contacts, action, dateTimeFormat }) {
  console.log(contacts)
  // If contacts are not set (or are, but can't be parsed), define some
  // properties (as undefined) to pass muster below.
  try {
    role.recruiterContact = JSON.parse(role.recruiterContact);
  } catch {
    role.recruiterContact = { id: undefined, name: undefined };
  }
  try {
    role.referralContact = JSON.parse(role.referralContact);
  } catch {
    role.referralContact = { id: undefined, name: undefined };
  }
  // Possible action values are "add" and "edit" because this form is used
  // to add new roles as well as edit existing roles.
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
        {/* Role details */}
        <div class="col-span-2 p-4 grid grid-cols-2">
          <div class="col-span-2 mt-2 mr-2">
            {/* "block" pushes the label above the input */}
            <label for="title" class="block text-sm pr-2">Title</label>
            <input
              type="text"
              name="title"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              required
              value={role?.title}
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="company" class="block text-sm pr-1">Company</label>
            <input
              type="text"
              name="company"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              required
              value={role?.company}
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="status" class="block text-sm pr-1">Status</label>
            <select
              name="status"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            >
              {Object.entries(roleStatusTypes).map(([status, label]) => (
                <option
                  value={status}
                  selected={role.status == status}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="jobPostingUrl" class="block text-sm pr-1">
              Job Posting
            </label>
            <input
              type="url"
              name="jobPostingUrl"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
              placeholder="https://example.com/careers/123"
              pattern="https?://.*"
              value={role?.jobPostingUrl}
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
              {role?.description}
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
                  {epochToLocale(role.createdAt, locale, timeZone)}
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
                  value={role.createdAt}
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
              value={role.updatedAt}
            />
          </div>

          <div class="col-span-1 mt-2 mr-2">
            <label for="referralContact" class="block text-sm pr-1">
              Referral Contact
            </label>
            <select
              name="referralContact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            >
              <option value="">None</option>
              {contacts.map((contact) => (
                <option
                  value={JSON.stringify(contact)}
                  selected={role?.referralContact?.id == contact.id}
                >
                  {contact.name}
                </option>
              ))}
            </select>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="recruiterContact" class="block text-sm pr-1">
              Recruiter Contact
            </label>
            <select
              name="recruiterContact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            >
              <option value="">None</option>
              {contacts.map((contact) => (
                <option
                  value={JSON.stringify(contact)}
                  selected={role?.recruiterContact?.id == contact.id}
                >
                  {contact.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
