import { getFetch } from "@/api/fetch"
import { useErrorBoundary } from "@/contexts/error-fetch-boundary"
import { useEffect, useState } from "react"

interface IError {
  message: string
}

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
          const fetchData = await getFetch(path, signal)
          if (!didCancel) {
            localStorage.setItem(key, fetchData)
            setCachedData(preState => {
              return { ...preState, [key]: fetchData }
            })
          }
        } catch (err) {
          const knownError = err as IError
          if (knownError.message === 'server error') showBoundary(knownError)
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