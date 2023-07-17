export default function NewRole() {
  return (
    <form class="mt-10">
    <div class="p-4 grid grid-cols-3 border border-solid border-gray-400 rounded-md">
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
      {/* Only show when editinga role, not when adding the first time. */}
      <div class="hidden col-span-1 mt-2 mr-2">
        <label for="date-added" class="block text-sm pr-1">Date Added</label>
        <input
          type="date"
          name="date-added"
          class="w-1/2 mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md"
        />
      </div>
      <div class="lg:col-span-2 mt-2 mr-2">
        <label for="job-posting" class="block text-sm pr-1">Job Posting</label>
        <input
          type="url"
          name="job-posting"
          class="w-full mt-1 p-1 text-sm border border-solid border-gray-400 rounded-md placeholder:italic placeholder:text-gray-400"
          placeholder="https://example.com/careers/123"
          pattern="https://.*"
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
    </form>
  );
}
