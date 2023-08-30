import { createContext } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { signal } from "@preact/signals";

const UserContext = createContext();

export default function UserContextProvider({children}) {
  const locale = signal("en-US");
  const timeZone = signal("America/New_York");
  const initialState = useMemo(
    () => ({locale, timeZone}),
    [locale, timeZone]
  );

  return (
    <UserContext.Provider value={initialState}>{children}</UserContext.Provider>
  );
};

// Export a custom hook to access the context.
export const useUserContext = () => useContext(UserContext);
