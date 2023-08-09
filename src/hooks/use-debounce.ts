import { useEffect, useRef, useState } from 'react'

function useDebounce(initData: string | number) {
  const [previousValue, setPreviousValue] = useState(initData)
  const [value, setValue] = useState(previousValue)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setValue(previousValue)
    }, 300)

    return () => {
      clearTimeout(timer.current)
    }
  }, [previousValue])

  return {
    value,
    previousValue,
    changeValue: (str: string | number) => setPreviousValue(str)
  }
}

export default useDebounce
