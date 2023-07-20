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

function displayNotification(path: string, response: Response, data: any) {
  if (response.status !== 200) {
    toast('warning', data.message)
    return
  }
  if (checkIgnorePath(path)) return
  toast('success', data.message || 'Xử lý thành công!')
}

const fetchOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}

async function getFetch(path: string) {
  const options = {
    ...fetchOptions,
    method: 'get'
  }
  const response = await fetch(domain + path, options)
  const data = await response.json()
  if (response.status !== 200) {
    displayNotification(path, response, data)
    return null
  }
  return data
}

async function postFetch(path: string, body: any) {
  const options = {
    ...fetchOptions,
    method: 'post',
    body: JSON.stringify(body)
  }
  const response = await fetch(domain + path, options)
  const data = await response.json()
  displayNotification(path, response, data)
  if (response.status !== 200) return null
  return data
}

export { getFetch, postFetch }
