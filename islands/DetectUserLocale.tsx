import { useEffect } from "preact/hooks";
import { LOCALE_COOKIE } from "../lib/constants.ts";

// Detect the user's locale and date formatting options and set a cookie
// with that information. This island is expected to be run for every request
// so we will be able to detect if these values change.
export default function DetectUserLocale() {
  useEffect(() => {
    // Alias the destructured properties to avoid collisons.
    const { locale , timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const cookieValue = btoa(JSON.stringify({locale: locale, timeZone: timeZone}));
    // In local dev, the host can include a port number and cookies won't get set.
    // Use hostname for consistency.
    const domain = new URL(location.origin).hostname;
    const localeCookie = [
      `${LOCALE_COOKIE}=${cookieValue}`,
      `Domain=${domain}`,
      "Path=/",
      "Max-Age=3600",
      "SameSite=lax",
      "Secure"
    ].join("; ");
    document.cookie = localeCookie; // Set the cookie.
  }, []);

  // Nothing to see here. Writing this return for completeness.
  return <></>;
}
