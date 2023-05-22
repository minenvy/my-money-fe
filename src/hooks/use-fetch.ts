import { getFetch } from "@/api/fetch"
import { useErrorBoundary } from "@/contexts/error-fetch-boundary"
import { error } from "console"
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
  const { showBoundary } = useErrorBoundary()
  const effectDependencies = dependencies || []

  useEffect(() => {
    if (cachedData[key] !== undefined && cachedData[key] !== null) return
    const controller = new AbortController()
    const signal = controller.signal
    let didCancel = false

      ; (async () => {
        try {
          if (isLoading) return
          setIsLoading(true)
          const fetchData = await getFetch(path, signal).catch(err => showBoundary(err))
          if (!didCancel) {
            setCachedData(preState => {
              return { ...preState, [key]: fetchData }
            })
          }
        } catch (err) {
          console.log(err)
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