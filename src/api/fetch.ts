import { domain } from "@/constants/env"
import { message } from "antd"

async function getFetch(path: string, signal?: any) {
  return fetch(domain + path, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    signal
  }).catch((error) => {
    if (error.name === 'AbortError') return
    message.destroy()
    message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
    return null
  })
}

async function postFetch(path: string, body: any, signal?: any) {
  return fetch(domain + path, {
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
    message.destroy()
    message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
    return null
  })
}

async function uploadImage(path: string, file: File, signal?: any) {
  const formData = new FormData()
  formData.append('file', file, file.name)

  return fetch(domain + path, {
    method: 'post',
    credentials: 'include',
    body: formData,
    signal
  }).catch((error) => {
    if (error.name === 'AbortError') return
    message.destroy()
    message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
    return null
  })
}

export { getFetch, postFetch, uploadImage }
