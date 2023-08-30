import { useContext, useEffect, useState } from "preact/hooks";
import { UserContext } from "../routes/_app.tsx"
import DetectUserLocale from "../islands/DetectUserLocale.tsx";

// This component wraps DetectUserLocale because context providers aren't
// serialized to clients. Therefore we have to get the context in this
// component and pass it to the island. Because the props we're passing
// are signals, within the island those signals can be updated.
export default function UserLocale() {
  let { locale, timeZone } = useContext(UserContext);

  return (
    <DetectUserLocale locale={locale} timeZone={timeZone} />
  );
};
