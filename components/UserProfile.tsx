import { epochToLocale } from "../lib/utils.ts";

export default function UserProfile({ profile }) {
  console.log(profile);
  return (
    <div class="flex flex-1 flex-col justify-center px-6 py-12">
      <div
        class="mx-auto flex flex-1 flex-col justify-center border border-solid border-gray-400 rounded-lg p-6"
      >
          <div>
            <label class="mt-2 underline">
              Preferred Name
            </label>
          </div>
          <div>
            {profile.preferredName}
          </div>
          <div>
            <label class="mt-2 underline">
              Email
            </label>
          </div>
          <div>
            {profile.email}
          </div>
          <div>
            <label class="mt-2 underline">
              Account Created
            </label>
          </div>
          <div>
            {epochToLocale(profile.createdAt)}
          </div>
          <div>
            <label class="mt-2 underline">
              Account Type
            </label>
          </div>
          <div>
            {profile.paymentStatus}
          </div>
      </div>
    </div>
  );
}
