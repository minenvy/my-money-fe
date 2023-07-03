import { domain } from '@/constants/env'
import { message } from 'antd'

const IGNORE_ERROR_MESSAGE_URLS = [
  '/user/get-by-token',
  '/notification/read',
  '/image/extract',
  '/image/upload',
]

function checkIgnorePath(path: string) {
  return IGNORE_ERROR_MESSAGE_URLS.some((url) => path.includes(url))
}

function toast(type: 'warning' | 'success', content: string) {
  message.destroy()
  message[type](content)
}

async function doFetch(path: string, method: string, body?: any, signal?: any) {
  const options: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    signal,
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(domain + path, options).catch((error) => {
    if (error.name === 'AbortError') return
  })
  if (!res) return null
  const data = await res.json()
  if (res.status === 400) {
    if (!checkIgnorePath(path)) {
      toast('warning', data.message)
    }
    return null
  }

  if (res.status === 500) {
    throw new Error('server error')
  }

  if (method === 'post') {
    if (res.status !== 200) {
      toast('warning', data.message)
      return null
    }
    if (data.message && !checkIgnorePath(path)) {
      toast('success', data.message)
    }
  }

  return data
}

async function getFetch(path: string, signal?: any) {
  return doFetch(path, 'get', undefined, signal)
}

async function postFetch(path: string, body: any, signal?: any) {
  return doFetch(path, 'post', body, signal)
}

async function uploadImage(path: string, file: File, signal?: any) {
  const formData = new FormData()
  formData.append('file', file, file.name)

  const options: RequestInit = {
    method: 'post',
    credentials: 'include',
    body: formData,
    signal,
  }
  const res = await fetch(domain + path, options).catch((error) => {
    if (error.name === 'AbortError') return
  })
  if (!res) return null
  const data = (await res.json()) as { message: string; image?: string }
  if (res.status !== 200) {
    toast('warning', data.message)
    return null
  }
  if (!checkIgnorePath(path)) toast('success', data.message)
  return data.image
}

export { getFetch, postFetch, uploadImage }
