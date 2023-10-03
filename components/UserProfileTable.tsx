import SortArrow from "./SortArrow.tsx";
import { epochToLocale } from "../lib/utils.ts";

export default function UserProfileTable({ userProfiles, dateTimeFormat }) {
  const { locale, timeZone } = dateTimeFormat;
  return (
    <>
      <div class="border border-solid border-gray-400 rounded-b-lg px-4">
        <table class="table-auto text-sm">
          <thead>
            <tr>
              <th class="p-4">
                <div class="flex justify-center">
                  Preferred Name
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Email
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Status
                  <SortArrow />
                </div>
              </th>
              <th class="p-4">
                <div class="flex justify-center">
                  Account Created
                  <SortArrow />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((userProfile) => (
              <tr>
                <td class="p-4">
                  <a href={"/user/" + userProfile.id} class="hover:underline">
                    {userProfile.preferredName}
                  </a>
                </td>
                <td class="p-4">{userProfile.email}</td>
                <td class="p-4">{userProfile.paymentStatus}</td>
                <td class="p-4">{epochToLocale(userProfile.createdAt, locale, timeZone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
