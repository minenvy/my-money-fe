import { getFetch } from "@/api/fetch"
import { useEffect, useState } from "react"

function useFetch(
  key: string,
  path: string,
  dependencies?: Array<string | number | boolean>
) {
  const [cachedData, setCachedData] = useState<{
    [key: string]: Array<any> | any
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const effectDependencies = dependencies || []

  useEffect(() => {
    if (cachedData[key] !== undefined) return
    const controller = new AbortController()
    const signal = controller.signal
    let didCancel = false

      ; (async () => {
        try {
          if (isLoading) return
          setIsLoading(true)
          const res = await getFetch(path, signal) as Response
          if (!res || !res.ok) return
          const jsonData = await res.json()
          if (!didCancel) {
            setCachedData(preState => {
              return { ...preState, [key]: jsonData }
            })
          }
        } catch (err) {
          console.log(err)
          return null
        } finally {
          setIsLoading(false)
        }
      })()

    return () => {
      controller.abort()
      didCancel = true
    }
  }, effectDependencies)

  return { data: cachedData[key], isLoading }
}

export default useFetch