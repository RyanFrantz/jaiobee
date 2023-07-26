import { epochToLocale } from "../lib/utils.ts";

const statusTypes = {
  interested: "Interested",
  applied: "Applied",
  referred: "Referred",
  rejected: "Rejected",
  passed: "Passed",
};

export default function RoleInputs({role, action}) {
  // Possible action values are "add" and "edit" because this form is used
  // to add new roles as well as edit existing roles.
  const isEditing = (action == "edit");
  console.log(role)
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
              {Object.entries(statusTypes).map(([status, label]) =>
              <option
                value={status}
                selected={role.status == status}
              >
                {label}
              </option>
              )}
            </select>
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="job-posting-url" class="block text-sm pr-1">Job Posting</label>
            <input
              type="url"
              name="job-posting-url"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
              placeholder="https://example.com/careers/123"
              pattern="https?://.*"
              value={role?.["job-posting-url"]}
            />
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="description" class="block text-sm pr-1">Description</label>
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
          {/* On add, pass date-added along as a hidden input. */}
          {isEditing ? (
          <div class="col-span-1 mt-2 mr-2">
            <label for="date-added" class="block text-sm pr-1 underline">Date Added</label>
            <span
              name="date-added"
              class="w-1/2 mt-1 text-sm"
            >
            {epochToLocale(role["date-added"])}
            </span>
          </div>
          ) : (
          <div class="invisible col-span-1 mt-2 mr-2">
            <label for="date-added" class="block text-sm pr-1 underline">Date Added</label>
            <input
              type="number"
              name="date-added"
              class="w-1/2 mt-1 text-sm"
              value={role["date-added"]}
            />
          </div>
          )}

          <div class="col-span-1 mt-2 mr-2">
            <label for="referral-contact" class="block text-sm pr-1">Referral Contact</label>
            <input
              type="text"
              name="referral-contact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              value={role["referral-contact"]}
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="recruiter-contact" class="block text-sm pr-1">Recruiter Contact</label>
            <input
              type="text"
              name="recruiter-contact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              value={role["recruiter-contact"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
