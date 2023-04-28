import { getFetch, postFetch } from '@/api/fetch'

export function login(user: {
  username: string
  password: string
}) {
  return postFetch('/user/login', { ...user })
}

export function register(user: {
  username: string
  password: string
}) {
  return postFetch('/user/register', { ...user })
}
