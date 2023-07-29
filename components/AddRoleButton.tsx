// FIXME: This is _identical_ to SaveRoleButton except that:
// 1. That component resides inside a form and is type "submit" while this one
//    includes a link to another resource/view.
// 2. The button text is marginally different ;)
// I bet I can combine them into a single component that receives props
// that customize its behavior.
export default function AddRoleButton() {
  return (
    <div class="flex justify-end m-2">
      <a href="/role/add">
        <button class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">
          Add Role
        </button>
      </a>
    </div>
  );
}
