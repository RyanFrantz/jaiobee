export default function SaveContactButton() {
  return (
    <div class="flex justify-end m-2">
      <button
        type="submit"
        form="add-contact"
        class="my-1 px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
      >
        Save Contact
      </button>
    </div>
  );
}
