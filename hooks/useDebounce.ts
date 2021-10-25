import { useEffect, useState } from "react";

function useDebounce(fn, delay) {
    const [debouncedValue, setDebouncedValue] = useState(fn);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(fn);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [fn]);
  
    return debouncedValue;
  }

  export default useDebounce;