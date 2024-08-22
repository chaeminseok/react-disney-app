import { useState, useEffect } from "react";
export const useDebounce = (value, delay) => {
  const [debouncedValue, setdebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
