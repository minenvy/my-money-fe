import { useEffect, useState } from 'react'

function useDebounce(initData: string | number) {
  const [previousValue, setPreviousValue] = useState(initData)
  const [value, setValue] = useState(previousValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(previousValue)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [previousValue])

  return {
    value,
    previousValue,
    changeValue: (str: string | number) => setPreviousValue(str)
  }
}

export default useDebounce
