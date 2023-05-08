import { getFetch } from "@/api/fetch"
import { useEffect, useState } from "react"

function useFetch(
  path: string,
  dependencies?: Array<string | number | boolean>
) {
  const [data, setData] = useState<Array<any> | any>()
  const [isLoading, setIsLoading] = useState(false)
  const effectDependencies = dependencies || []

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let didCancel = false

      ; (async () => {
        try {
          if (isLoading) return
          setIsLoading(true)
          const res = await getFetch(path, signal) as Response
          if (!res.ok) return
          const jsonData = await res.json()
          if (!didCancel) setData(jsonData)
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

  return { data, isLoading }
}

export default useFetch