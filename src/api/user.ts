import { customGetFetch, customPostFetch } from '@/api/fetch'

export async function login(user: {
  username: string
  password: string
}) {
  return await customPostFetch('/user/login', { ...user }) as Response
}

export async function register(user: {
  username: string
  password: string
}) {
  return await customPostFetch('/user/register', { ...user }) as Response
}

export async function getUserById(id: string) {
  return await customGetFetch('/user/' + id) as Response
}

export async function getUserByToken() {
  return await customGetFetch('/user') as Response
}
