import { useState } from "preact/hooks";

export default function ToggleArchive () {
  let [showingArchivedRoles, toggleShowArchivedRoles] = useState(false);
  let [toggleAction, setToggleAction] = useState("Show");

  // Archived roles start in a hidden state. We can toggle their visibility as
  // well as suporting elements like an "Archived?" header.
  const toggle = () => {
    toggleShowArchivedRoles(!showingArchivedRoles);
    setToggleAction(toggleAction == "Show" ? "Hide": "Show");
    const buttonStyles = document.getElementById("toggle-role-archive-view").classList;
    const archiveHeader = document.getElementById("role-archive-header");
    const archivedRoles = document.getElementsByClassName("role-archived");
    const archiveColumns = document.getElementsByClassName("archive-column");
    console.log(toggleAction);
    if (toggleAction == "Hide") {
      // Displaying option to show.
      buttonStyles.remove("bg-red-500");
      buttonStyles.add("bg-emerald-500");
      archiveHeader.classList.add("hidden");
      for (const role of archivedRoles) {
        role.classList.add("hidden");
      }
      for (const column of archiveColumns) {
        column.classList.add("hidden");
      }
    } else if (toggleAction == "Show") {
      // Displaying option to hide.
      buttonStyles.remove("bg-emerald-500");
      buttonStyles.add("bg-red-500");
      archiveHeader.classList.remove("hidden");
      for (const role of archivedRoles) {
        role.classList.remove("hidden");
      }
      for (const column of archiveColumns) {
        column.classList.remove("hidden");
      }
    }
  }

// TODO: Update styles.css so that we set bg color based on
// [aria-pressed=false] or [aria-pressed=true]
// See https://joshcollinsworth.com/blog/accessible-toggle-buttons#toggle-button-styling
  return (
    <div class="flex justify-end m-2">
    <button
      onClick={toggle}
      id="toggle-role-archive-view"
      type="button"
      aria-pressed={showingArchivedRoles}
      class="px-2 text-sm rounded bg-emerald-500 text-white"
    >
    {toggleAction} archived roles
    </button>
    </div>
  );
}
