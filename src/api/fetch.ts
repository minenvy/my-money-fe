import { domain } from "@/constants/env"

function getFetch(path: string, signal?: any) {
  return fetch(domain + path, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    signal
  })
}

function postFetch(path: string, body: any, signal?: any) {
  return fetch(domain + path, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
    signal
  })
}

function uploadImage(path: string, body: any, signal?: any) {
  return fetch(domain + path, {
    method: 'post',
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    // },
    credentials: 'include',
    body: body,
    signal
  })
}

export { getFetch, postFetch, uploadImage }
