import { domain } from "@/constants/env"
import { message } from "antd"

const IGNORE_ERROR_MESSAGE_URLS = ['/user/get-by-token', '/notification/read', '/image/extract', '/image/upload']

function checkIgnorePath(path: string) {
  return IGNORE_ERROR_MESSAGE_URLS.some(url => path.includes(url))
}

async function getFetch(path: string, signal?: any) {
  const res = await fetch(domain + path, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    signal
  }).catch((error) => {
    if (error.name === 'AbortError') return
  })
  if (!res) return null
  const data = await res.json()
  if (res.status === 400) {
    message.destroy()
    if (!checkIgnorePath(path)) message.warning(data.message)
    return null
  }
  if (res.status === 500) {
    throw new Error('server error')
  }
  return data
}

async function postFetch(path: string, body: any, signal?: any) {
  const res = await fetch(domain + path, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
    signal
  }).catch((error) => {
    if (error.name === 'AbortError') return
  })
  if (!res) return null
  const data = await res.json()
  message.destroy()
  if (res.status !== 200) {
    message.warning(data.message)
    return null
  }
  if (data.message && !checkIgnorePath(path)) {
    message.success(data.message)
  }
  return data
}

async function uploadImage(path: string, file: File, signal?: any) {
  const formData = new FormData()
  formData.append('file', file, file.name)

  const res = await fetch(domain + path, {
    method: 'post',
    credentials: 'include',
    body: formData,
    signal
  }).catch((error) => {
    if (error.name === 'AbortError') return
  })

  if (!res) return null
  const data = await res.json() as { message: string, image?: string }
  message.destroy()
  if (res.status !== 200) {
    message.warning(data.message)
    return null
  }
  if (!checkIgnorePath(path)) message.success(data.message)
  return data.image
}

export { getFetch, postFetch, uploadImage }
