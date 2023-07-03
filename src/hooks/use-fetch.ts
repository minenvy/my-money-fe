import { getFetch } from "@/api/fetch"
import { useErrorBoundary } from "@/contexts/error-fetch-boundary"
import { useEffect, useState } from "react"

const CACHE_TO_LOCAL_STORAGE_URLS = ['money types']

type Error = {
  message: string
}

function useFetch(
  key: string,
  path: string,
  dependencies?: Array<string | number | boolean>
) {
  const [cachedData, setCachedData] = useState<{
    [key: string]: any
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const errorBoundary = useErrorBoundary()
  const effectDependencies = dependencies || []

  useEffect(() => {
    if (CACHE_TO_LOCAL_STORAGE_URLS.includes(key)) {
      const dataInLocalStorage = localStorage.getItem(key)
      if (dataInLocalStorage) {
        const data = JSON.parse(dataInLocalStorage)
        setCachedData(preState => {
          return { ...preState, [key]: data }
        })
        return
      }
    }
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
            setCachedData(preState => {
              return { ...preState, [key]: fetchData }
            })
            if (CACHE_TO_LOCAL_STORAGE_URLS.includes(key)) localStorage.setItem(key, JSON.stringify(fetchData))
          }
        } catch (err) {
          const knownError = err as Error
          if (knownError.message === 'server error') errorBoundary.showBoundary(knownError)
        } finally {
          setIsLoading(false)
        }
      })()

    return () => {
      controller.abort()
      didCancel = true
    }
  }, effectDependencies)

  const refetch = async () => {
    try {
      if (isLoading) return
      setIsLoading(true)
      const fetchData = await getFetch(path)
      setCachedData(preState => {
        return { ...preState, [key]: fetchData }
      })
    } catch (err) {
      const knownError = err as Error
      if (knownError.message === 'server error') errorBoundary.showBoundary(knownError)
    } finally {
      setIsLoading(false)
    }
  }

  return { data: cachedData[key], isLoading, refetch }
}

export default useFetch