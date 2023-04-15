import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => { })
    }
  })

  return width
}

export default useWindowSize