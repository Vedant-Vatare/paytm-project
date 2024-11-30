import { useEffect, useState } from "react"

const useDebounce = (value, delay=500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(()=> {
    let timerId = setTimeout(()=> {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerId);
    }
  }, [value])

  return debouncedValue;
}

export default useDebounce;