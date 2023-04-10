import { customGetFetch, customPostFetch } from '@/api/fetch'

export async function login(user: {
  username: string
  password: string
}) {
  return await customPostFetch('/user/login', { ...user }).catch(err => {
    throw new Error(err)
  }) as Response
}

export async function register(user: {
  username: string
  password: string
}) {
  return await customPostFetch('/user/register', { ...user }).catch(err => {
    throw new Error(err)
  }) as Response
}

export async function getUserById(id: string) {
  return await customGetFetch('/user/' + id).catch(err => {
    throw new Error(err)
  }) as Response
}

export async function getUserByToken() {
  return await customGetFetch('/user').catch(err => {
    throw new Error(err)
  }) as Response
}
