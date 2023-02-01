import { None, Optional } from "../utilities/typingUtilities";
import { useEffect, useState } from "react";

export function useStorage(key: string) {
  const [value, setValue] = useState<Optional<string>>();

  useEffect(() => {
    load();
  }, []);

  function load(): Optional<string> {
    const storageValue = window.localStorage.getItem(key) || None;
    setValue(storageValue);
    return storageValue;
  }

  function set(value: Optional<string> = None) {
    if (value === None) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
      setValue(value);
    }
  }

  return [value, set, load] as const;
}
