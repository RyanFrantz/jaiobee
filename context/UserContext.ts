import { Signal, signal } from "@preact/signals";

// User-specific configuration that comes from the browser, such as locale and
// time zone information.
// Matches the (destructured) output of Intl.DateTimeFormat().resolvedOptions().
type UserDateTimeFormat = {
  locale: Signal<string>;
  timeZone: Signal<string>;
};

// Generate initial state with sane defaults.
const createUserState = (): UserDateTimeFormat => {
  const locale = signal<string>("en-US");
  const timeZone = signal<string>("America/New_York");
  return { locale, timeZone };
};

// Export the initial state itself, not the function.
export default createUserState();

export { UserDateTimeFormat };
