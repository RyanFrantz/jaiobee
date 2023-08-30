import { useEffect } from "preact/hooks";

// Detect the user's locale and date formatting options and set the
// resulting object as a signal value we can use in other components.
export default function DetectUserLocale({ locale, timeZone }) {
  useEffect(() => {
    // Alias the destructured properties to avoid collisons.
    const { locale: browserLocale, timeZone: browserTimeZone } = Intl
      .DateTimeFormat().resolvedOptions();
    // Update the relevant signals.
    locale.value = browserLocale;
    timeZone.value = browserTimeZone;
  }, []);

  // Nothing to see here. Writing this return for completeness.
  return <></>;
}
