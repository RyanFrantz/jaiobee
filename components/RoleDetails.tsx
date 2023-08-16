import { epochToLocale } from "../lib/utils.ts";

export default function RoleDetails({ role }) {
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
            <label for="title" class="block text-sm pr-2 underline">
              Title
            </label>
            <span class="w-full mt-1 text-sm">
              {role.title}
            </span>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="company" class="block text-sm pr-1 underline">
              Company
            </label>
            <span
              name="company"
              class="w-full mt-1 text-sm"
            >
              {role?.company}
            </span>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="status" class="block text-sm pr-1 underline">
              Status
            </label>
            <span
              name="status"
              class="w-full mt-1 text-sm"
            >
              {role?.status}
            </span>
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="jobPostingUrl" class="block text-sm pr-1 underline">
              Job Posting
            </label>
            <span
              name="jobPostingUrl"
              class="w-full mt-1 text-sm"
            >
              {role["jobPostingUrl"] || "N/A"}
            </span>
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="description" class="block text-sm pr-1 underline">
              Description
            </label>
            <p
              name="description"
              class="w-full mt-1 text-sm"
            >
              {role?.description || "N/A"}
            </p>
          </div>
        </div>
        {/* Contacts */}
        <div class="w-full p-4 grid grid-cols-1">
          <div class="col-span-1 mt-2 mr-2">
            <label for="createdAt" class="block text-sm pr-1 underline">
              Created
            </label>
            <span
              name="createdAt"
              class="w-1/2 mt-1 text-sm"
            >
              {epochToLocale(role.createdAt)}
            </span>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="referralContact" class="block text-sm pr-1 underline">
              Referral Contact
            </label>
            <span
              name="referralContact"
              class="w-full mt-1 text-sm"
            >
              {role?.referralContact || "N/A"}
            </span>
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="recruiterContact" class="block text-sm pr-1 underline">
              Recruiter Contact
            </label>
            <span
              name="recruiterContact"
              class="w-full mt-1 text-sm"
            >
              {role?.recruiterContact || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
