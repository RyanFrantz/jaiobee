import { useState } from "preact/hooks";

export default function ToggleArchive () {
  let [showingArchivedRoles, toggleShowArchivedRoles] = useState(false);
  let [toggleAction, setToggleAction] = useState("Show");

  const toggle = () => {
    toggleShowArchivedRoles(!showingArchivedRoles);
    setToggleAction(toggleAction == "Show" ? "Hide": "Show")
    const buttonStyles = document.getElementById("toggle-role-archive-view").classList
    console.log(toggleAction);
    if (toggleAction == "Hide") {
      // Displaying option to show.
      buttonStyles.remove("bg-red-500");
      buttonStyles.add("bg-emerald-500");
    } else if (toggleAction == "Show") {
      // Displaying option to hide.
      buttonStyles.remove("bg-emerald-500");
      buttonStyles.add("bg-red-500");
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
