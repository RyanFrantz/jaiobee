export default function RoleTable({roles}) {
  return (
    <>
    <div class="flex justify-end m-2">
      <button class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">
      Add Role
      </button>
    </div>
    <div class="border border-solid border-gray-400 rounded-b-lg px-4">
      <table class="table-auto">
        <thead>
          <tr>
            <th>Role</th>
            <th>Company</th>
            <th>Last Active</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
          <tr>
            <td>{role.title}</td>
            <td>{role.company}</td>
            <td>{role.lastActive}</td>
          </tr>
          ))} 
        </tbody>
      </table>
    </div>
    </>
  );
}
