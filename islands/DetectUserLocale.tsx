import { useContext, useEffect, useState } from "preact/hooks";
import { UserContext } from "../routes/_app.tsx"

// Detect the user's locale and date formatting options and set the
// resulting object as a signal value we can use in other components.
export default function DetectUserLocale() {
  const [browserDateTimeFormat, setBrowserDateTimeFormat] = useState({});

  let { locale, timeZone } = useContext(UserContext);
  console.log("OUTSIDE EFFECT locale", locale.value);

	useEffect(() => {
    console.log("INSIDE EFFECT locale: ", locale); // "undefined" in browser console
	  setBrowserDateTimeFormat(Intl.DateTimeFormat().resolvedOptions());
    locale.value = browserDateTimeFormat.locale;
    timeZone.value = browserDateTimeFormat.timeZone;
    console.log(timeZone)
  }, []);

  // Nothing to see here. Writing this return for completeness.
  return (
    <></>
  );
};
