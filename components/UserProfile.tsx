import { epochToLocale } from "../lib/utils.ts";

export default function UserProfile({ profile, dateTimeFormat }) {
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
