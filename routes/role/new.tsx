import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, _ctx) {
    const formData = await req.formData();
    console.log(formData);
    console.log(formData.get("title"));

    const headers = new Headers();
    // Redirect to the new role page.
    headers.set("location", "/roles");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function NewRole() {
  // Returns a super grid 3 columns wide, with two nested grids; the first is 2
  // colums wide and the second is 1 column wide.
  return (
    <form method="post" class="mt-1">
	    <div class="flex justify-end m-2">
	      <button
          type="submit"
          class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
        >
	      Save Role
	      </button>
	    </div>
      {/* Super grid */}
      <div class="grid grid-cols-3 border border-solid border-gray-400 rounded-b-lg">
        {/* Role details */}
        <div class="col-span-2 p-4 grid grid-cols-2">
          <div class="col-span-1 mt-2 mr-2">
            {/* "block" pushes the label above the input */}
            <label for="title" class="block text-sm pr-2">Title</label>
            <input
              type="text"
              name="title"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              required
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="company" class="block text-sm pr-1">Company</label>
            <input
              type="text"
              name="company"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
              required
            />
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="job-posting-url" class="block text-sm pr-1">Job Posting</label>
            <input
              type="url"
              name="job-posting-url"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
              placeholder="https://example.com/careers/123"
              pattern="https?://.*"
            />
          </div>
          <div class="lg:col-span-2 mt-2 mr-2">
            <label for="description" class="block text-sm pr-1">Description</label>
            <textarea
              rows="3"
              name="description"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            />
          </div>
        </div>
        {/* Contacts */}
        <div class="w-full p-4 grid grid-cols-1">
          {/* Only show when editinga role, not when adding the first time. */}
          <div class="invisible col-span-1 mt-2 mr-2">
            <label for="date-added" class="block text-sm pr-1">Date Added</label>
            <input
              type="date"
              name="date-added"
              class="w-1/2 mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="referral-contact" class="block text-sm pr-1">Referral Contact</label>
            <input
              type="text"
              name="referral-contact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            />
          </div>
          <div class="col-span-1 mt-2 mr-2">
            <label for="recruiter-contact" class="block text-sm pr-1">Recruiter Contact</label>
            <input
              type="text"
              name="recruiter-contact"
              class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
