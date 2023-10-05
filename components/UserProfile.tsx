import { epochToLocale } from "../lib/utils.ts";

export default function UserProfile(
  { profile, dateTimeFormat, numContacts, numRoles },
) {
  const { locale, timeZone } = dateTimeFormat;
  return (
    <div class="border border-solid border-gray-400 rounded-b-lg px-4">
      <table class="table-auto text-sm">
        <thead>
          <tr>
            <th class="p-4">
              <div class="flex justify-center">
                Preferred Name
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
                Email
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
                Status
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
                Account Created
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
                Contacts
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center">
                Roles
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4">
              {profile.preferredName}
            </td>
            <td class="p-4">{profile.email}</td>
            <td class="p-4">{profile.paymentStatus}</td>
            <td class="p-4">
              {epochToLocale(profile.createdAt, locale, timeZone)}
            </td>
            <td class="p-4">{numContacts}</td>
            <td class="p-4">{numRoles}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
