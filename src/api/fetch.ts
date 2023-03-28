import { domain } from "@/constants/env"

async function customGetFetch(path: string, headers?: any) {
  const res = await fetch(domain + path, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      withCredentials: true,
      ...headers
    },
  })
    .catch(err => {
      throw new Error(err)
    })
  const data = await res.json()
  return data
}

async function customPostFetch(path: string, body?: any) {
  const res = await fetch(domain + path, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .catch(err => {
      throw new Error(err)
    })
  const data = await res.json()
  return data
}

export { customGetFetch, customPostFetch }
