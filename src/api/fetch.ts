import { domain } from "@/constants/env"

async function customGetFetch(path: string, headers?: any) {
  const res = await fetch(domain + path, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
  }) as Response
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
    credentials: 'include',
    body: JSON.stringify(body)
  }) as Response
  const data = await res.json()
  return data
}

async function customDeleteFetch(path: string, body?: any) {
  await fetch(domain + path, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body)
  }) as Response
}

export { customGetFetch, customPostFetch, customDeleteFetch }
