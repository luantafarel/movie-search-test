import { useState, useRef, useEffect } from "react";

export const useDebounced = (value, period = 300) => {
  // Create an internal state that will be updated when the timeout happens
  const [debounced, setDebounced] = useState(value);

  // we use a ref here because we do not want to re render when it changes, only when `debounced` changes
  const interval = useRef(null);

  useEffect(() => {
    // resets the period each time the user types something
    if (interval.current) {
      clearTimeout(interval.current);
      interval.current = null;
    }
    // If the user stops typing for `period`, set the internal `debounced` value
    interval.current = setTimeout(() => setDebounced(value), period);
  }, [value, period]);

  // returns the debounced state
  return debounced;
};
