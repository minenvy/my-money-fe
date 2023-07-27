import { useErrorBoundary } from '@/contexts/error-boundary'
import { useEffect, useState } from 'react'

interface FetchError {
  message: string
}
type CacheData = {
  [key: string]: any
}

const CACHE_TO_LOCAL_STORAGE_URLS = ['money types']

function useFetch<T>(
  key: string,
  fn: Function,
  dependencies?: Array<string | number | boolean>
): {
  data: T | null
  isLoading: boolean
  refetch: Function
} {
  const [data, setData] = useState<T | null>(null)
  const [cachedData, setCachedData] = useState<CacheData>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<FetchError | null>(null)
  const errorBoundary = useErrorBoundary()
  const effectDependencies = dependencies || []

  function getDataFromLocalStorageAndSave(key: string) {
    const dataInLocalStorage = localStorage.getItem(key)
    if (dataInLocalStorage !== 'undefined') {
      const newData = JSON.parse(dataInLocalStorage as string)
      setData(newData)
      return true
    }
    return false
  }

  function checkHavingCachedData() {
    return cachedData[key] !== null && cachedData[key] !== undefined
  }

  async function fetchData() {
    try {
      if (isLoading) return
      setIsLoading(true)
      const fetchedData = await fn() as T
      setData(fetchedData)
      setCachedData(preState => {
        return { ...preState, [key]: fetchedData }
      })
      if (CACHE_TO_LOCAL_STORAGE_URLS.includes(key))
        localStorage.setItem(key, JSON.stringify(fetchData))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (CACHE_TO_LOCAL_STORAGE_URLS.includes(key)) {
      const havingDataInLocalStorage = getDataFromLocalStorageAndSave(key)
      if (havingDataInLocalStorage) return
    }
    if (checkHavingCachedData()) {
      setData(cachedData[key])
      return
    }

    fetchData()
  }, effectDependencies)

  return { data, isLoading, refetch: fetchData }
}

export default useFetch
