import { useState, useEffect } from "react";

type UseLocalStorageReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

/**
 * Custom hook to read and write data to localStorage.
 * @param key - The localStorage key.
 * @param initialValue - The initial value to be used if there's no data in localStorage.
 */
const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): UseLocalStorageReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue !== undefined) {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
