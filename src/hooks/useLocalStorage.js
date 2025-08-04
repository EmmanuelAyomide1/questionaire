import { useEffect, useState } from "react";

export function useLocalStorage(valueName, initialValue = []) {
  const [storedValue, setStoredValue] = useState(
    () => JSON.parse(localStorage.getItem(valueName)) || initialValue,
  );

  useEffect(() => {
    localStorage.setItem(valueName, JSON.stringify(storedValue));
  }, [valueName, storedValue]);

  return [storedValue, setStoredValue];
}
